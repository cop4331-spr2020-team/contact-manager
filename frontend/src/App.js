import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Landing from './components/view/Landing';
import LoginPage from './components/auth/LoginPage'
import RegisterPage from './components/auth/RegisterPage'

function App() {
  return (
    <Router>
    <div className="App">
      <Route exact path = '/' component={Landing} />
      <Route exact path = '/login' component={LoginPage} />
      <Route exact path = '/register' component={RegisterPage} />
    </div>
    </Router>
  );
}

export default App;
