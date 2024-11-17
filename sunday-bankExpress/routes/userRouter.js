const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createOrUpdateUser);
router.put('/:id', userController.createOrUpdateUser);
router.delete('/:id', userController.deleteUser);

router.put('/:id/deposit', userController.depositMoney);
router.put('/:id/withdraw', userController.withdrawMoney);
router.get('/:id/balance', userController.checkBalance);

module.exports = router;
