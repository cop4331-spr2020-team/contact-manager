const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Contact = new Schema(
	{
		name: { type: String, required: true},
		phone: { type: String, required: false},
		email: { type: String, required: false}
	},
	{ timestamps: true}
)

module.exports = mongoose.model('contacts', Contact)
