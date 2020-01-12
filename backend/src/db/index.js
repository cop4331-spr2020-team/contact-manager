const mongoose = require('mongoose')

const {
	MONGO_USERNAME,
	MONGO_PASSWORD,
	MONGO_CLUSTER
} = process.env

const options = {
  useNewUrlParser: true,
  reconnectTries: 3,
  reconnectInterval: 500, 
  connectTimeoutMS: 10000,
  useUnifiedTopology: true
}

const uri = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_CLUSTER}-cwnt0.mongodb.net/contacts?retryWrites=true&w=majority`

console.log(uri)

mongoose
	.connect(uri, options).then(function() {
		console.log('MongoDB connected')
	})
	.catch(e => {
		console.error('Connection error', e.message)
	})

const db = mongoose.connection
module.exports = db