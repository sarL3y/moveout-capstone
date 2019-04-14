'use strict';

const passport = require('passport');

const localAuth = passport.authenticate('local', { session: false });
const jwtAuth = passport.authenticate('jwt', { session: false });

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

    app.get('/dashboard', function(req, res) {
        res.render('pages/dashboard');
    });
};