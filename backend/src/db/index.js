const mongoose = require('mongoose')

// Load process.env variables for mongo.
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const {
	MONGO_USERNAME,
	MONGO_PASSWORD,
	MONGO_CLUSTER
} = process.env

const options = {
  useNewUrlParser: true,
  connectTimeoutMS: 10000,
  useUnifiedTopology: true
}


const uri = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_CLUSTER}-cwnt0.mongodb.net/test?retryWrites=true&w=majority`
console.log(`MOGNODB Server url: ${uri}`)

mongoose
	.connect(uri, options).then(function() {
		console.log('MongoDB connected')
	})
	.catch(e => {
		console.error('Connection error', e.message)
	})

const db = mongoose.connection
module.exports = db