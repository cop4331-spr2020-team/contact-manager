// Load process.env variables for mongo.
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const {
	MONGO_USERNAME,
	MONGO_PASSWORD,
	MONGO_CLUSTER,
	TOKEN_SECRET,
	LISTEN_PORT,
} = process.env

module.exports = {
	// MongoDB Stuff
	MONGO_USERNAME: process.env.MONGO_USERNAME || 'test',
	MONGO_PASSWORD: process.env.MONGO_PASSWORD || 'test',
	MONGO_CLUSTER:  process.env.MONGO_CLUSTER  || 'contact-manager-test-cluster0',

	// JWT Token
	TOKEN_SECRET:   process.env.TOKEN_SECRET   || 'pvpnCCZfwOF85pBjbOebZiYIDhZ3w9LZrKwBZ7152K89mPCOHtbRlmr5Z91ci4L',

	// Express Port
	LISTEN_PORT:    process.env.LISTEN_PORT    ||  8080,
}