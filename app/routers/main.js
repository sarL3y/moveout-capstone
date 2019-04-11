'use strict';

const User = require('../models/user');

module.exports = function(app, passport) {

    app.get('/', function(req, res) {
        res.render('pages/index');
    });

    app.get('/dashboard', function(req, res) {
        res.render('pages/dashboard');
    });

    app.get('/login', function(req, res) {
        res.render('pages/login');
    });

    app.get('/submit', function(req, res) {
        res.render('pages/submit');
    });
};

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated())
        return next();

    res.redirect('/login');
};

function isAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.level == 'admin')
        return next();

    res.redirect('/login');
};