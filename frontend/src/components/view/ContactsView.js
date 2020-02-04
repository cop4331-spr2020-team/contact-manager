import React, { Component } from 'react';
import { Button, Navbar, Card } from "react-bootstrap";
import { Form, FormGroup, Row, Col, Label, Input, FormFeedback } from 'reactstrap';
import InfiniteScroll from "react-infinite-scroll-component";
//import ContactView from './ContactView'

import axios from "axios";
import './style.css'
import './ContactView.css'

function updateId(id) {
	this.setState({id: id, isEdit: false}, () => {
		this.grabUserData()
	})
}

function sortedIndex(items, contact) {
    var low = 0,
        high = items.length;

    while (low < high) {
        var mid = (low + high) >>> 1;
        if (items[mid].name < contact.name) low = mid + 1;
        else high = mid;
	}
	
    return low;
}

function add(items, contact, index) {
	var tarray = [...items]
	tarray.splice(index,0,contact)
	return tarray;
}

function Title(props) {
	const isNew = props.id === null;
	if (isNew) {
		return <h1>New Contact</h1>
	} else {
		return <h1>Edit Contact</h1>
	}
}

export default class ContactsView extends Component {

  constructor(props) {
	 super(props);
	 
     this.state = {
         items: [],
			hasMore: true,
			doNewSearch: true,
			offset: 0,
			name: '',
			searchName: '',
			selectedId: null,
     };

     // bind function in constructor instead of render (https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)
	  this.onChangePage = this.onChangePage.bind(this);
	  this.handleCardSelect = this.handleCardSelect.bind(this);
	  this.deleteContact = this.deleteContact
  }

  deleteContact = (id) => {
	  console.log('i was called')
	  console.log(id)
	  this.setState({
		  items: this.state.items.filter(contact => contact._id !== id)
	  })
  }

	componentDidMount() {
		this.grabContacts(0);
	}

	updateId = id => {
		this.setState({
			 id: id
		})
  }

	grabContacts = () => {
		const { offset } = this.state;
		const limit = 40;
		
		axios.get(`/api/contacts`, {
			params: {
				name: this.state.searchName,
				offset: offset,
				limit: limit
			}
		})
		.then(response => {
			const data = response.data.data;
			console.log(response.data)

			const { doNewSearch } = this.state;

			if (doNewSearch) {
				this.setState({
					items: data,
					doNewSearch: false,
					offset: data.length+1,
					hasMore: response.data.hasMore
				})
			} else {
				this.setState({
					items: [...this.state.items, data],
					offset: data.length+1,
					hasMore: response.data.hasMore
				})
			}
		})
		.catch(error => {
			console.log(error.response)
		})
	}

  onChangePage(pageOfItems) {
    // update state with new page of items
    this.setState({ pageOfItems: pageOfItems });
  }

	editContact = (contact) => {
		const nitems = this.state.items.map(tcontact => {
			console.log(contact)
			if (tcontact._id === contact._id) {
				return contact;
			}

			return tcontact;
		})
		this.setState({
			items: nitems
		})
	}

	addContact = (contact) => {
		const index = sortedIndex(this.state.items, contact)
		this.setState({
			items: add(this.state.items, contact, index)
		})
	}

  handleScrollUpdate = event => {
	  this.setState({
		  doNewSearch: false
	  }, () => {
		  this.grabContacts(this.state.offset)
	  })
  }

	handleSearchChange = event => {
		this.setState({
			searchName: event.target.value,
			doNewSearch: true,
			offset: 0,
		}, () => {
			this.grabContacts()
		})
	}

	handleNameChange = event => {
		this.setState({
			name: event.target.value
		});
	}

	handleCardSelect (id) {
		updateId(id);
	}

