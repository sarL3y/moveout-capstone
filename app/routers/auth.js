'use strict';

const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.get('/dashboard', isAdmin, (req, res) => {

})