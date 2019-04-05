'use strict';
const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');

const { app, runServer, closeServer } = require('../server');
const { DATABASE_URL } = require('../config');

const expect = chai.expect;

chai.use(chaiHttp);


describe('Views // Index.ejs ', function() {

    before(function() {
        return runServer(DATABASE_URL);
    });

    after(function() {
        return closeServer;
    });

    it('should serve "views/index.ejs" file', function() {
        return chai
            .request(app)
            .get('/')
            .then(function(res) {
                expect(res).to.have.status(200);
            });
    });
});

