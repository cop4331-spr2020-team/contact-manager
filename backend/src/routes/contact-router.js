const express = require('express')

const ContactCtrl = require('../controllers/contact-ctrl')

const router = express.Router()

router.post('/contact', ContactCtrl.createContact)
router.put('/contact/:id', ContactCtrl.updateContact)
router.delete('/contact/:id', ContactCtrl.deleteContact)
router.get('/contact/:id', ContactCtrl.getContactById)
router.get('/contacts', ContactCtrl.getContacts)

module.exports = router