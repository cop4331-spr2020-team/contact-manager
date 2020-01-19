const express    = require('express')
const bodyParser = require('body-parser')
const cors       = require('cors')
const logger     = require('morgan')
const config     = require('./config/config')

// Initialize express.
const app = express()
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Initialize database.
const db = require('./db')
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// Setup routing.
const userRouter = require("./routes/user-router")
app.use('/', userRouter)

// Setup listener on port.
app.listen(config.LISTEN_PORT, () => {
	console.log(`Backend server listening on port ${apiPort}`)	
})
