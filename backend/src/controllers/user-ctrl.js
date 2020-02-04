// Authentication
const bcrypt = require('bcrypt')
const jwt    = require('jsonwebtoken')
const moment = require('moment')
var blacklist = require('express-jwt-blacklist');

// Config data for jwt
const config = require('../config/config')

// MongoDB model
const User   = require('../models/user-model')

// Validation for data.
const { body, validationResult } = require('express-validator')

const invalidated = new Array();

authenticate = async (req, res, next) => {

	if (!req.cookies.jwt) {
		return res.status(401).send({ logged_in: false })
	}

	var token = req.cookies.jwt
	var payload = null

	try {
		payload = jwt.decode(token, config.TOKEN_SECRET)
	}
	catch { 
		return res.status(401).send({ logged_in: false })
	}

	if (payload.exp <= moment().unix()) {
		return res.status(401).send({ logged_in: false })
	}

	User.findById(payload.id, function(err, user) {
		if (!user) {
			return req.status(404).send({ logged_in: false })
		}
		else {
			req.logged_in = true;
			req.user = payload.id;
			req.name = user.name
			req.username = user.username;
			req.contacts = user.contacts;
			next()
		}
	})
}

login = async (req, res) => {

	const errors = validationResult(req)

	if (!errors.isEmpty()) {
		res.status(401).json({ errors: errors.array() })
		return
	}

	const username = req.body.username
	const password = req.body.password 

	// We need to check for user here, since we don't want to keep
	// searching in the database.
	User.findByUsername(username)
	.then(user => {
		if (!user) {
			return res.status(401).json({ error: "Username/Password combination not found." })
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
					config.TOKEN_SECRET,
					{
						expiresIn: '1d'
					},
					(err, token) => {
						res.cookie('jwt', token, {httpOnly: true}).json({ success: true })
					}
				)
			} 
			else {
				return res.status(401).json({ error: "Username/Password combination not found."})
			}
		})
	})
}

logout = async (req, res) => {
	return res.clearCookie('jwt', {httpOnly: true}).json({ success: true }).status(200)
}

register = async (req, res) => {

	const errors = validationResult(req)

	if (!errors.isEmpty()) {
		res.status(401).json({ errors: errors.array() })
		return;
	}

	const {
		name, username, 
		email, password
	} = req.body

	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(password, salt, (err, hash) => {
			if (err) {
				res.status(500).json(err)
				throw err
			}

			const newUser = new User({
				name: name,
				username: username,
				email: email,
				password: hash
			})

			newUser
				.save()
				.then(newUser => {
					res.status(201).json(newUser)
				})
				.catch(err => res.status(500).json(err))
		})
	})
}

isLoggedIn = async (req, res) => {
	res.status(200).json({
		logged_in: req.logged_in,
		user: req.username,
		name: req.name
	});
}

validate = (method) => {
	switch (method) {
		case 'createUser': {
			return [
				body('username')
					.exists()
					.withMessage('Username is required.')
					.bail()
					.isAlphanumeric()
					.withMessage('Username must be alphanumeric.')
					.bail()
					.custom(value => {
					return User.findByUsername(value).then(user => {
						if (user) {
							return Promise.reject('Username is already in use')
						}
					})
				}),
				body('email')
					.exists()
					.withMessage('Email is required.')
					.bail()
					.isEmail()
					.withMessage('Not a valid email.')
					.normalizeEmail()
					.bail()
					.custom(value => {
					return User.findByEmail(value).then(user => {
						if (user) {
							return Promise.reject('E-mail is already in use')
						}
					})
				}),
				body('password')
					.exists()
					.withMessage('Password required.'),
				body('passwordConfirmation')
					.exists()
					.withMessage('Password confirmation required.')
					.bail()
					.custom((value, { req }) => {
					if (value != req.body.password) {
						throw new Error('Password confirmation does not match password.')
					}

					return true
					})
					.withMessage('Password confirmation does not match.')
			]
		}

		case 'loginUser': {
			return [
				body('username')
				.exists()
				.withMessage('Username is required.'),
				body('password')
				.exists()
				.withMessage('Password is required.')
			]
		}
	}
}

module.exports = {
	validate,
	login,
	logout,
	register,
	authenticate,
	isLoggedIn,
}