import React, { Component } from "react";
import { Button, Form, FormGroup, Row, Col, Label, Input, FormFeedback } from 'reactstrap';
import { Link } from "react-router-dom";
import axios from "axios";

import './Register.css'
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
			isEmailValid: false,
			isNameInvalid: false,
			isUsernameInvalid: false,
			isPasswordInvalid: false,
			isConfirmationPasswordInvalid: false,
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
	}

	handleUsernameChangeEvent = (event) => {
		// handle username change.
		this.handleChange(event)
	}

	handlePasswordChangeEvent = (event) => {
		// handle password change.
		this.handleChange(event)
	}

	handleConfirmationPasswordChangeEvent = (event) => {
		// handle confirmation password.
		this.handleChange(event)
	}

	handleSubmit = (event) => {
		const { firstName, lastName, email, userName, password, confirmationPassword } = this.state;
		
		// try to register.
		axios.put('/api/auth/register', {
			name: firstName + ' ' + lastName,
			email: email,
			username: userName,
			password: password,
			passwordConfirmation: confirmationPassword
		})
		.then((response) => {
			console.log('Hooray!')
		})
		.catch((error) => {
			console.log("Boohoo!")
			console.log(error.response.data)
		});
	}

	render() {
		return (
			<Form className="register">

				<div className="row">
					<div className="col d-flex justify-content-center">
						<FormGroup>
							<Input
								name="firstName"
								className="input"
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
								className="input"
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
								className="input"
								type="text"
								placeholder="Username"
								value={this.state.username}
								onChange={this.handleUsernameChangeEvent}
								invalid={this.state.isUsernameInvalid}
							/>
						</FormGroup>
					</div>
				</div>

				<div className="row">
					<div className="col">
						<FormGroup>
							<Input
								name="password"
								className="input"
								type="password"
								placeholder="Password"
								value={this.state.password}
								onChange={this.handlePasswordChangeEvent}
								invalid={this.state.isPasswordInvalid}
							/>
							<FormFeedback valid={this.state.isPasswordInvalid}>Hmm</FormFeedback>
						</FormGroup>
					</div>
				</div>

				<div className="row">
					<div className="col">
						<FormGroup>
							<Input
								name="confirmationPassword"
								className="input"
								type="password"
								placeholder="Confirm Password"
								value={this.state.confirmationPassword}
								onChange={this.handleConfirmationPasswordChangeEvent}
								invalid={this.state.isConfirmationPasswordInvalid}
							/>
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