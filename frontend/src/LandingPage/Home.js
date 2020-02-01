import React, { Component, useState } from "react";
import { Jumbotron, Button, Container, CardTitle, CardText, Row, Col, Card, CardImg, CardBody } from 'reactstrap';
import { Link, Redirect } from "react-router-dom";

import './Home.css';
import aboutImg from '../qmark.jpg';
import contactImg from '../notebook.jpg';
import loginImg from '../signin.jpg';

function Home(props) {
  
  const [isLogin,setLogin]=useState(false); // Need to check token to toggle this

  function loginCheck() {
    if (isLogin) {
      setLogin(false);
                        // clear login token 
    }
  }

  if (isLogin){ // Load this if the user is logged in
    return (
      <Container>
        
        <Jumbotron>
          <h1 className="display-3">Welcome!</h1>
          <p className="lead">Organize the people around you.</p>
          <hr className="my-2" />
        </Jumbotron>
       
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
                <Button color="btn-lg btn-dark btn-block" onClick={loginCheck}>{isLogin? 'Sign Out' : 'Sign In'}</Button>
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
      </Container>
    )
  }

  else {  // If the user is not logged in, load this page
    return (

      <Container>
        
        <Jumbotron>
          <h1 className="display-3">Welcome!</h1>
          <p className="lead">Organize the people around you.</p>
          <hr className="my-2" />
          <div className="text-center">

            <Link to="/register">     {/* Route link to register page */} 
              <Button outline color="secondary btn-lg">Sign Up Now</Button>
            </Link>

          </div>
        </Jumbotron>
      
        <div>
          <Row className="cardsrow">
            <Col sm="3">                {/* login page card */}
                                        
              <CardImg top width="100%" src={loginImg} alt="Card image cap" className="cards"/>
              <Link to="/login">      {/* Route link to login page */}     
                <Card body className="cards">
                  <Button color="btn-lg btn-dark btn-block" onClick={loginCheck}>{isLogin? 'Sign Out' : 'Sign In'}</Button>
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
      </Container>
    );
  }
}

export default Home;


