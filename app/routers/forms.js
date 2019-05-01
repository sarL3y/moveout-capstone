'use strict';

const express = require('express');
const router = express.Router();

const { Form } = require('../models/form');

module.exports = function(app, passport) {

    app.get('/formsList',  (req, res) => {

        Form
            .find()
            .then(forms => {
                res.json(forms)
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({
                    message: 'A /GET Internal server error'
                });
            });
    });
    
    app.post('/submitForm', (req, res) => {

        Form
            .create(req.body)
            .then(form => res.send(201))
            .catch(err => {
                res.status(500).json({
                    error: 'Form could not save'
                });
            });
    });

    app.delete('/deleteForm/:id', (req, res) => {

        Form
            .findByIdAndRemove({ _id: req.params.id })
            .then(res.status(204).end())
            .catch(err =>
                res.status(500).json({
                    error: 'Couldn\'t delete form'
                }));
    });
};