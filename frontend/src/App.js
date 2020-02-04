import React from 'react';
import { Navbar } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import MainNavbar from './components/layout/MainNavbar'
import Landing from './components/view/Landing';
import LoginPage from './components/auth/LoginPage'
import RegisterPage from './components/auth/RegisterPage'
import NoMatch from './components/view/NoMatch'
import ContactView from './components/view/ContactView'
import ContactsView from './components/view/ContactsView'

const NavRoute = ({exact, path, component: Component}) => (
	<Route exact={exact} path={path} render={(props) => (
		 <div className="fullscreen">
			  <MainNavbar/>
				<Component {...props}/>
		 </div>
	)}/>
)

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path = '/' component={Landing} />
          <NavRoute exact path = '/contacts' component={ContactsView} />
          <Route exact path = '/login' component={LoginPage} />
          <Route exact path = '/register' component={RegisterPage} />
          <NavRoute path = '/contact/:id' component={ContactView} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
