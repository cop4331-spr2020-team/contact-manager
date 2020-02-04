import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import { Button } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import Register from '../auth/Register'

import "./Landing.css";
import axios from "axios";
import { ContactsListView } from "./ContactsView";
class Landing extends Component {

	constructor(props) {
		super(props);

		this.state = {
			isAuthenticated: false,
			isLoading: true,
			user: {},
			name: {}
		};
	}

	handleLogout = event => {
		if (!this.state.isAuthenticated) {
			return;
		}

		this.setState({
			isLoading: true
		})

		axios.post('/api/auth/logout', { withCredentials: true})
		.then(response => {
			if (response.data.success) {
				this.setState({
					isAuthenticated: false,
					isLoading: false,
				})
			} else {
				this.setState({
					isLoading: false,
				})
			}
		})
		.catch(error => {
			this.setState({
				isLoading: false
			})
		})
	}

	checkLoginStatus() {
		axios.get('/api/auth/logged_in', { withCredentials: true }).then(response => {
			if (response.data.logged_in && this.state.isAuthenticated === false) {
				console.log('done')
				this.setState({
					isAuthenticated: true,
					isLoading: false,
					user: response.data.user,
					name: response.data.name
				});
			} else if (!response.data.logged_in && this.state.isAuthenticated === true) {
				this.setState({
					isAuthenticated: false,
					isLoading: false,					
					user: {}
				})
			}
		}).catch(error => {
			this.setState({
				isAuthenticated: false,
				isLoading: false,
			})
			console.log('login error.')
		})
	}

	componentDidMount() {
		this.checkLoginStatus();
	}

	render() {

		const { isAuthenticated, isLoading } = this.state;

		const navLinkStyle = {
			color: "white",
			textDecoration: "none",
			fontWeight: "bold",
		};

		if (!this.state.isAuthenticated) {
			return (
				<div className="root fullscreen" style={{backgroundColor: "white"}}>
					<div className="container-fluid background">
						<Navbar className="dark-navbar justify-content-left">
							<Navbar.Brand
								className="justify-content-left"
								style={navLinkStyle}
								href="/"
							>
								<img className="icon" src="/coolbeans.png" />
							</Navbar.Brand>

							<Navbar.Collapse className="dark-navbar justify-content-end"></Navbar.Collapse>

							<Button href="/login" variant="outline-success" className="loginButton">Login</Button>
						</Navbar>

						<main className="main">
							<div className="AuthForm">
								<div className="row">
									<div className="headerInfo info col">
										Sign up for the best Contact Manager!
									</div>
								</div>
								<div className="row">
									<div className="headerInfo2 info col">
										It's free, clutter free, and ad-free.
									</div>
								</div>

								<hr className="loginDivide" />

								<div className="row">
									<div className="col loginSection">
										<Register />
									</div>
								</div>						
							</div>
						</main>
					</div>
					<br />
					<div className="container">
						<div className="AuthForm">
							<div className="row">
								<div className="col">
									<div className="infoSection">
										<h1 style={{fontSize: '20px', fontWeight: 'bold'}}>What features do I get?</h1>
										After registering, and loging in to your new account, you will be prompted with a
										page where you have the following operations:
										<br />
										<div class="row" style={{paddingRight: "25px"}}>
											<ul style={{textAlign: "left", margin: "0 auto"}}>
												<li>Add contact</li>
												<li>Delete contacts</li>
												<li>Search contacts</li>
											</ul>
										</div>
									</div>
								</div>
								<div className="col">
									<div className="infoSection">
									<h1 style={{fontSize: '20px', fontWeight: 'bold'}}>What was this website built for?</h1>
										This was built by a team for UCF COP 4331 course, for Project 1.
										Contributors: Marlon Calvo, Zach Tatman, Keanu Zeng, Xiaojin Dai, Huy Pham, and Lauryn Landkrohn.
									</div>
								</div>
							</div>
						</div>
					</div>

					<Navbar fixed="bottom" variant="light" style={{ maxHeight: "35px",backgroundColor: "#ededed"}}>
							<Navbar.Text>© Team 6, Spring 2020.
							</Navbar.Text>
					</Navbar>
				</div>
	
			);
		}

		
		return (
			<Redirect to={"/contacts"}/>
		);
	}
}

export default Landing;
