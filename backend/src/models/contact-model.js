const mongoose         = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const Schema = mongoose.Schema

const Contact = new Schema(
	{
		name: { type: String, required: true},
		last: { type: String, required: false},
		home_address: { type: String, required: false},
		cell_phone_number: { type: String, required: false},
		email: { type: String, required: false},
		note: { type: String, required: false},
		company: { type: String, required: false},
		birthday: { type: String, required: false},
	},
	{ timestamps: true}
);

Contact.plugin(mongoosePaginate)

module.exports = mongoose.model('contacts', Contact)
