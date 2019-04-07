const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const { User, Form } = require('../models/form');

// POST
router.post('/', jsonParser, (req, res) => {
    const requiredFields = ['name', 'address', 'email', 'phone'];

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
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            comments: req.body.comments,
            leaseRemainder: req.body.leaseRemainder,
            created: req.body.created
        })
        .then(form => res.status(201).json({
            id: form.id,
            name: form.name,
            email: form.email,
            phone: form.phone,
            address: form.address,
            comments: form.comments,
            leaseRemainder: form.leaseRemainder,
            created: form.created
        }))
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: 'Couldn\'t create form? But I don\'t know why'
            });
        });
  });

module.exports = router;

  // User
    //     .findOne({ name: req.body.name })
    //     .then(user => {
    //         if (user) {
    //             const message = `Request with this name has already been created`;
    //             console.error(message);
    //             return res.status(400).send(message);
    //         }
    //         else {
    //             User
    //                 .create({
    //                     firstName: req.body.firstName,
    //                     lastName: req.body.lastName
    //                 })
    //                 .then(user => res.status(201).json({
    //                     _id: user.id,
    //                     name: `${user.firstName} ${user.lastName}`,
    //                 }))
    //                 .catch(err => {
    //                     console.error(err);
    //                     res.status(500).json({ error: 'Couldn\'t create user' });
    //                 });
    //             }
    //     })
    //     .catch(err => {
    //         console.error(err);
    //         res.status(500).json({ error: 'Couldn\'t .findOne' });
    //     });

