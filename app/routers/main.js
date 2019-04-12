'use strict';

const User = require('../models/user');

module.exports = function(app, passport) {

    app.get('/', function(req, res) {
        res.render('pages/index');
    });

    app.get('/loginForm', function(req, res) {
        res.render('pages/login');
    });

    app.get('/submit', function(req, res) {
        res.render('pages/submit');
    });
};