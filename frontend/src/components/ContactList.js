import React, { Component, useState } from 'react';
import Toggle from './toggleRPC';
import { Container, ListGroup, ListGroupItem, Button, ButtonGroup} from 'reactstrap';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { Row, Col, Form, FormGroup, FormText, Label, Fade } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';


// Redux State and Action type dependicies
import { connect } from 'react-redux';  
import { getItems, deleteItem, addItem, editItem } from '../actions/itemActions';


class ContactList extends Component {

    componentDidMount() {
        this.props.getItems();
    }

    onDeleteClick = (id) => {
        this.props.deleteItem(id);
    }
    

    render () {
        const {items} = this.props.item;
        var {data} = items;        
        
        // Automatically sort by name
        if (data) {
            data = data.slice().sort((a, b) => a.name.localeCompare(b.name));
            // console.log(this.props.item)
        }

        return (
            <Container className="container-test">
                <ListGroup className="list-group">
                    <TransitionGroup className="contact-list">
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
                                            </InputGroupAddon>
                                        </InputGroup>
                                     </ListGroupItem>
                                    {
                                        on && <ListGroupItem className="list-group-item-inner">
                                        <Form>
                                        <InputGroup>
                                        <InputGroupAddon>
                                        <Label for="contactName" sm={2}>Name:</Label>
                                        </InputGroupAddon>
                                        <Input value={name} readOnly/>
                                        </InputGroup>
                                        <br/>
        
                                        <InputGroup>
                                        <InputGroupAddon>
                                        <Label for="contactPhone" sm={2}>Phone:</Label>
                                        </InputGroupAddon>
                                        <Input 
                                        type="text"
                                        name="phone"
                                        id="contactPhone"
                                        value={cell_phone_number} readOnly/>
                                        </InputGroup>
                                        <br />
                                        
                                        <InputGroup>
                                        <InputGroupAddon>
                                        <Label for="contactEmail" sm={2}>Email:</Label>
                                        </InputGroupAddon>
                                        <Input 
                                        type="email"
                                        name="email"
                                        id="contactEmail"
                                        value={email} readOnly/>
                                        </InputGroup>
                                        <br />
                                        
                                        <InputGroup>
                                        <InputGroupAddon>
                                        <ButtonGroup style={{border: '2px solid red', position: 'relative'}}>
                                        <Button
                                        className="edit-btn"
                                        size="sm"
                                        color="warning"
                                        style={{marginLeft: '.5rem', borderRadius: '4px'}}
                                        >Edit</Button>

                                        <Button 
                                            className="remove-btn"
                                            size="sm"
                                            color="danger"
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
    { getItems, deleteItem, editItem, addItem }
    )(ContactList);