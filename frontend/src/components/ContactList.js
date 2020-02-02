import React, { Component, useState } from 'react';
import Toggle from './toggleRPC';
<<<<<<< HEAD
import { Container, ListGroup, ListGroupItem, Button} from 'reactstrap';
=======
import { Container, ListGroup, ListGroupItem, Button, ButtonGroup} from 'reactstrap';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
>>>>>>> contactcard
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { Row, Col, Form, FormGroup, FormText, Label, Fade } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';
<<<<<<< HEAD
import uuid from 'uuid';


// Redux State and Action type dependicies
import { connect } from 'react-redux';
import { getItems, deleteItem, editItem } from '../actions/itemActions';
=======


// Redux State and Action type dependicies
import { connect } from 'react-redux';  
import { getItems, deleteItem, addItem, editItem } from '../actions/itemActions';
>>>>>>> contactcard


class ContactList extends Component {

<<<<<<< HEAD

    // LifeCycle method that runs when the component mounts
    // Usually when calling an action, making an API request, ect...
=======
>>>>>>> contactcard
    componentDidMount() {
        this.props.getItems();
    }

    onDeleteClick = (id) => {
        this.props.deleteItem(id);
    }
<<<<<<< HEAD
       

    render () {
        // This is called object de-structuring
        const { items } = this.props.item;
=======
    

    render () {
        const {items} = this.props.item;
        var {data} = items;        
        
        // Automatically sort by name
        if (data) {
            data = data.slice().sort((a, b) => a.name.localeCompare(b.name));
            // console.log(this.props.item)
        }

>>>>>>> contactcard
        return (
            <Container className="container-test">
                <ListGroup className="list-group">
                    <TransitionGroup className="contact-list">
<<<<<<< HEAD
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
=======
                        { data && data.map(( { _id, name, cell_phone_number, email }) => (
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <Toggle>
                                {({on, toggle}) => (
                                    <div>
                                    <ListGroupItem id="list-group-item">
                                        <InputGroup onClick={toggle}>
                                        <Input 
                                        id="name-label"
                                        style={{
                                        position: 'relative',
                                        margin: '0 auto',
                                        backgroundColor: 'transparent', 
                                        border: 'none', 
                                        outline: 'none', 
                                        textAlign: 'center'}}
                                        value={name} 
                                        readOnly></Input>
                                        <InputGroupAddon addonType="append">
                                                <Button 
                                                 id="toggle-btn"
                                                 color="white" 
                                                 size="md"
                                                 onClick={toggle}><i id="icon-caret-down"></i></Button>
>>>>>>> contactcard
                                            </InputGroupAddon>
                                        </InputGroup>
                                     </ListGroupItem>
                                    {
<<<<<<< HEAD
                                        on && <ListGroupItem className="list-item">
                                        <Form>
                                        <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                        <Label for="contactName" sm={2}>Name:</Label>
                                        </InputGroupAddon>
                                        <Input value={name}/>
=======
                                        on && <ListGroupItem className="list-group-item-inner">
                                        <Form>
                                        <InputGroup>
                                        <InputGroupAddon>
                                        <Label for="contactName" sm={2}>Name:</Label>
                                        </InputGroupAddon>
                                        <Input value={name} readOnly/>
>>>>>>> contactcard
                                        </InputGroup>
                                        <br/>
        
                                        <InputGroup>
<<<<<<< HEAD
                                        <InputGroupAddon addonType="prepend">
                                        <Label for="contactName" sm={2}>Phone:</Label>
                                        </InputGroupAddon>
                                        <Input value={phone}/>
=======
                                        <InputGroupAddon>
                                        <Label for="contactPhone" sm={2}>Phone:</Label>
                                        </InputGroupAddon>
                                        <Input 
                                        type="text"
                                        name="phone"
                                        id="contactPhone"
                                        value={cell_phone_number} readOnly/>
>>>>>>> contactcard
                                        </InputGroup>
                                        <br />
                                        
                                        <InputGroup>
<<<<<<< HEAD
                                        <InputGroupAddon addonType="prepend">
                                        <Label for="contactName" sm={2}>Email:</Label>
                                        </InputGroupAddon>
                                        <Input value={email}/>
=======
                                        <InputGroupAddon>
                                        <Label for="contactEmail" sm={2}>Email:</Label>
                                        </InputGroupAddon>
                                        <Input 
                                        type="email"
                                        name="email"
                                        id="contactEmail"
                                        value={email} readOnly/>
>>>>>>> contactcard
                                        </InputGroup>
                                        <br />
                                        
                                        <InputGroup>
<<<<<<< HEAD
                                        <InputGroupAddon addonType="append">
=======
                                        <InputGroupAddon>
                                        <ButtonGroup style={{border: '2px solid red', position: 'relative'}}>
>>>>>>> contactcard
                                        <Button
                                        className="edit-btn"
                                        size="sm"
                                        color="warning"
<<<<<<< HEAD
                                        style={{marginLeft: '1rem'}, {marginRight: '1rem'}}
                                        >Edit</Button>
=======
                                        style={{marginLeft: '.5rem', borderRadius: '4px'}}
                                        >Edit</Button>

>>>>>>> contactcard
                                        <Button 
                                            className="remove-btn"
                                            size="sm"
                                            color="danger"
<<<<<<< HEAD
                                            onClick={this.onDeleteClick.bind(this, id)}
                                            >
                                            Delete
                                        </Button>
=======
                                            style={{marginLeft: '.5rem', borderRadius: '4px'}}
                                            onClick={this.onDeleteClick.bind(this, _id)}
                                            >Delete
                                        </Button>

                                        <Button
                                        className="save-btn"
                                        size="sm"
                                        color="success"
                                        style={{marginLeft: '.5rem', borderRadius: '4px'}}
                                        // onClick={this.onUpdateClick.bind(this, id)}
                                        >Save
                                        </Button>
                                        </ButtonGroup>
>>>>>>> contactcard
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
<<<<<<< HEAD
    { getItems, deleteItem }
=======
    { getItems, deleteItem, editItem, addItem }
>>>>>>> contactcard
    )(ContactList);