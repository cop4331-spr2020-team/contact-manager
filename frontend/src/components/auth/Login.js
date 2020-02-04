import React, { useState, Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Spinner, FormFeedback } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

export default class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			userName: "",
			password: "",
			loginErrors: "",
			isUsernameInvalid: false,
			isPasswordInvalid: false,
			loginSuccess: false,
			loading:false,
		};
	}
	
	handleLogin = (event) => {
		var hash = require('object-hash');

		const { userName, password } = this.state;
		this.setState({loading:true});
		// if ((userName === "") || (password === "")) { // if submitted without any input give error
		// 	this.setState({
		// 		isUsernameInvalid: true,
		// 		isPasswordInvalid: true,
		// 		loading: false
		// 	})
		// }
	
		// Retrieve user from backend
		axios.post("/api/auth/login", {
			username: userName,
			password: hash(password, { algorithm: 'md5', encoding: 'base64' })	// Hash before sendingweb
		})
		.then(result => {
			if (result.status === 200) {
				console.log('login success');
				this.setState({loginSuccess: true});
			}
		})
		.catch(error => {
			console.log(error.response.data)
			this.setState({
				loading:false,
				isPasswordInvalid: true,
				password:""
			});
		});
	}

	handleUsernameChange = (event) => {
		this.setState({ 
			userName: event.target.value
		})
	}

	handlePasswordChange = (event) => {
		this.setState({ 
			password: event.target.value,
			isPasswordInvalid: false
		})
	}

	render() {
		const { isUsernameInvalid, isPasswordInvalid } = this.state;

		if(this.state.loginSuccess) {
			return <Redirect to="/"/> // Redirect after login
		}
		 
		return (
			<Form className="login">
				<FormGroup>		
					<Label>Username</Label>
					<Input
						className="text"
						type="text"
						value={this.state.userName}
						onChange={this.handleUsernameChange}
						invalid={this.state.isUsernameInvalid}
					/>
				</FormGroup>
				<FormGroup>
					<Label>Password</Label>
					<Input
						className="text"
						type="password"
						value={this.state.password}
						onChange={this.handlePasswordChange}
						invalid={this.state.isPasswordInvalid}
					/>
					{isPasswordInvalid && <FormFeedback >Invalid Username/Password</FormFeedback>} {/*Error if login is not successful*/}
				</FormGroup>

				<Button className="btn-lg btn-dark btn-block" 
					onClick={this.handleLogin} 
					disabled={this.state.loading || this.state.userName === "" || this.state.password === ""} // Disable button if fields are empty or when loading
					>
					{this.state.loading && <Spinner color="primary"/>} {/*Loading animation*/}
					Login
				</Button>
	
				<div  className="p-2">
					<Link to="/register">Sign Up</Link>
				</div>
			</Form>
		);
	}
}