  render() {

	const style = {
		margin: 6,
		padding: 8,
	}

    return (
		<div className="row" style={{ marginLeft: "0px", marginRight: "0px"}}>
			<div className="col-4 list-section">
					<h1>Contacts</h1>
					<FormGroup>
						<Input
						className="input"
						type="text"
						placeholder="Search Contact"
						value={this.state.searchName}
						onChange={this.handleSearchChange}
						/>
					</FormGroup>
				<div id="scrollableDiv" className="contact-list smooth-scroll" style={{ height: "80vh", overflow: "auto"}}>

					<InfiniteScroll
						dataLength={this.state.items.length}
						next={this.grabContacts}
						hasMore={this.state.hasMore}
						scrollableTarget="scrollableDiv"
						endMessage={
							<p style={{ textAlign: "center" }}>
							<b>End of Contacts</b>
							</p>
						}
						>

						{this.state.items.map(item =>
							<div 
								key={item._id} 
								className="contact-card card flex-row flex-wrap flex-shrink-3"
								onClick={this.handleCardSelect.bind(this, item._id)}
							
							>
								<div className="">
								<img className="card-image contact-icon rounded-circle" src="/default.png" />
								</div>
								<div className="card-block px-2">
									<h4 className="card-title card-text">{item.name}</h4>
									<p className="card-text">{item.cell_phone_number}</p>
									<p className="card-text">{item.company}</p>
								</div>
							</div>
						)}

					</InfiniteScroll>
				</div>
			</div>
			<div className="col-8">
				<ContactView addContact={this.addContact} editContact={this.editContact} deleteContact={this.deleteContact} updateId={this.updateId}/>
			</div>
		</div>
    );
	}
}

export class ContactView extends Component {

	constructor(props) {
		 super(props);

		 this.state = {
			name: '',
			cell_phone_number: '',
			home_address: '',
			birthday: '',
			note: '',
			email: '',
			company: '',
			isEdit: true,

			id: null,
		 };

		 updateId = updateId.bind(this);
	}

	grabUserData() {
		 axios.get(`/api/contact/${this.state.id}`)
		 .then(response => {
			  const data = response.data.data;
			  this.setState({
					name: data.name,
					cell_phone_number: data.cell_phone_number,
					home_address: data.home_address,
					birthday: data.birthday,
					note: data.note,
					email: data.email,
					company: data.company,
			  })
		 })
		 .catch(error => {
			  console.log(error.response)
		 })
	}

	editUserData = event => {

		const data = {
			name: this.state.name,
				cell_phone_number: this.state.cell_phone_number,
				home_address: this.state.home_address,
				birthday: this.state.birthday,
				note: this.state.note,
				email: this.state.email,
				company: this.state.company,
		}

		// Creating new contact
		if (!this.state.id) {
			axios.post('/api/contact', data)
			.then(response => {

				console.log('test')
				const data = response.data.data
				console.log(data)

				this.setState({
					id: data._id,
					isEdit: false,
				})

				this.props.addContact(data)

			})
			.catch(error => {
				console.log(error)
			})

		// Editing contact
		} else {
			axios.put(`/api/contact/${this.state.id}`, data)
			.then(response => {

				data._id = this.state.id

				this.props.editContact(data)
				this.setState({
					isEdit: false,
				})

			})
			.catch(error => {
				console.log(error)
			})
		}
	}

	handleNameChange = event => {
		this.setState({
			 name: event.target.value
		})
	}

	handleEmailChange = event => {
		 this.setState({
			  email: event.target.value
		 })
	}

	handleNumberChange = event => {
		this.setState({
			 cell_phone_number: event.target.value
		})
	}

	handleNoteChange = event => {
		this.setState({
			note: event.target.value
		})
	}

	handleCompanyChange = event => {
		this.setState({
			company: event.target.value
		})
	}

	handleBirthdayChange = event => {
		this.setState({
			birthday: event.target.value
		})
	}

	handleAddressChange = event => {
		this.setState({
			home_address: event.target.value
		})
	}

