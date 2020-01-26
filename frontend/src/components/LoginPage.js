import React, { Component } from 'react';
import { Container } from 'reactstrap';

import Login from './Login';

const LoginPage = () => {
    return (
        <div className="wrapper">
            <h1 
            id="title"
            >
               <span className="font-weight-bold"> Contact Manager</span>
            </h1>
            
            <div className="form-wrapper">
                <Login/>
            </div>
        </div>
    );
};

export default LoginPage;