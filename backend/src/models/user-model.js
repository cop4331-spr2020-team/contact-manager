const mongoose = require('mongoose')
const Schema = mongoose.Schema

const user = new Schema(
	{
		name:     { type: String, required: false},
		email:    { type: String, required: true},
		username: { type: String, required: true},
		password: { type: String, required: true},
		contacts: { type: [String], required: false}
	},
	{ timestamps: true }
)

user.statics.findByUsername = async function(username) {
	return this.findOne({ username: username });
}

user.statics.findByEmail = async function(email) {
	return this.findOne({ email: email });
}

module.exports = mongoose.model('users', user)