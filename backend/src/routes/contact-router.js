const express = require('express')
const router  = express.Router()

const contactController = require('../controllers/contact-ctrl')

// Create / delete / update contacts.
router.put(
    '/contact', 
    contactController.validate('createContact'),
    contactController.createContact
)
router.put(
    '/contact/:id',
    contactController.validate('updateContact'),
    contactController.updateContact
)
router.delete(
    '/contact/:id',
    contactController.validate('deleteContact'),
    contactController.deleteContact
)

// Get contacts.
router.get(
    '/contact/:id',
    contactController.validate('getContact'),
    contactController.getContactById
)
router.get(
    '/contacts',
    contactController.validate('getContacts'),
    contactController.getContacts
)

module.exports = router