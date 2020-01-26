import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import '../App.css';

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
        event.preventDefault();
        fetch('/api/authenticate', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (res.status === 200) {
                this.props.history.push('/');
            } else {
                const error = new Error(res.error);
                throw error;
            }
        })
        .catch(err => {
            console.error(err);
            alert('Error logging in please try again');
        });
    }

    handleChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    }

    render() {
        return(
    
            <Form className="login" onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label>Username</Label>
                    <Input 
                        type="text"
                        name="username" 
                        placeholder="Username" 
                        value={this.state.username}
                        onChange={this.handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Password</Label>
                    <Input 
                        type="password"
                        name="password"
                        placeholder="Password" 
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                </FormGroup>
        
            <Button className="btn-lg btn-dark btn-block" type="submit" >
                    Login</Button>

                <div  className="p-2">
                    <a href="/register">Register</a>
                </div>
        </Form>
        );
    }
};

export default Login;