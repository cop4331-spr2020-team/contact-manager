import React, { Component, useState } from 'react';
import {
  Container,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  Input,
  Button,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
 } from 'reactstrap';
import {getItem, searchItem} from '../actions/itemActions';
import { connect } from 'react-redux';
import ContactList from './ContactList';
import PropTypes from 'prop-types';
 

 class SearchBar extends Component {
    constructor(props) {
        super(props);

    }



    render() {
        return(
            <Container className="search-container">
                <InputGroup className="search-input-form">
                    <Input id="search-bar"
                    placeholder="Search for contact..."
                    ></Input>
                    <InputGroupAddon addonType="append">
                        <Button id="search-btn"
                        color="primary" 
                        type="submit">
                        <i class="fa fa-search"></i></Button>
                    </InputGroupAddon>
                </InputGroup>
            </Container> 
        );
    }
 }

 const mapStateToProps = (state) => ({
    item: state.item
});

export default connect(mapStateToProps, { searchItem })(SearchBar);