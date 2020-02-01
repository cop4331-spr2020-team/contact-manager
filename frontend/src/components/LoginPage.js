import React, { Component } from 'react';
import Login from './Login';

class LoginPage extends Component {

    render () {
        return (
            <div className="wrapper">


                <div className="form-wrapper">
                    <h1
                        className="head"
                        id="title"
                    >
                    <span className="font-weight-bold"> Contact Manager</span>
                    </h1>

                    <Login />
                </div>
            </div>
        );
    }
};

export default LoginPage;
