import React, { Component } from 'react';
import { Button, Navbar, Card } from "react-bootstrap";
import { Form, FormGroup, Row, Col, Label, Input, FormFeedback } from 'reactstrap';
import axios from 'axios';

export default class ContactView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            newName: ''
        }
    }

    grabUserData() {
        axios.get(`/api/contact/${this.props.match.params.id}`)
        .then(response => {
            const data = response.data.data;
            this.setState({
                name: data.name
            })
        })
        .catch(error => {
            console.log(error.response)
        })
    }

    editUserData = event => {
        axios.put(`/api/contact/${this.props.match.params.id}`, {
            name: this.state.name
        })
        .then(response => {
            console.log(response.data)
            if (response.data.success) {
                this.setState({
                    name: this.state.newName
                })
            }
        })
        .catch(error => {
            console.log(error.response)
        })
    }

    handleNameChange = event => {
        this.setState({
            newName: event.target.value
        })
    }

    componentDidMount() {
        this.grabUserData()
    }

    render() {
        return (
            <div className="container">
                <Input
                    value={this.state.newName}
                    onChange={this.handleNameChange}
                    placeholder="New Name"
                >
                </Input>
                <Button
                    onClick={this.editUserData}
                >
                Update Contact
                </Button>
                <b>
                    {this.state.name}
                </b>
            </div>
        )
    }
}