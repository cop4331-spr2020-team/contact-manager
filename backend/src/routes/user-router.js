const express = require('express')
const router  = express.Router()

const UserLoginCtrl = require('../controllers/user-auth-ctrl')
const UserRegistrCtrl = require('../controllers/user-registration-ctrl')

router.put('/auth/register', UserRegistrCtrl.maybeRegister)
router.get('/auth/login', UserLoginCtrl.maybeAuthenticate)

module.exports = router
