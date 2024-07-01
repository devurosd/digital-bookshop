const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');

router.route('/')
.get(booksController.getAllBooks)
.post(booksController.addNewBook)
.patch(booksController.updateBook)
.delete(booksController.deleteBook)

module.exports = router;