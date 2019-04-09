'use strict';

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