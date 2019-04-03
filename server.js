'use strict';

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const router = require('./app/routers/router.js');

const app = express();

const { DATABASE_URL, PORT } = require('./config');

mongoose.Promise = global.Promise;

app.use(morgan('common'));
app.use(express.static('public'));
app.use(router);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
  });

/* runServer & closeServer */

let server;

function runServer() {
    const port = process.env.PORT || 8080;

    return new Promise((resolve, reject) => {
        // mongoose.connect(databaseUrl, err => {
            // if (err) {
            //     return reject(err);
            // }

            server = app
                .listen(port, () => {
                    console.log(`Your app is listening on port ${port}`);
                    resolve();
                })
                .on('error', err => {
                    // mongoose.disconnect();
                    reject(err);
                });
    });
};

function closeServer() {
    // return mongoose.disconnect().then(() => {
        return new Promise((resolve, reject) => {
            console.log('Closing server');
            server.close(err => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
};




if (require.main === module) {
    runServer().catch(err => console.error(err));
};

module.exports = { app, runServer, closeServer };