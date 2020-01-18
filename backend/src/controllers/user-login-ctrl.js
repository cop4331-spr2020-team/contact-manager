const Validator   = require('validator')
const isEmpty     = require('is-empty')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt  = require('passport-jwt').ExtractJwt
const User        = require('../models/user-model')
const bcrypt    = require('bcrypt')
const jwt       = require('jsonwebtoken')
const keys      = require('../config/keys')

maybeAuthenticate = (req, res) => {

	const {errors, isValid} = validateLoginInput(req.body)

	if (!isValid) {
		return res.status(400).json(errors)
	}

	const username = req.body.username
	const password = req.body.password 

	User.findOne({username})
		.then(user => {
			if (!user) {
				return res.status(404).json({username_not_found:"Username not found"})
			}

			bcrypt.compare(password, user.password)
				.then(isMatch => {
					if (isMatch) {
						const payload = {
							id: user.id,
							name: user.name
						}

						jwt.sign(
							payload,
							keys.secretOrKey,
							{
								expiresIn: 31556926
							},
							(err, token) => {
								res.json({
									success: true,
									token: "Bearer " + token
								})
							}
						)
					} else {
						return res.status(400).json({ incorrect_password: "Password incorrect"})
					}
				})
		})
}

function validateLoginInput(data) {
	let errors = {}

	data.username = !isEmpty(data.username) ? data.username : ""
	data.password = !isEmpty(data.password) ? data.password : ""

	if (Validator.isEmpty(data.username)) {
		errors.email = 'Username field is empty'
	} /* else if (!Validator.isEmail(data.email)) {
		errors.email = 'Email is invalid'
	} */

	if (Validator.isEmpty(data.password)) {
		errors.password = 'Password field is required'
	}

	return {
		errors,
		isValid: isEmpty(errors)
	}
}

module.exports = {
	maybeAuthenticate
}