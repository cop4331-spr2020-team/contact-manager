import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import Landing from './components/view/Landing';
import LoginPage from './components/auth/LoginPage'
import RegisterPage from './components/auth/RegisterPage'

import Contact from './components/view/Contact'
import ContactList from './components/view/ContactList'

function App() {
  return (
    <Router>
    <div className="App">

      <Route exact path = '/' component={Landing} />
      <Route exact path = '/login' component={LoginPage} />
      <Route exact path = '/register' component={RegisterPage} />

      <Route path = '/contact' component={Contact} />
      <Route exact path = '/contacts' component={ContactList} />

    </div>
    </Router>
  );
}

export default App;
