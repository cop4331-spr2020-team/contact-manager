import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/layout/MainNavbar'
import Landing from './components/view/Landing';
import LoginPage from './components/auth/LoginPage'
import RegisterPage from './components/auth/RegisterPage'

import ContactsView from './components/view/ContactsView'

function App() {
  return (
    <Router>
    <div className="App">
      <Route exact path = '/' component={Landing} />
      <Route exact path = '/login' component={LoginPage} />
      <Route exact path = '/register' component={RegisterPage} />

      <Route path = '/contacts' component={ContactsView} />

    </div>
    </Router>
  );
}

export default App;
