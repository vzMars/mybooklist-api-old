const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { ensureAuth } = require('../middleware/auth');

router.use(ensureAuth);

router.get('/search/:query', bookController.searchBooks);

module.exports = router;
