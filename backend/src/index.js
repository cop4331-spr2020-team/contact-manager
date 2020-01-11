const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./db')
const contactRouter = require("./routes/contact-router")

const app = express()

const defaultPort = 8080
const apiPort = process.env.PORT || defaultPort

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api', contactRouter)

app.listen(apiPort, () => console.log(` Backend server running on port ${apiPort}`))
