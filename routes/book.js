const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { ensureAuth } = require('../middleware/auth');

router.use(ensureAuth);

router.get('/search', bookController.searchBooks);

module.exports = router;
