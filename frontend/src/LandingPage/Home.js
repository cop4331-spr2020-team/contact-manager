import React, { Component } from "react";
import { Jumbotron, Button, Container, CardTitle, CardText, Row, Col, Card, CardImg, CardBody } from 'reactstrap';
import { Link } from "react-router-dom";

import './Home.css';
import aboutImg from './qmark.jpg';
import contactImg from './notebook.jpg';
import loginImg from './signin.jpg';

function Home(props) {

  return (
    <Container>

      <Jumbotron>
        <h1 className="display-3">Welcome!</h1>
        <p className="lead">Organize the people around you.</p>
        <hr className="my-2" />
      </Jumbotron>

      <div>
          <Row className="cardsrow">
          <Col sm="3">                                   {/* contacts page card*/}
          <CardImg top width="100%" src={contactImg} alt="Card image cap" className="cards"/>
            <Card body className="cards">

              <Link to="/contacts">                    {/* Route link to contacts page */}
                <Button color="btn-lg btn-dark btn-block">Contacts</Button>
              </Link>

            </Card>
          </Col>
          <Col sm="3">                                  {/* login page card */}
          <CardImg top width="100%" src={loginImg} alt="Card image cap" className="cards"/>

            <Card body className="cards">

              <Link to="/login">                      {/* Route link to login page */}
                <Button color="btn-lg btn-dark btn-block">Sign in</Button>
              </Link>

            </Card>
          </Col>
          <Col sm="3">                                  {/* about page card */}
          <CardImg top width="100%" src={aboutImg} alt="Card image cap" className="cards"/>
            <Card body className="cards">

              <Link to="/about">                        {/* Route link to about page */}
                <Button color="btn-lg btn-dark btn-block">About</Button>
              </Link>

            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default Home;
