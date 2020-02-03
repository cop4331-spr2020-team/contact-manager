const Contact = require('../models/contact-model')
const User    = require('../models/user-model')

const { param, body, validationResult } = require('express-validator')

createContact = async (req, res) => {
	
	const errors = validationResult(req)

	if (!errors.isEmpty()) {
		return res.status(400).json({ error: errors.array() })
	}

	const contact = new Contact(req.body)
	
	User.findById(req.user)
	.then(user => {
		if (!user) {
			return res.status(417).json({ error: "UserNotFound"})
		}
		
		user.contacts.push(contact._id)
		user
		.save()
		.then(() => {
			contact
			.save()
			.then(() => {
				return res.status(201).json({
					success: true,
					id: contact.__id,
					message: 'Contact created!',
					data: contact,
				})
			})
			.catch(error => {
				return res.status(400).json({
					error,
					message: 'Contact not created',
				})
			})
		})
		.catch(error => {
			return res.status(400).json({ error: "ErrorSavingUser", error })
		})
	})
	.catch(error => {
		return res.status(400).json({ error: "UserNotFound", error })
	})
}

updateContact = async (req, res) => {

	const errors = validationResult(req)

	if (!errors.isEmpty()) {
		return res.status(400).json({ error: errors.array() })
	}

	Contact.findOne({ _id: req.params.id })
	.then(contact => {

		try {
			for (var key in req.body) {
				contact[key] = req.body[key]
			}
		} catch (err) {
			return res.status(400).json({ error: "InvalidContactKey" })
		}

		contact
			.save()
			.then(() => {
				return res.status(200).json({
					success: true,
					id: contact._id,
					message: 'Contact updated!'
				})
			})
			.catch(error => {
				return res.status(404).json({
					error,
					message: 'Contact not updated.'
				})
			})
	})
	.catch(error => {
		if (error) {
			return res.status(404).json({
				err,
				message: 'Contact not found.'
			})
		}
	})
}

deleteContact = async (req, res) => {

	const errors = validationResult(req)

	if (!errors.isEmpty()) {
		return res.status(400).json({ error: errors.array() })
	}

	Contact.findOneAndDelete({ _id: req.params.id }, (err, contact) => {
		if (err) {
			return res.status(400).json({
				success: false,
				error: err
			})
		}

		return res.status(200).json({
			success: true,
			data: contact
		})
	})
	.catch(err => {
		return res.status(400).json({ error: "UnknownError", err })
	})
}

getContactById = async (req, res) => {
	
	const errors = validationResult(req)

	if (!errors.isEmpty()) {
		return res.status(400).json({ error: errors.array() })
	}

	await Contact.findOne({ _id: req.params.id }, (err, contact) => {
		if (err) {
			return res.status(400).json({
				success: false,
				error: err
			})
		}

		if (!contact) {
			return res.status(404).json({
				success: false,
				error: 'Contact not found.'
			})
		}

		return res.status(200).json({
			success: true,
			data: contact
		})
	})
	.catch(err => {
		return res.status(400).json({ error: "UnknownError", err })
	})
}

getContactsByUsername = async (req, res) => {
	
	const errors = validationResult(req)
	
	if (!errors.isEmpty()) {
		return res.status(400).json({ error: errors.array() })
	}

	const regex = new RegExp(req.body.name, 'i');
	await User.findById(req.user)
	.then(user => {
		
		if (!user) {
			return res.status(400).json({ error: "UserNotFound"})
		}
		
		console.log(`TEST: ${user}`);
		console.log(`ID: ${req.user}`)
		Contact.find({ name: regex, _id: { $in: user.contacts } }, (err, contacts) => {
			if (err) {
				return res.status(400).json({
					success: false,
					error: err
				})
			}
	
			if (!contacts) {
				return res.status(404).json({
					success: false,
					error: 'No contact found.'
				})
			}
	
			return res.status(200).json({
				success: true,
				data: contacts
			})
		})
	}) 
	.catch(err => {
		return res.status(400).json({ error: "UnknownError", err })
	})
}

validate = (method) => {
	switch (method) {
		case 'getContact': {
			return [

			]
		}

		case 'createContact': {
			return [
				body('name')
				.exists()
				.notEmpty()
				.withMessage('Contacts require a name.'),
			]
		}

		case 'updateContact': {
			return [

			]
		}

		case 'deleteContact': {
			return [

			]
		}

		case 'getContacts': {
			return [

			]
		}

		case 'getContactsByUsername': {
			return [

			]
		}
	}
}

contactForUser = (req, res, next) => {

	if (isEmpty(req.contacts)) {
		return res.status(403).json({ error: "InvalidContactForUser" })
	}

	const contactId = req.params.id

	if (contactId && !req.contacts.includes(contactId)) {
		return res.status(403).json({ error: "InvalidContactForUser" })
	}

	next();
}

function isEmpty(obj) { 
	for (var x in obj) { return false; }
	return true;
 }

module.exports = {
	createContact,
	updateContact,
	deleteContact,
	getContactById,
	getContactsByUsername,
	validate,
	contactForUser
}