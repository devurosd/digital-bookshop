const express = require('express');
const router = express.Router();
const authorsController = require('../controllers/authorsController');

router.route('/')
.get(authorsController.getAllAuthors)
.post(authorsController.addNewAuthor)
.patch(authorsController.updateAuthor)
.delete(authorsController.deleteAuthor)

module.exports = router;