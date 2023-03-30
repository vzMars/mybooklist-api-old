const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { ensureAuth } = require('../middleware/auth');

router.use(ensureAuth);

router.get('/', bookController.getBooks);
router.get('/:id', bookController.getBook);
router.get('/search/:query', bookController.searchBooks);
router.post('/', bookController.addBook);
router.put('/:id', bookController.updateBook);

module.exports = router;
