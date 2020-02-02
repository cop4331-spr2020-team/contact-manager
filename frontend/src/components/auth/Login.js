import React, { useState, Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
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
		};
	}

	handleLogin = (event) => {
		const { userName, password } = this.state;

		if ((userName === "") || (password === "")) { // if submitted without any input give error
			//setError(true);
			//setErrorMsg("Invalid Username/Password");
			return;
		}
		// in user-router "/login" route uses get, but i couldnt make it work so i changed to put instead
		// Retrieve user from backend
		axios.post("/api/auth/login", {
			username: userName,
			password: password
		})
		.then(result => {
			
			if (result.status === 200) {
				console.log(result.data);
				// Token needs to be stored
			 	//setLogin(true);
			}
		})
		.catch(error => {
			console.log(error.response.data)
			/*
			setError(true);
			setErrorMsg("Invalid Username/Password");
			setUsername("");
			setPassword("");
			*/
		});
	}

	handleUsernameChange = (event) => {
		this.setState({ userName: event.target.value})
	}

	handlePasswordChange = (event) => {
		this.setState({ password: event.target.value})
	}

	render() {
		return (
			<Form className="login">
				<FormGroup>
					<Label>Username</Label>
					<Input
						className="input"
						type="text"
						value={this.state.userName}
						onChange={this.handleUsernameChange}
						invalid={this.state.isUsernameInvalid}
					/>
				</FormGroup>
				<FormGroup>
					<Label>Password</Label>
					<Input
						className="input"
						type="password"
						value={this.state.password}
						onChange={this.handlePasswordChange}
						invalid={this.state.isPasswordInvalid}
					/>
				</FormGroup>
				{/*<Label>{errorMsg}</Label>*/}
				<Button className="btn-lg btn-dark btn-block" onClick={this.handleLogin}>Login</Button>
	
				<div  className="p-2">
					<Link to="/register">Sign Up</Link> {/*needs to be linked*/}
				</div>
			</Form>
		);
	}
}
