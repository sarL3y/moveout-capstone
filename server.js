'use strict';

const express   = require('express');
const app       = express();
require('dotenv').config();

const mongoose = require('mongoose');
const passport = require('passport');

const morgan        = require('morgan');
const bodyParser    = require('body-parser');
const flash         = require('connect-flash');
const session       = require('express-session');

const users = require('./app/routers/users');

const { DATABASE_URL, PORT } = require('./config/database');

require('./config/passport')(passport);

app.use(morgan('dev'));
app.use(bodyParser());
//app.use(express.json());
app.use(flash());
app.use(session({ secret: 'moveoutsessionsecret' }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'));

app.set('view engine', 'ejs');

require('./app/routers/main.js')(app, passport);
require('./app/routers/auth.js')(app, passport);
require('./app/routers/forms.js')(app, passport);

app.use('/users', users);

mongoose.Promise = global.Promise; 

/* runServer & closeServer */

let server;

function runServer(databaseUrl, port = PORT) {
    return new Promise((resolve, reject) => {
        mongoose.connect(databaseUrl, err => {
            if (err) {
                return reject(err);
            }

            server = app
                .listen(port, () => {
                    console.log(`Your app is listening on port ${port}`);
                    resolve();
                })
                .on('error', err => {
                    mongoose.disconnect();
                    reject(err);
                });
            });
    });
};

function closeServer() {
    return mongoose.disconnect().then(() => {
        return new Promise((resolve, reject) => {
            console.log('Closing server');
            server.close(err => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    });
};

if (require.main === module) {
    runServer(DATABASE_URL).catch(err => console.error(err));
};

module.exports = { app, runServer, closeServer };