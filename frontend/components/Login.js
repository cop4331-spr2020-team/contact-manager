import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import './App.css';

class Login extends Component
{
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: ''
        }
    }
    handleSubmit = (event) => {
        alert('A name was submitted: ' + this.state.username); //placeholder
        event.preventDefault();
    }

    handleUsernameChange = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    render() {
        return(

            <Form className="login" onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label>Username</Label>
                    <Input
                        type="username"
                        placeholder="Username"
                        value={this.state.username}
                        onChange={this.handleUsernameChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Password</Label>
                    <Input
                        type="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handlePasswordChange}
                    />
                </FormGroup>

        <Button className="btn-lg btn-dark btn-block" type="submit" >
                    Login</Button>

                <div  className="p-2">
                    <a href="/register">Register</a> // Link to register page(needs to be made)
                </div>
        </Form>

    );
    }
};

export default Login;
