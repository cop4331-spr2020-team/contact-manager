const express = require('express')
const router  = express.Router()

const UserLoginCtrl = require('../controllers/user-login-ctrl')
const UserRegistrCtrl = require('../controllers/user-registration-ctrl')

router.put('/register', UserRegistrCtrl.maybeRegister)

module.exports = router