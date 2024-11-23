const express = require('express')
const accountController = require('../controllers/accountController')

const router = express.Router()

router.route('/deposit').post(accountController.depositMoney)
router.route('/withdrawal').post(accountController.withdrawMoney)
router.route('/').get(accountController.checkBalance)

module.exports = router




//localhost:3000/account/deposit
//localhost:3000/account/withdrawal
//localhost:3000/account/