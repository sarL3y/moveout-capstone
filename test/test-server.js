'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');

const { app, runServer, closeServer } = require('../server');
const { TEST_DATABASE_URL } = require('../config');

const expect = chai.expect;

chai.use(chaiHttp);


describe('Views // Index.html ', function() {

    before(function() {
        return runServer(TEST_DATABASE_URL);
    });

    after(function() {
        return closeServer;
    });

    it('should serve "views/index.html" file', function() {
        return chai
            .request(app)
            .get('/')
            .then(function(res) {
                expect(res).to.have.status(200);
            });
    });
});

