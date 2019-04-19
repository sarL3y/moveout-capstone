'use strict';

const passport = require('passport');

const localAuth = passport.authenticate('local', { 
    session: false,
    successRedirect: '/dashboard', 
    failureRedirect: '/loginForm'
});

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

    app.get('/success', function(req, res) {
        res.render('pages/success');
    });
};

// function isLoggedIn(req, res, localAuth, next) {
//     if (req.isAuthenticated(localAuth)) {
//         next();
//     } else {
//         res.render('pages/login');
//     };
// };