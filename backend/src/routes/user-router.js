const express = require('express')
const router  = express.Router()

const userController = require('../controllers/user-ctrl')

router.put(
    '/register',
    userController.validate('createUser'),
    userController.register
)
router.get(
    '/login',
    userController.validate('loginUser'), 
    userController.login
)

module.exports = router
