const express = require('express')
const router  = express.Router()

const userController = require('../controllers/user-ctrl')

router.put(
    '/register',
    userController.validate('createUser'),
    userController.register
)
router.post(
    '/login',
    userController.validate('loginUser'), 
    userController.login
)
router.get(
    '/logged_in',
    userController.authenticate,
    userController.isLoggedIn
)
router.post(
    '/logout',
    userController.authenticate,
    userController.logout
)

module.exports = router
