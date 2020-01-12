const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const db = require('./db')
const contactRouter = require("./routes/contact-router")

const defaultPort = 8080
const apiPort = process.env.PORT || defaultPort

app.options('/api/contacts', cors())
console.log('test')
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api', contactRouter)

app.listen(apiPort, () => console.log(` Backend server running on port ${apiPort}`))
