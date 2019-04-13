'use strict';

const express = require('express');
const app = express();

require('dotenv').config();

const mongoose = require('mongoose');
const passport = require('passport');

const morgan = require('morgan');
const bodyParser = require('body-parser');

const submitForm = require('./app/routers/submitForm');
const getForms = require('./app/routers/getForms');
const auth = require('./app/routers/auth');
const users = require('./app/routers/users');

const { DATABASE_URL, PORT } = require('./config/database');
const { localStrategy, jwtStrategy } = require('./config/passport');

app.use(morgan('dev'));

app.use(express.static('public'));
app.use(bodyParser());

passport.use(localStrategy);
passport.use(jwtStrategy);

app.set('view engine', 'ejs');

app.use('/submitForm', submitForm);
app.use('/formsList', getForms);
app.use('/login', auth);
app.use('/users', users);

require('./app/routers/main.js')(app, passport);

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