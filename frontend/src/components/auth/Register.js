import React, { Component } from "react";
import { Button, Form, FormGroup, Row, Col, Label, Input, FormFeedback } from 'reactstrap';
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

import './Register.css'

const passRegex = RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])[A-Za-z\d@$.!%*#?&]{5,}$/, "i");

export default class Register extends Component {
	constructor(props) {
		super(props);

		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			userName: '',
			password: '',
			confirmationPassword: '',
			loginErrors: '',
			userNameError:'',
			emailError:'',
			passwordError:'',
			passwordConfirmationError:'',
			isEmailValid: false,
			isNameInvalid: false,
			isUsernameInvalid: false,
			isPasswordInvalid: false,
			isConfirmationPasswordInvalid: false,
			successfulRegister: false
		};

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	handleNameChangeEvent = (event) => {
		// handle name change.
		this.handleChange(event)
	}

	handleEmailChangeEvent = (event) => {
		// handle name change.
		this.handleChange(event)
		this.setState({isEmailValid: false})
	}

	handleUsernameChangeEvent = (event) => {
		// handle username change.
		this.handleChange(event)
		this.setState({isUsernameInvalid: false})
	}

	handlePasswordChangeEvent = (event) => {
		// handle password change.
		this.handleChange(event)
		this.setState({isPasswordInvalid: false})
	}

	handleConfirmationPasswordChangeEvent = (event) => {
		// handle confirmation password.
		this.handleChange(event)
		this.setState({isConfirmationPasswordInvalid: false})
		
	}

	handleSubmit = (event) => {
		var hash = require('object-hash');
		const { firstName, lastName, email, userName, password, confirmationPassword } = this.state;
		
		// Password Error check
		if (!(passRegex.test(password)) || password.length < 5) {
			if (password.length < 5)
				this.setState({
					passwordError: 'Password must be 5 characters minumum.',
					isPasswordInvalid: true,
					password: '.',
					confirmationPassword:''
			})
			else {
				this.setState({
					passwordError: 'Password can only have alphanumeric, or @$.!%*#?&, symbols.\
					Must have at least one uppercase, one lowercase, and one symbol.',
					isPasswordInvalid: true,
					password: '.',
					confirmationPassword:''
			})
			}
		}
    
		axios.put('/api/auth/register', {
			name: firstName + ' ' + lastName,
			email: email,
			username: userName,
			password: hash(password, { algorithm: 'md5', encoding: 'base64' }),
			passwordConfirmation: hash(confirmationPassword, { algorithm: 'md5', encoding: 'base64' })
		})
		.then((response) => {
			console.log('Hooray!')
			this.setState({successfulRegister: true})	// Set to true so we can redirect to login page
		})
		.catch((error) => {

			
			if (!error.response) {
				return;
			}
			this.setState({
				password:'',
				confirmationPassword:''
			})
			//console.log(error.response.data)
			// Loops through array of error messages to display in the form
			for(var i = 0; i < error.response.data.errors.length; i++)
			{	
				if(error.response.data.errors[i].param === "username"){
					this.setState({
						userNameError: error.response.data.errors[i].msg,
						isUsernameInvalid: true,
					})
				}
				else if(error.response.data.errors[i].param === "email"){
					this.setState({
						emailError: error.response.data.errors[i].msg,
						isEmailValid: true,
					})
				}
				// else if(error.response.data.errors[i].param === "password"){
				// 	this.setState({
				// 		passwordError: error.response.data.errors[i].msg,
				// 		isPasswordInvalid: true,
				// 	})
				// }
				else if(error.response.data.errors[i].param === "passwordConfirmation"){
					this.setState({
						passwordConfirmationError: error.response.data.errors[i].msg,
						isConfirmationPasswordInvalid: true,
					})
				}
			}
		
		});
	}

	render() {
		if (this.state.successfulRegister) {
			return <Redirect to="/login"/>
		}

		return (
			<Form className="register">

				<div className="row">
					<div className="col d-flex justify-content-center">
						<FormGroup>
							<Input
								name="firstName"
								className="text"
								type="text"
								placeholder="First Name"
								value={this.state.name}
								onChange={this.handleNameChangeEvent}
								invalid={this.state.isNameInvalid}
							/>
						</FormGroup>
					</div>
					<div className="col d-flex justify-content-center">
						<FormGroup>
							<Input
								name="lastName"
								className="text"
								type="text"
								placeholder="Last Name"
								value={this.state.name}
								onChange={this.handleNameChangeEvent}
								invalid={this.state.isNameInvalid}
							/>
						</FormGroup>
					</div>
				</div>

				<div className="row">
					<div className="col">
						<FormGroup>
							<Input
								name="userName"
								className="text"
								type="text"
								placeholder="Username"
								value={this.state.username}
								onChange={this.handleUsernameChangeEvent}
								invalid={this.state.isUsernameInvalid}
							/>
							<FormFeedback>{this.state.userNameError}</FormFeedback>
						</FormGroup>
						
					</div>
				</div>

				<div className="row">
					<div className="col">
					<FormGroup>
						<Input
							name="email"
							className="text"
							type="text"
							placeholder="Email"
							value={this.state.email}
							onChange={this.handleEmailChangeEvent}
							invalid={this.state.isEmailValid}
						/>
						<FormFeedback>{this.state.emailError}</FormFeedback>
					</FormGroup>
					</div>
				</div>

				<div className="row">
					<div className="col">
						<FormGroup>
							<Input
								name="password"
								className="text"
								type="password"
								placeholder="Password"
								value={this.state.password}
								onChange={this.handlePasswordChangeEvent}
								invalid={this.state.isPasswordInvalid}
							/>
							<FormFeedback>{this.state.passwordError}</FormFeedback>
						</FormGroup>
					</div>
				</div>

				<div className="row">
					<div className="col">
						<FormGroup>
							<Input
								name="confirmationPassword"
								className="text"
								type="password"
								placeholder="Confirm Password"
								value={this.state.confirmationPassword}
								onChange={this.handleConfirmationPasswordChangeEvent}
								invalid={this.state.isConfirmationPasswordInvalid}
							/>
							<FormFeedback>{this.state.passwordConfirmationError}</FormFeedback>
						</FormGroup>
					</div>
				</div>

				<div className="row">
					<div className="col d-flex justify-content-center">
						<Button color="success" className="registerButton" onClick={this.handleSubmit}>Create Account</Button>
					</div>
				</div>
			</Form>
		);
	}
}