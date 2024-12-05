const express = require('express');

const userController = require('../controllers/userController');



const router = express.Router();

router.route('/')
    .get(userController.getAllUsers)
    .post(userController.create)

router.route('/:id')
    .get(userController.getUserById)
    .put(userController.updateUser)
    .delete(userController.deleteUser)

module.exports = router;
