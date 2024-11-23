const express = require('express');

const userController = require('../controllers/userController');



const router = express.Router();

router.route('/')
    .get(userController.getAllUsers)
    .post(userController.createOrUpdateUser)

router.route('/:id')
    .get(userController.getUserById)
    .put(userController.createOrUpdateUser)
    .delete(userController.deleteUser)

module.exports = router;
