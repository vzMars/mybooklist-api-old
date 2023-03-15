const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { ensureAuth } = require('../middleware/auth');

router.get('/', ensureAuth, authController.authStatus);

router.post('/login', authController.login);

router.get('/logout', authController.logout);

router.post('/signup', authController.signup);

module.exports = router;
