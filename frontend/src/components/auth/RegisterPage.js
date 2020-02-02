import React, { Component } from 'react';
import Register from './Register';

export default class RegisterPage extends Component {

    render () {
        return (
            <div className="wrapper">
                <div className="form-wrapper">
                    <h1 className="head" id="title">
                    <span className="font-weight-bold">Register!</span>
                    </h1>
                    <Register />
                </div>
            </div>
        );
    }
};