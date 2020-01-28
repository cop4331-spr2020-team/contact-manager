import React, { Component, useState } from 'react';
import Toggle from './toggleRPC';
import { Container, ListGroup, ListGroupItem, Button} from 'reactstrap';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { Row, Col, Form, FormGroup, FormText, Label, Fade } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';
import uuid from 'uuid';


// Redux State and Action type dependicies
import { connect } from 'react-redux';
import { getItems, deleteItem, editItem } from '../actions/itemActions';


class ContactList extends Component {


    // LifeCycle method that runs when the component mounts
    // Usually when calling an action, making an API request, ect...
    componentDidMount() {
        this.props.getItems();
    }

    onDeleteClick = (id) => {
        this.props.deleteItem(id);
    }
       

    render () {
        // This is called object de-structuring
        const { items } = this.props.item;
        return (
            <Container className="container-test">
                <ListGroup className="list-group">
                    <TransitionGroup className="contact-list">
                        {items.map(({ id, name, phone, email }) => (
                            <CSSTransition key={id} timeout={500} classNames="fade">
                                <Toggle>
                                {({on, toggle}) => (
                                    <div>
                                    <ListGroupItem>
                                        <InputGroup onClick={toggle}>
                                        <Input value={name} readOnly></Input>
                                        <InputGroupAddon addonType="append">
                                                <Button 
                                                className="toggle-btn"
                                                 color="white" 
                                                 size="md"
                                                 onClick={toggle}><i class="arrow down"></i></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                     </ListGroupItem>
                                    {
                                        on && <ListGroupItem className="list-item">
                                        <Form>
                                        <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                        <Label for="contactName" sm={2}>Name:</Label>
                                        </InputGroupAddon>
                                        <Input value={name}/>
                                        </InputGroup>
                                        <br/>
        
                                        <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                        <Label for="contactName" sm={2}>Phone:</Label>
                                        </InputGroupAddon>
                                        <Input value={phone}/>
                                        </InputGroup>
                                        <br />
                                        
                                        <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                        <Label for="contactName" sm={2}>Email:</Label>
                                        </InputGroupAddon>
                                        <Input value={email}/>
                                        </InputGroup>
                                        <br />
                                        
                                        <InputGroup>
                                        <InputGroupAddon addonType="append">
                                        <Button
                                        className="edit-btn"
                                        size="sm"
                                        color="warning"
                                        style={{marginLeft: '1rem'}, {marginRight: '1rem'}}
                                        >Edit</Button>
                                        <Button 
                                            className="remove-btn"
                                            size="sm"
                                            color="danger"
                                            onClick={this.onDeleteClick.bind(this, id)}
                                            >
                                            Delete
                                        </Button>
                                        </InputGroupAddon>
                                        </InputGroup>
                                        </Form>
                                        </ListGroupItem>
                                    }
                                    </div>
                                )}
                                </Toggle>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>         
            </Container>
        );
    }
}

ContactList.propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
}

// mapStateToProps function takes item state and maps it into a component property. 
const mapStateToProps = (state) => ({
    item: state.item
});

export default connect(
    mapStateToProps, 
    { getItems, deleteItem }
    )(ContactList);