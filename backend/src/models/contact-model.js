const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Contact = new Schema(
	{
		name: { type: String, required: true},
		cell_phone_number: { type: String, required: true},
		email: { type: String, required: false},
	},
	{ timestamps: true}
);

module.exports = mongoose.model('contacts', Contact)
