<<<<<<< HEAD
const express          = require('express')
const bodyParser       = require('body-parser')
const cors             = require('cors')
const logger           = require('morgan')
const config           = require('./config/config')
=======
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
>>>>>>> contactcard

// Initialize express.
const app = express()
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Initialize database.
const db = require('./db')
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// Setup routing.
const userRouter    = require("./routes/user-router")
const contactRouter = require('./routes/contact-router') 
app.use('/auth', userRouter)
app.use('/api', contactRouter)

// Setup listener on port.
app.listen(config.LISTEN_PORT, () => {
	console.log(`Backend server listening on port ${config.LISTEN_PORT}`)	
})