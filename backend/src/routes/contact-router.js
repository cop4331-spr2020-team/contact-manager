const express = require('express')

const ContactCtrl = require('../controllers/contact-ctrl')

const router = express.Router()

router.post('/contact', ContactCtrl.createContact)
router.put('/contact/:id', ContactCtrl.updateMovie)
router.delete('/contact/:id', ContactCtrl.deleteMovie)
router.get('/contact/:id', ContactCtrl.getMovieById)
router.get('/contacts', ContactCtrl.getMovies)

module.exports = router