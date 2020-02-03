import React, { Component, Fragment } from "react";

import './ContactCard.css'

class ContactCard extends Component {
  render() {
    const { name } = this.props || {};
    console.log(this.props)
    return (
      <Fragment>
          <div className="container contact-card-wrapper">
            <div className="justify-content-center">
                <div className="contact-card border-gray rounded border mx-2 my-3 d-flex flex-row align-items-center p-0 bg-light">
                    <div className="h-100 position-relative border-gray border-right px-2 bg-white rounded-left">
                    </div>
                    <div className="px-3">
                    <span className="contact-name text-dark d-block font-weight-bold">
                        {name}
                    </span>
                    </div>
                </div>
            </div>
          </div>
      </Fragment>
    );
  }
}

export default ContactCard;
