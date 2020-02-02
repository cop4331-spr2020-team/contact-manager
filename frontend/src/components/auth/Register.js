import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from "react-router-dom";
import axios from "axios";
export default class Register extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
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
		const { name, email, userName, password, confirmationPassword } = this.state;
		
		// try to register.
		axios.put('/api/auth/register', {
			name: name,
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
			<Form className="login">
				<Link to="/" className="btn-flat waves-effect">
					<i className="material-icons left">Back to home</i>
				</Link>
				<FormGroup>
					<Label>Name</Label>
					<Input
						name="name"
						className="input"
						type="text"
						value={this.state.name}
						onChange={this.handleNameChangeEvent}
						invalid={this.state.isNameInvalid}
					/>
				</FormGroup>
				<FormGroup>
					<Label>Email</Label>
					<Input
						name="email"
						className="input"
						type="text"
						value={this.state.email}
						onChange={this.handleEmailChangeEvent}
						invalid={this.state.isEmailValid}
					/>
				</FormGroup>
				<FormGroup>
					<Label>Username</Label>
					<Input
						name="userName"
						className="input"
						type="text"
						value={this.state.username}
						onChange={this.handleUsernameChangeEvent}
						invalid={this.state.isUsernameInvalid}
					/>
				</FormGroup>
				<FormGroup>
					<Label>Password</Label>
					<Input
						name="password"
						className="input"
						type="password"
						value={this.state.password}
						onChange={this.handlePasswordChangeEvent}
						invalid={this.state.isPasswordInvalid}
					/>
				</FormGroup>
				<FormGroup>
					<Label>Confirm Password</Label>
					<Input
						name="confirmationPassword"
						className="input"
						type="password"
						value={this.state.confirmationPassword}
						onChange={this.handleConfirmationPasswordChangeEvent}
						invalid={this.state.isConfirmationPasswordInvalid}
					/>
				</FormGroup>
				<Label>{this.state.loginErrors}</Label>
				<Button className="btn-lg btn-dark btn-block" onClick={this.handleSubmit}>Register</Button>
			</Form>
		);
	}
}