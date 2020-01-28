const express = require('express')
const router  = express.Router()

const contactController = require('../controllers/contact-ctrl')
const authenticate = require('../controllers/user-ctrl').authenticate

// Create / delete / update contacts.
router.put(
    '/contact',
    authenticate,
    contactController.validate('createContact'),
    contactController.createContact
)
router.put(
    '/contact/:id',
    authenticate,
    contactController.contactForUser,
    contactController.validate('updateContact'),
    contactController.updateContact
)
router.delete(
    '/contact/:id',
    authenticate,
    contactController.contactForUser,
    contactController.validate('deleteContact'),
    contactController.deleteContact
)

// Get contacts.
router.get(
    '/contact/:id',
    authenticate,
    contactController.contactForUser,
    contactController.validate('getContact'),
    contactController.getContactById
)
router.get(
    '/contacts',
    authenticate,
    contactController.validate('getContacts'),
    contactController.getContacts
)

module.exports = router