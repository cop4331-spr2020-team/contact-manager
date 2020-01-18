const Validator = require('validator')
const isEmpty   = require('is-empty')
const bcrypt    = require('bcrypt')
const jwt       = require('jsonwebtoken')
const keys      = require('../config/keys')
const User      = require('../models/user-model')

maybeRegister = (req, res) => {

	const maybeUser = req.body
	const {errors, isValid} = validateRegisterInput(maybeUser)

	if (!isValid) {
		return res.status(404).json(errors)
	}

	User.findOne({email: maybeUser.username}).then(user => {
		if (user) {
			return res.status(400).json({email: 'Email already exists'})
		} else {
			const newUser = new User({
				name: maybeUser.name,
				username: maybeUser.username,
				password: maybeUser.password
			})

			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err)
						throw err

					newUser.password = hash
					newUser
						.save()
						.then(newUser => res.json(newUser))
						.catch(err => console.log(err))
				})
			})
		}
	})
}

function validateRegisterInput(data) {
	let errors = {};

	data.name      = !isEmpty(data.name) ? data.name : ''
	data.username  = !isEmpty(data.username) ? data.username : ''
	data.password  = !isEmpty(data.password) ? data.password : ''
	data.password2 = !isEmpty(data.password2) ? data.password2 : ''

	if (Validator.isEmpty(data.name)) {
		errors.name = 'Name field is required'
	}

	if (Validator.isEmpty(data.username)) {
		errors.username = 'Username field is required'
	} /* else if (!Validator.isEmail(data.email)) {
		errors.email = 'Email is invalid'
	} */

	if (Validator.isEmpty(data.password)) {
		errors.password = 'Password field is required'
	}

	if (Validator.isEmpty(data.password2)) {
		errors.password2 = 'Confirm password field is required'
	}

	if (!Validator.isLength(data.password, {min: 6, max: 30})) {
		errors.password = 'Password must be at least 6 characters'
	}

	if (!Validator.equals(data.password, data.password2)) {
		errors.password2 = 'Passwords must match'
	}

	return {
		errors,
		isValid: isEmpty(errors)
	}
}

function hashUser(user) {
	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(user.password, salt, (err, hash) => {
			if (err)
				throw err

			user.password = hash
			return user
		})
	})
}

module.exports = {
	maybeRegister
}