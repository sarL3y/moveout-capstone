'use strict';

const { Strategy: LocalStrategy } = require('passport-local');

const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

const { User } = require('../app/models/user');
const { JWT_SECRET } = require('./database');

const localStrategy = new LocalStrategy((username, password, done) => {
    let user;

    User
        .findOne({ username: username })
        .then(_user => {
            user = _user;

            if (!user) {
                return Promise.reject({
                    reason: 'LoginError',
                    message: 'Incorrect username or password'
                });
            }
            return user.validatePassword(password);
        })
        .then(isValid => {
            if(!isValid) {
                return Promise.reject({
                    reason: 'LoginError',
                    message: 'Incorrect username or password'
                });
            }
            return done(null, user);
        })
        .catch(err => {
            if (err.reason === 'LoginError') {
                return done(null, false, err);
            }
            return done(err, false);
        });
});

const jwtStrategy = new JwtStrategy(
    {
        secretOrKey: { JWT_SECRET },
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
        algorithms: ['HS256']
    },
    (payload, finished) => {
        finished(null, payload.user);
    }
);

module.exports = { localStrategy, jwtStrategy };
