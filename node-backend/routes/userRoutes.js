const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.route('/')
.get(usersController.getAllUsers)
.post(usersController.addNewUser)
.patch(usersController.updateUser)
.delete(usersController.deleteUser)

module.exports = router;