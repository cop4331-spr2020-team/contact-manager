import React, { Component } from 'react';
import { Button, Navbar, Card } from "react-bootstrap";
import { Form, FormGroup, Row, Col, Label, Input, FormFeedback } from 'reactstrap';
import InfiniteScroll from "react-infinite-scroll-component";
//import ContactView from './ContactView'

import axios from "axios";
import './style.css'
import './ContactView.css'

function updateId(id) {
	console.log(id)
	this.setState({id}, () => {
		this.grabUserData()
	})
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

  addContact = event => {
    axios.post('/api/contact', { name: this.state.name, cell_phone_number: 'test' })
    .then(response => {
		 console.log(response.data)
		const data = response.data.data
      this.setState({
			items: [...this.state.items, { name: data.name, _id: data._id } ],
      })
    })
    .catch(error => {
      console.log(error.response.data)
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
        <div>
            <div className="outer-wrap">
					<div className="row">
						<div className="col-4">
							<FormGroup>
								<Input
								name="firstName"
								className="input"
								type="text"
								placeholder="First Name"
								value={this.state.name}
								onChange={this.handleNameChange}
								/>
							</FormGroup>

							<Button onClick={this.addContact}>Add user</Button>
							<div className="contact-list">
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
								<InfiniteScroll
									dataLength={this.state.items.length}
									next={this.grabContacts}
									hasMore={this.state.hasMore}
									height={600}
									endMessage={
										<p style={{ textAlign: "center" }}>
										<b>Yay! You have seen it all</b>
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
												<p className="card-text">16419 SW 50th Ter, Miami, FL, 33185</p>
												<p className="card-text">305-490-2892</p>
											</div>
											<div className="card-block px-2">
												<a href={`/contact/${item._id}`} className="btn btn-primary">Open</a>
											</div>
										</div>
									)}

								</InfiniteScroll>
							</div>
						</div>
						<div className="contact-container col-8">
							<ContactView updateId={this.updateId}/>
						</div>
					</div>
            </div>
			<hr />
		</div>
    );
	}
}

export class ContactView extends Component {

	constructor(props) {
		 super(props);

		 this.state = {
			  id: null,
			  name: '',
			  newName: '',
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
		 axios.put(`/api/contact/${this.state.id}`, {
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

		 return (
			  <div className="container">
				  <div className="row">

					  <div className="col">

						  <div className="row">
							  <div className="col text-center">
									<img className="card-image contact-icon2 rounded-circle" src="/default.png" />
							  </div>
						  </div>

							<Card.Body className="text-center">
								<Card.Title>{this.state.name}</Card.Title>
								<Card.Text>{this.state.cell_phone_number}</Card.Text>
								<Button variant="primary">Go somewhere</Button>
							</Card.Body>

							{this.state.id}
								<Input
									value={this.state.newName}
									onChange={this.handleNameChange}
									placeholder="New Name"
								>
								</Input>
								<Button onClick={this.editUserData}>Update Contact</Button>
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