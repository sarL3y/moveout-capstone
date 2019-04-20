'use strict';

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const { Form } = require('../models/form');

module.exports = function(app, passport) {

    // GET
    app.get('/formsList', jsonParser, (req, res) => {
        Form
            .find()
            .then(forms => {
                res.json(forms)
            })
            .catch(
                err => {
                console.error(err);
                res.status(500).json({message: 'A /GET Internal server error'});
            });
    });
    
    // POST
    app.post('/submitForm', jsonParser, (req, res) => {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone'];

    for (let i = 0; i < requiredFields.length; i++) {
      const field = requiredFields[i];
      if (!(field in req.body)) {
        const message = `Missing \`${field}\` in request body. Try again.`
        console.error(message);
        return res.status(400).send(message);
      }
    }

    Form
        .create({
            name: {
                firstName: req.body.firstName,
                lastName: req.body.lastName
            },
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            comments: req.body.comments,
            monthlyRent: req.body.monthlyRent,
            leaseRemainder: req.body.leaseRemainder,
            created: req.body.created
        })
        .then(res.status(201))
        .then(res.redirect('/success'))
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: 'Couldn\'t create form? But I don\'t know why'
            });
        });
  });
};