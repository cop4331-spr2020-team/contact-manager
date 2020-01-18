const express = require('express')
const router  = express.Router()

const ContactCtrl = require('../controllers/contact-ctrl')

router.post('/contact', ContactCtrl.createContact)
router.put('/contact/:id', ContactCtrl.updateContact)
router.delete('/contact/:id', ContactCtrl.deleteContact)
router.get('/contact/:id', ContactCtrl.getContactById)
router.get('/contacts', ContactCtrl.getContacts)


module.exports = router