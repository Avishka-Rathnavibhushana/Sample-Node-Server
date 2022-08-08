const express = require('express');
const router = express.Router();

const guestController = require('../../controllers/guestController');

//guest routes
router.post('/registration', guestController.createAccount);
router.get('/login', guestController.login);

module.exports = router;