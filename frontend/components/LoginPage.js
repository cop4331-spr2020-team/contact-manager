import React, { Component } from 'react';
import { Container } from 'reactstrap';

import Login from './Login';

const LoginPage = () => {
    return (
        <div>
            <h1 
            id="title"
            style={{display: 'flex', justifyContent:'center', alignItems:'center'}}
            >
               <span className="font-weight-bold"> Contact Manager</span>
                </h1>
            
            <Container>
                <Login/>
            </Container>
        </div>
    );
};

export default LoginPage;