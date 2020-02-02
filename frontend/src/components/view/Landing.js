import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import Register from '../auth/Register'

import "./Landing.css";
class Landing extends Component {
	render() {
		const navLinkStyle = {
			color: "white",
			textDecoration: "none",
			fontWeight: "bold",
		};

		return (
			<div className="root">
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
								<body className="headerInfo info col">
									Sign up for the best Contact Manager!
								</body>
							</div>
							<div className="row">
								<body className="headerInfo2 info col">
									It's free, clutter free, and ad-free.
								</body>
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
				<br />
				<div class="container">
					<div class="AuthForm">
						<div className="row">
							<div className="col">
								<body className="infoSection">
									<h1 style={{fontSize: '20px', fontWeight: 'bold'}}>What features do I get?</h1>
									After registering, and loging in to your new account, you will be prompted with a
									page where you have the following operations:
									<br />
									<ul>
										<li>Add contact</li>
										<li>Delete contacts</li>
										<li>Search contacts</li>
									</ul>
								</body>
							</div>
							<div className="col">
								<body className="infoSection">
								<h1 style={{fontSize: '20px', fontWeight: 'bold'}}>What was this website built for?</h1>
									This was built by a team for UCF COP 4331 course, for Project 1.
									Thanks for the contributions by Marlon Calvo, Zach Tatman, Keanu, Xiakin, and Lauryn.
								</body>
							</div>
						</div>
					</div>
				</div>

				<Navbar fixed="bottom">
						<Navbar.Text>© Team 6, Spring 2020.
						</Navbar.Text>
				</Navbar>
			</div>
		);
	}
}

export default Landing;
