const express = require('express');
const router = express.Router();

// All routes of User
const guests = require('./api/guests');

// guests routes
router.use('/guests', guests);

module.exports = router;