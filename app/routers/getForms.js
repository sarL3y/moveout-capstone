'use strict';

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const { Form } = require('../models/form');

// GET
router.get('/', jsonParser, (req, res) => {
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

module.exports = router;