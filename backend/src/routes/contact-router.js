const express = require('express')
const router  = express.Router()

const ContactCtrl = require('../controllers/contact-ctrl')

// Create / delete / update contacts.
router.put('/contact', ContactCtrl.createContact)
router.put('/contact/:id', ContactCtrl.updateContact)
router.delete('/contact/:id', ContactCtrl.deleteContact)

// Get contacts.
router.get('/contact/:id', ContactCtrl.getContactById)
router.get('/contacts', ContactCtrl.getContacts)

module.exports = router