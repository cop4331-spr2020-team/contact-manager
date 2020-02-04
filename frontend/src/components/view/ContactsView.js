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
	console.log(tarray)
	return tarray;
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
								className="card flex-row flex-wrap flex-shrink-3"
								onClick={this.handleCardSelect.bind(this, item._id)}
							
							>
								<div className="">
								<img className="card-image contact-icon rounded-circle" src="/default.png" />
								</div>
								<div className="card-block px-2">
									<h4 className="card-title card-text">{item.name}</h4>
									<p className="card-text">{item.cell_phone_number}</p>
									<p className="card-text">{item.address}</p>
								</div>
							</div>
						)}

					</InfiniteScroll>
				</div>
			</div>
			<div className="col-7">
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
			isEdit: false,

			id: null,
			isDeleted: false,
		 };

		 updateId = updateId.bind(this);
	}

	grabUserData() {
		 axios.get(`/api/contact/${this.state.id}`)
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

		console.log('test2')

		const data = {
			name: this.state.name,
				cell_phone_number: this.state.cell_phone_number,
				home_address: this.state.home_address,
				birthday: this.state.birthday,
				note: this.state.note,
				email: this.state.email,
				company: this.state.company,
				_id: this.state.id,
		}

		// Creating new contact
		if (!this.state.id) {
			axios.post('/api/contact', data)
			.then(response => {

				console.log('test')
				const data = response.data.data
				
				this.setState({
					id: data._id,
					isEdit: true,
					isDeleted: false,
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

				this.props.editContact(data)

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
		  console.log('delete attempt.')
		  if (response.data.success) {
			  console.log('delete success.')
			  this.setState({
				  isDeleted: true,
			  });
		  }
	  })
	  .then(response => {
			this.props.deleteContact(this.state.id)
		})
	  .catch(error => {
		  console.log(error.response)
	  })
	}

	render() {

		 const { isEdit, isDeleted } = this.state;

		if (isEdit) {

			return (
				<div className="">

					<div className="row">
						<div className="col">
							<h1>Create Contact</h1>


							<div className="row">
								<div className="col text-center image-section">
									<img className="card-image contact-icon2, rounded-circle" src="/default.png" />
								</div>
							</div>

							<Card.Body className="text-center">
								<Input
									onChange={this.handleNameChange}
									value={this.state.name}
								/>

								<Input
									onChange={this.handleNumberChange}
									value={this.state.cell_phone_number}
								/>

								<Input
									onChange={this.handleAddressChange}
									value={this.state.home_address}
								/>

								<Input
									onChange={this.handleBirthdayChange}
									value={this.state.birthday}
								/>

								<Input
									onChange={this.handleNoteChange}
									value={this.state.note}
								/>

								<Input
									onChange={this.handleEmailChange}
									value={this.state.email}
								/>

								<Input
									onChange={this.handleCompanyChange}
									value={this.state.company}
								/>
							</Card.Body>

							<Button
								onClick={this.editUserData}
							>
								Save
							</Button>

						</div>
					</div>
				</div>
			)

		}

		 return (
			  <div className="">
				  <div className="row">

					  <div className="col">

						  <div className="row">
							  <div className="col text-center image-section">
									<img className="card-image contact-icon2 rounded-circle" src="/default.png" />
							  </div>
						  </div>

							<Card.Body className="text-center">
								<Card.Title>{this.state.name}</Card.Title>
								<Card.Text>{this.state.cell_phone_number}</Card.Text>
							</Card.Body>
							<Input
								value={this.state.newName}
								onChange={this.handleNameChange}
								placeholder="New Name"
							>
							</Input>
							<Button onClick={this.onEditClick}>Edit Contact</Button>
							<Button onClick={this.deleteContact.bind(this, this.state.id)}>Delete Contact</Button>
							<b>
								{this.state.name}
							</b>

					  </div>
				  </div>
			  </div>
		 )
	}
}