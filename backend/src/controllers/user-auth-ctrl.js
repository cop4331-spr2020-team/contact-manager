const Validator   = require('validator')
const isEmpty     = require('is-empty')

// Authentication
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt  = require('passport-jwt').ExtractJwt
const bcrypt      = require('bcrypt')
const jwt         = require('jsonwebtoken')
const moment      = require('moment')

// MongoDB model
const User        = require('../models/user-model')

ensureAuthenticate = (req, res, next) => {

	if (!req.header.authorization) 
	{
		return res.status(401).send({ error: 'TokenMissing' })
	}

	var token = req.headers.authorization.split(' ')[1]
	var payload = null

	try
	{
		payload = jwt.decode(token, config.TOKEN_SECRET)
	}
	catch
	{ 
		return res.status(401).send({ error: 'TokenInvalid' })
	}

	if (payload.exp <= mement().unix()) 
	{
		return res.status(401).send({ error: 'TokenExpired' })
	}

	Contacts.findById(payload.sub, function(err, contact) {
		if (!contact)
		{
			return res.status(404).send({ error: 'ContactNotFound' })
		}
		else
		{
			req.user = paylod.sub
			next()
		}
	})
}

maybeAuthenticate = (req, res) => {

	const {errors, isValid} = validateLoginInput(req.body)

	if (!isValid)
	{
		return res.status(400).json(errors)
	}

	const username = req.body.username
	const password = req.body.password 

	User.findOne({username})
		.then(user => 
		{
			if (!user) 
			{
				return res.status(404).json({username_not_found:"Username not found"})
			}

			bcrypt.compare(password, user.password)
				.then(isMatch => 
				{
					if (isMatch) 
					{
						const payload = 
						{
							id: user.id,
							name: user.name
						}

						jwt.sign
						(
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
					} 
					else 
					{
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
	maybeAuthenticate,
	ensureAuthenticate
}