import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import './Navbar.css';

export default class MainNavbar extends Component {
    render() {

        const navLinkStyle = {
            color: '#565656',
            textDecoration: 'none',
            fontWeight: 'bold',
        }

        return (
            <Navbar className="dark-navbar justify-content-left">
                <Navbar.Brand className="justify-content-left" style={navLinkStyle} href="/">
                    <img
                        className="icon"
                        src='/coolbeans.png'
                    />
                </Navbar.Brand>
                <Navbar.Collapse className="dark-navbar justify-content-end">
                </Navbar.Collapse>
                <Nav className="mr-auto">
                    <Nav.Link style={navLinkStyle} activeStyle={navLinkStyle} href="/login">Login</Nav.Link>
                </Nav>
            </Navbar>
        )
    };
    
}

