import React, { Component, useState } from "react";
import { Jumbotron, Button, Container, CardTitle, CardText, Row, Col, Card, CardImg, CardBody } from 'reactstrap';
import { Link, Redirect } from "react-router-dom";

import './Home.css';
import aboutImg from './qmark.jpg';
import contactImg from './notebook.jpg';
import loginImg from './signin.jpg';

function Home(props) {

    const [isLogin,setLogin]=useState(false); // Need to check token to toggle this

  function logout() {
    if (isLogin) {
      setLogin(false);
                        // clear login token
    }
  }

  if (isLogin){ // Load this if the user is logged in
    return (

      <div>
          {/*  Banner at the top of page */}
        <div className="banner">
          <div className="wrap3">
            <h1 class="text-center" className="display-3">Contact Manager</h1>
          </div>
        </div>

        <div>
          <Row className="cardsrow">
           <Col sm="3">             {/* contacts page card*/}

              <CardImg top width="100%" src={contactImg} alt="Card image cap" className="cards"/>

              <Link to="/contacts"> {/* Route link to contacts page */}
                <Card body className="cards">
                  <Button color="btn-lg btn-dark btn-block">Contacts</Button>
                </Card>

              </Link>
            </Col>

            <Col sm="3">            {/* sign out card */}
              <CardImg top width="100%" src={loginImg} alt="Card image cap" className="cards"/>

              <Card body className="cards">
                <Button color="btn-lg btn-dark btn-block" onClick={logout}>Sign Out</Button>
              </Card>
            </Col>

            <Col sm="3">              {/* about page card */}

              <CardImg top width="100%" src={aboutImg} alt="Card image cap" className="cards"/>

              <Link to="/about">      {/* Route link to about page */}
                <Card body className="cards">
                  <Button color="btn-lg btn-dark btn-block">About</Button>
                </Card>

              </Link>
            </Col>

          </Row>
        </div>
      </div>
    )
  }

  else {  // If the user is not logged in, load this page
    return (

      <div>
          {/*  Banner at the top of page */}
        <div className="banner">
            <div className="wrap2">
              <h1 class="text-center" className="display-3">Contact Manager</h1>
            </div>
          <div className="wrap1">
            <h3 class="text-center">Sign up to manage your contacts now!</h3>
            <Link to="/register" className="btn">      {/* Route link to register page */}
              <Button color="btn-lg btn-dark btn-block">Sign Up!</Button>
            </Link>
          </div>
        </div>


        <div>
          <Row className="cardsrow">
            <Col sm="3">                {/* login page card */}

              <CardImg top width="100%" src={loginImg} alt="Card image cap" className="cards"/>
              <Link to="/login">      {/* Route link to login page */}
                <Card body className="cards">
                  <Button color="btn-lg btn-dark btn-block">Sign In</Button>
                </Card>
              </Link>
            </Col>

            <Col sm="3">              {/* about page card */}

              <CardImg top width="100%" src={aboutImg} alt="Card image cap" className="cards"/>
              <Link to="/about">      {/* Route link to about page */}
                <Card body className="cards">
                  <Button color="btn-lg btn-dark btn-block">About</Button>
                </Card>

              </Link>
            </Col>

          </Row>
        </div>
      </div>
    );
  }
}


export default Home;
