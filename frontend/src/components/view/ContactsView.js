import React, { Component } from 'react';
import { Button, Navbar, Card } from "react-bootstrap";
import { Form, FormGroup, Row, Col, Label, Input, FormFeedback } from 'reactstrap';

import axios from "axios";
import './style.css'
import './ContactView.css'
export default class ContactsView extends Component {

  constructor() {
	 super();
	 
     this.state = {
         exampleItems: [],
         pageOfItems: [],
			name: '',
			searchName: '',
     };

     // bind function in constructor instead of render (https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)
	  this.onChangePage = this.onChangePage.bind(this);
  }

  componentDidMount() {
    this.grabContacts();
  }

  grabContacts() {
    axios.get(`/api/contacts`, {
		 params: {
			 name: this.state.searchName
		 }
	 })
    .then(response => {
        const data = response.data.data;
        console.log({ RESPONSE: data} )
        this.setState({
          exampleItems: data,
        })
    })
    .catch(error => {
      console.log(error)
    })
  }

  onChangePage(pageOfItems) {
    // update state with new page of items
    this.setState({ pageOfItems: pageOfItems });
  }

  addContact = event => {
    axios.post('/api/contact', { name: this.state.name, cell_phone_number: 'test' })
    .then(response => {
		const data = response.data.data
      this.setState({
        exampleItems: [...this.state.exampleItems, { name: data.name, _id: data._id } ],
      })
    })
    .catch(error => {
      console.log(error.response.data)
    })
  }

  handleSearchChange = event => {
	this.setState({
	  searchName: event.target.value
	}, () => {
		this.grabContacts()
	})
 }

  handleNameChange = event => {
    this.setState({
      name: event.target.value
    });
  }

  render() {
    return (
        <div>
            <div className="container">
              <div>
				  <FormGroup>
                  <Input
                    className="input"
                    type="text"
                    placeholder="Search Contact"
                    value={this.state.searchName}
                    onChange={this.handleSearchChange}
                  />
                </FormGroup>
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

					</div>
						<div className="container contact-list">
							<h1>Contacts</h1>
							{this.state.pageOfItems.map(item =>
								<div key={item._id} class="card flex-row flex-wrap flex-shrink-3">
									<div class="card-header">
										<img className="contact-image" src="/default.png" alt="" />
									</div>
									<div class="card-block px-2">
										<h4 class="card-title card-text">{item.name}</h4>
										<p class="card-text">16419 SW 50th Ter, Miami, FL, 33185</p>
										<p class="card-text">305-490-2892</p>
									</div>
									<div className="card-block px-2">
										<a href={`/contact/${item._id}`} class="btn btn-primary">Open</a>
									</div>
						  		</div>
								
							)}
							<Pagination items={this.state.exampleItems} onChangePage={this.onChangePage} />
						</div>
            </div>
            <hr />
        </div>
    );
}
}

const defaultProps = {
  initialPage: 1,
  pageSize: 10
}

export class Pagination extends React.Component {
  constructor(props) {
      super(props);
      this.state = { pager: {} };
  }

  componentWillMount() {
      // set page if items array isn't empty
      if (this.props.items && this.props.items.length) {
          this.setPage(this.props.initialPage);
      }
  }

  componentDidUpdate(prevProps, prevState) {
      // reset page if items array has changed
      if (this.props.items !== prevProps.items) {
          this.setPage(this.props.initialPage);
      }
  }

  setPage(page) {
      var { items, pageSize } = this.props;
      var pager = this.state.pager;

      if (page < 1 || page > pager.totalPages) {
          return;
      }

      // get new pager object for specified page
      pager = this.getPager(items.length, page, pageSize);

      // get new page of items from items array
      var pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

      // update state
      this.setState({ pager: pager });

      // call change page function in parent component
      this.props.onChangePage(pageOfItems);
  }

  getPager(totalItems, currentPage, pageSize) {
      // default to first page
      currentPage = currentPage || 1;

      // default page size is 10
      pageSize = pageSize || 10;

      // calculate total pages
      var totalPages = Math.ceil(totalItems / pageSize);

      var startPage, endPage;
      if (totalPages <= 10) {
          // less than 10 total pages so show all
          startPage = 1;
          endPage = totalPages;
      } else {
          // more than 10 total pages so calculate start and end pages
          if (currentPage <= 6) {
              startPage = 1;
              endPage = 10;
          } else if (currentPage + 4 >= totalPages) {
              startPage = totalPages - 9;
              endPage = totalPages;
          } else {
              startPage = currentPage - 5;
              endPage = currentPage + 4;
          }
      }

      // calculate start and end item indexes
      var startIndex = (currentPage - 1) * pageSize;
      var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

      // create an array of pages to ng-repeat in the pager control
      var pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

      // return object with all pager properties required by the view
      return {
          totalItems: totalItems,
          currentPage: currentPage,
          pageSize: pageSize,
          totalPages: totalPages,
          startPage: startPage,
          endPage: endPage,
          startIndex: startIndex,
          endIndex: endIndex,
          pages: pages
      };
  }

  render() {
      var pager = this.state.pager;

      if (!pager.pages || pager.pages.length <= 1) {
          // don't display pager if there is only 1 page
          return null;
      }

      return (
          <ul className="pagination">
              <li className={pager.currentPage === 1 ? 'disabled' : ''}>
                  <a onClick={() => this.setPage(1)}>First</a>
              </li>
              <li className={pager.currentPage === 1 ? 'disabled' : ''}>
                  <a onClick={() => this.setPage(pager.currentPage - 1)}>Previous</a>
              </li>
              {pager.pages.map((page, index) =>
                  <li key={index} className={pager.currentPage === page ? 'active' : ''}>
                      <a onClick={() => this.setPage(page)}>{page}</a>
                  </li>
              )}
              <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                  <a onClick={() => this.setPage(pager.currentPage + 1)}>Next</a>
              </li>
              <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                  <a onClick={() => this.setPage(pager.totalPages)}>Last</a>
              </li>
          </ul>
      );
  }
}