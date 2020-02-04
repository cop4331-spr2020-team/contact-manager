import React, { Component } from 'react';
import Login from './Login';
import Navbar from '../layout/MainNavbar'

import './LoginPage.css'
export default class LoginPage extends Component {
    render () {
        return (
            <div className="wrapper">
                <div className="form-wrapper">
                    <h1 className="head" id="title">
                    <span className="font-weight-bold">Login!</span>
                    </h1>
                    <Login />
                </div>
            </div>
        );
    }
};