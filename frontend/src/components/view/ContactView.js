import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { Button, Navbar, Card } from "react-bootstrap";
import { Form, FormGroup, Row, Col, Label, Input, FormFeedback } from 'reactstrap';
import axios from 'axios';

export default class ContactView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: null,
            name: '',
            newName: '',
            isDeleted: false,
        };

        this.props.updateId.bind(this)
    }

    grabUserData() {
        axios.get(`/api/contact/${this.props.id}`)
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
        axios.put(`/api/contact/${this.props.id}`, {
            name: this.state.newName
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
        console.log(this.state.id)
        this.grabUserData()
    }

    deleteContact(id) {
		axios.delete(`/api/contact/${id}`)
		.then(response => {
			console.log('delete attempt.')
			if (response.data.success) {
				console.log('delete success.')
				this.setState({
					isDeleted: true
				});
			}
		})
		.catch(error => {
			console.log(error.response)
		})
    }

    render() {

        const { isDeleted } = this.state;

        if (isDeleted) {
            return <Redirect to = '/contacts'/>
        }

        return (
            <div className="container">
                <Card style={{ width: '18rem' }}>
                    <Card.Img className="contact-icon" variant="top" src="holder.js/100px180" />
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>

                <Input
                    value={this.state.newName}
                    onChange={this.handleNameChange}
                    placeholder="New Name"
                >
                </Input>
                <Button onClick={this.editUserData}>Update Contact</Button>
                <Button onClick={this.deleteContact.bind(this, this.props.id)}>Delete Contact</Button>
                <b>
                    {this.state.name}
                </b>
            </div>
        )
    }
}