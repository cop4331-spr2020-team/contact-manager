import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import Landing from './components/view/Landing.js';
import Login from './components/auth/Login.js'
import Register from './components/auth/Register'

import Contact from './components/view/Contact.js'
import ContactList from './components/view/ContactList.js'

function App() {
  return (
    <Router>
    <div className="App">

      <Route exact path = '/' component={Landing} />
      <Route exact path = '/login' component={Login} />
      <Route exact path = '/register' component={Register} />

      <Route path = '/contact' component={Contact} />
      <Route path = '/contacts' component={ContactList} />

    </div>
    </Router>
  );
}

export default App;
