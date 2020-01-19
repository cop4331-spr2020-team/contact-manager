const mongoose = require('mongoose')
const config   = require('../config/config')

// Mongoose options
const options = {
  useNewUrlParser: true,
  connectTimeoutMS: 10000,
  useUnifiedTopology: true
}

// uri of database to fetch/push
const uri = `mongodb+srv://${config.MONGO_USERNAME}:${config.MONGO_PASSWORD}@${config.MONGO_CLUSTER}-cwnt0.mongodb.net/users?retryWrites=true&w=majority`
console.log(`MOGNODB Server url: ${uri}`)

mongoose
	.connect(uri, options).then(function() {
		console.log('MongoDB connected')
	})
	.catch(e => {
		console.error('Connection error', e.message)
	})

module.exports = mongoose.connection