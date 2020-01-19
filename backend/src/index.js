const express    = require('express')
const bodyParser = require('body-parser')
const cors       = require('cors')
const logger     = require('morgan')

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
app.use('/api/user', userRouter)

// Setup listener on port.
const defaultPort = 8080
const apiPort     = process.env.PORT || defaultPort

app.listen(apiPort, () => console.log(` Backend server running on port ${apiPort}`))
