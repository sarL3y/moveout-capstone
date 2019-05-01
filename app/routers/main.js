'use strict';

const User = require('../models/user');

module.exports = function(app, passport) {

    app.get('/', function(req, res) {
        res.render('pages/index');
    });

    app.get('/loginForm', function(req, res) {
        res.render('pages/login', { message: req.flash('loginMessage') });
    });

    app.get('/submit', function(req, res) {
        res.render('pages/submit');
    });

    app.get('/signup', function(req, res) {
        res.json({ message: 'signup page', user: req.user });
    });

    app.get('/dashboard', isLoggedIn, function(req, res) {
        res.render('pages/dashboard', { user: req.user });
    });

    app.get('/success', function(req, res) {
        res.render('pages/success');
    });
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/loginForm');
    };
};