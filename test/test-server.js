'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

require('dotenv').config();

const expect = chai.expect;

const { app, runServer, closeServer } = require('../server');
const { User } = require('../app/models/user');
const { Form } = require('../app/models/form');
const { TEST_DATABASE_URL } = require('../config/database');

chai.use(chaiHttp);

function generateFormData() {
    return {
        name: {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName()
        },
        email: faker.internet.email(),
        phone: faker.random.number(),
        address: faker.address.streetAddress(),
        monthlyRent: faker.random.number(),
        comments: faker.random.words(),
        leaseRemainder: faker.random.number(),
        created: faker.date.recent()
    };
}


function seedFormData() {
    const seedData = [];
    console.warn('----Seeding forms----')
    for (let i = 0; i < 10; i++) {
        seedData.push(generateFormData());
    }

    return Form.insertMany(seedData);
}

function tearDownDb() {
    console.warn('----Deleting database----');
    return mongoose.connection.dropDatabase();
}

describe('App tests', function() {

    before(function() {
        return runServer(TEST_DATABASE_URL);
    });

    beforeEach(function() {
        return seedFormData();
    });

    afterEach(function() {
        return tearDownDb();
    });

    after(function() {
        return closeServer();
    });

    describe('GET endpoint', function() {
        
        it('should get /formsList data', function() {
            let res;

            return chai.request(app)
                .get('/formsList')
                .then(function(_res) {
                    res = _res;
                    
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.lengthOf.at.least(1);
                    return Form.count();
                })
                .then(function(count) {
                    expect(res.body).to.have.lengthOf(count);
                });
        });
    });
});