	onEditClick = event => {
		this.setState({
			isEdit: true
		})
	}

	componentDidMount() {
		 this.grabUserData()
	}

	deleteContact(id) {
	  axios.delete(`/api/contact/${id}`)
	  .then(response => {
		  if (response.data.success) {
			  const id = this.state.id;
			  this.setState({
				name: '',
				cell_phone_number: '',
				home_address: '',
				birthday: '',
				note: '',
				email: '',
				company: '',
				isEdit: true,
				id: null,
				
			  }, () => {
				  this.props.deleteContact(id)
			  });
		  }
	  })
	  .catch(error => {
		  console.log(error.response)
	  })
	}

	resetForms = event => {
		this.setState({
			name: '',
			cell_phone_number: '',
			home_address: '',
			birthday: '',
			note: '',
			email: '',
			company: '',
		})
	}

	render() {

		 const { isEdit, isDeleted } = this.state;

		if (isEdit || isDeleted) {

			return (
				<div className="row contact-container fullscreen">
					<div className="col text-center">
						<Title id={this.state.id}/>


						<div className="row">
							<div className="col text-center image-section">
								<img className="card-image contact-icon2, rounded-circle" src="/default.png" />
							</div>
						</div>

						<div className="container-fluid h-10 bg-light text-dark">
						<div className="row justify-content-center align-items-center">
							<div>&nbsp;</div>  
						</div>
						<hr/>
						<div className="row justify-content-center align-items-center h-10">
							<div className="col col-sm-6 col-md-6 col-lg-4 col-xl-3">
								<form action="">
									<div className="form-group">
										<Input
											type="text"
											className="form-control"
											placeholder="Full Name"
											onChange={this.handleNameChange}
											value={this.state.name}
										/>

										<Input
											type="text"
											className="form-control"
											placeholder="Phone Number"
											onChange={this.handleNumberChange}
											value={this.state.cell_phone_number}
										/>

										<Input
											type="text"
											className="form-control"
											placeholder="Email Address"
											onChange={this.handleEmailChange}
											value={this.state.email}
										/>

										<Input
											type="text"
											className="form-control"
											placeholder="Company"
											onChange={this.handleCompanyChange}
											value={this.state.company}
										/>

										<Input
											type="text"
											className="form-control"
											placeholder="Home Address"
											onChange={this.handleAddressChange}
											value={this.state.home_address}
										/>

										<Input
											type="text"
											className="form-control"
											placeholder="Birthday"
											onChange={this.handleBirthdayChange}
											value={this.state.birthday}
										/>
								
										<textarea
											type="text"
											className="form-control"
											placeholder="Note"
											onChange={this.handleNoteChange}
											value={this.state.note}
										/>


										
									</div>
									<div className="form-group">
										<div className="container">
											<div className="row">
											<div onClick={this.resetForms} className="col"><Button variant="danger" className="">Reset</Button></div>
											<div onClick={this.editUserData} className="col"><Button className="">Submit</Button></div>
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
			)

		}

		 return (
			<div className="row" style={{ background: "gray"}}>

				<div className="col text-center">
				<h1>View Contact</h1>

				<div className="row">
					<div className="col text-center image-section">
						<img className="card-image contact-icon2 rounded-circle" src="/default.png" />
					</div>
				</div>

				<Card.Body className="text-center">
					<Card.Title>{this.state.name}</Card.Title>
					<Card.Text>{this.state.cell_phone_number}</Card.Text>
					<Card.Text>{this.state.home_address}</Card.Text>
					<Card.Text>{this.state.birthday}</Card.Text>
					<Card.Text>{this.state.company}</Card.Text>
					<Card.Text>{this.state.email}</Card.Text>
				</Card.Body>

				<Button onClick={this.onEditClick}>Edit Contact</Button>
				<Button onClick={this.deleteContact.bind(this, this.state.id)}>Delete Contact</Button>
				</div>
			</div>
		 )
	}
}