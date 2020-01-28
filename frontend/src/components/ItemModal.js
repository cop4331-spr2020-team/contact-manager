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
    import uuid from 'uuid';

    class ItemModal extends Component {

        state = {
            modal: false,
            name: ''
        }

        toggle = () => {
            this.setState({
                modal: !this.state.modal
            });
        }

        onChange = (e) => {
            this.setState({ [e.target.name]: e.target.value });
            this.setState({ [e.target.phone]: e.target.value });
            this.setState({ [e.target.email]: e.target.value });
            
        }

        onSubmit = (e) => {
            e.preventDefault();

            const newItem = {
                id: uuid(),
                name: this.state.name,
                phone: this.state.phone,
                email: this.state.email
            }

            // Add item via addItem action
            this.props.addItem(newItem);

            // Close the modal
            this.toggle();
        }

        render (){
            return(
                <div>
                    <Button 
                    color="primary"
                    style={{marginBottom: '2rem'}}
                    onClick={this.toggle}>Create Contact
                    </Button>

                    <Modal
                        isOpen={this.state.modal}
                        toggle={this.toggle}
                    >
                        <ModalHeader toggle={this.toggle}>Create Contact</ModalHeader>
                        <ModalBody>
                            <Form onSubmit={this.onSubmit}>
                                <FormGroup>
                                    <Label for="contact">Name</Label>
                                    <Input 
                                        type="text"
                                        name="name"
                                        id="contact"
                                        placeholder="Enter a name"
                                        onChange={this.onChange}
                                    />
                                    <Label for="phone">Phone</Label>
                                    <Input 
                                        type="text"
                                        name="phone"
                                        id="phone"
                                        placeholder="### ### ###"
                                        onChange={this.onChange}
                                    />
                                    <Label for="email">Email</Label>
                                    <Input 
                                        type="text"
                                        name="email"
                                        id="email"
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