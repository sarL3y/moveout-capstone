'use strict';

const express = require('express');
const passport = require('passport');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const jwt = require('jsonwebtoken');

const database = require('../../config/database');
const router = express.Router();

const User = require('../models/user');

const localAuth = passport.authenticate('local', { session: false });
const jwtAuth = passport.authenticate('jwt', { session: false });

const createAuthToken = user => {
    return jwt.sign({user}, database.JWT_SECRET, {
        subject: user.username,
        expiresIn: database.JWT_EXPIRY,
        algorithm: 'HS256'
    });
};

router.post('/', jsonParser, localAuth, function(req, res) {
    const authToken = createAuthToken(req.user.serialize());
    res.json({authToken});
    res.render('/dashboard');
});

module.exports = router ;