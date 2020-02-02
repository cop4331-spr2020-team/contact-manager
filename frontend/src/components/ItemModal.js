import React, { Component } from 'react';
import { 
    Button, 
    Modal, 
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Input} from 'reactstrap';
    import {connect} from 'react-redux';
    import { addItem } from '../actions/itemActions'

class ItemModal extends Component {

    state = {
        modal: false,
        name: '',
        cell_phone_number: '',
        email: ''
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });     
    }

    onSubmit = (e) => {
        e.preventDefault();

        const newItem = {
            name: this.state.name,
            cell_phone_number: this.state.cell_phone_number,
            email: this.state.email
        }   

        // console.log(newItem)
        // Add item via addItem action
        this.props.addItem(newItem);

        // Close the modal
        this.toggle();
    }

    render (){
        return(
            <div>
                <Button 
                id="add-item-btn"
                color="primary"
                style={{marginBottom: '1rem', maxWidth: '50%'}}
                onClick={this.toggle}
                block>Create Contact
                </Button>

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Create Contact</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="contact-name">Name</Label>
                                <Input 
                                    type="text"
                                    name="name"
                                    id="contact-name"
                                    placeholder="Enter a name"
                                    onChange={this.onChange}
                                />
                                <Label for="contact-phone">Phone</Label>
                                <Input 
                                    type="text"
                                    name="cell_phone_number"
                                    id="contact-phone"
                                    placeholder="### ### ###"
                                    onChange={this.onChange}
                                />
                                <Label for="contact-email">Email</Label>
                                <Input 
                                    type="text"
                                    name="email"
                                    id="contact-email"
                                    placeholder="JohnSmith@gmail.come"
                                    onChange={this.onChange}
                                />
                                <Button
                                color="success"
                                style={{marginTop: '2rem'}}
                                block>
                                Save</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    item: state.item
});

export default connect(mapStateToProps, { addItem })(ItemModal);