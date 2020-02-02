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
import {searchItem} from '../actions/itemActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
 

 class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            query: '',
            data: [],
            new_data: []
        };

        // binds onchange to search bar
        this.onChange = this.onChange.bind(this);
    }

    onChange(e){
        const query = e.target.value;

        this.setState(prevState => {
            const new_data = prevState.data.filter(element => {
                return element.name.toLowerCase().includes(query.toLowerCase());
            });

            return {
                query,
                new_data
            }
        });
    }

    searchData = () => {
        fetch (`http://localhost:8080/api/contacts`)
        .then(res => res.json())
        .then( data => {
            const {query} = this.state;
            const new_data = data.filter(element => {
                return element.name.toLowerCase().includes(query.toLowerCase());
            });

            this.setState({
                data,
                new_data
            });
        });
    };

    render() {
        return(
            <Container className="search-container">
                <InputGroup id="search-bar">
                    <Input
                    style={{
                    backgroundColor: 'transparent'}}
                    placeholder="Search for a contact..."
                    ></Input>
                    <InputGroupAddon addonType="append">
                        <Button color="primary" 
                        style={{borderRadius: '4px'}}
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