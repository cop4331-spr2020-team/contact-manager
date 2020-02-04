import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import axios from 'axios'
import { useCookies } from 'react-cookie'
import './Navbar.css';

export default class MainNavbar extends Component {

    logout = event => {        
        axios.post('/api/auth/logout', { withCredentials: true })
        .then(response => {
            if (response.data.success) {
                console.log(response.data)
            }
        })
        .catch(error => {
            console.log(error.response)
        })
    }

    render() {

        const navLinkStyle = {
            color: '#565656',
            textDecoration: 'none',
            fontWeight: 'bold',
        }

        return (
            <Navbar variant="dark" bg="dark">
                <Navbar.Brand
                    style={navLinkStyle}
                    href="/"
                >
                    <img className="icon" src="/coolbeans.png" />
                </Navbar.Brand>

                <Navbar.Collapse></Navbar.Collapse>

                <Button onClick={this.logout} variant="outline-light">
                    Log Out
                </Button>
            </Navbar>
        )
    };
}

