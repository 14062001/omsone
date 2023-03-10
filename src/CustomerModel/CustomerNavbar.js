import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import "./CustomerNavbar.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
// import "bootstrap-css-only/css/bootstrap.min.css";
// import "mdbreact/dist/css/mdb.css";
import Nav from "react-bootstrap/Nav";
import axios from 'axios';

class CustomerNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    this.logout = this.logout.bind(this);
    this.register = this.register.bind(this);
    }
    logout() {
      sessionStorage.clear();
      let url="http://localhost:59324/deleteall";
      axios.delete(url)
      .then(res => {
          console.log(res.data);
          alert("cart deleted");
          window.location = "/";
      })
      .catch((err) => {
          console.log(err);
      })
      // window.location = "/";
    }
    register() {
      window.location = "/registration";
    }
    
    render() {
        return (
            <div className="topbar">
        <div className="topbarWrapper">
          <div className="topLeft">
            <span className="logo">ShopNow</span>
          </div>
          {/* <div className="topRight">
        <div className="topbarIconContainer">
          <span className="topIconBadge">2</span>
        </div>
        <div className="topbarIconContainer">
          <span className="topIconBadge">2</span>
        </div>
        <div className="topbarIconContainer">
        </div>
      </div>*/}

          <Nav.Item>
            <Nav.Link href="/viewcart" className="links">
              <b>View Cart</b>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/myorders">
              <b>My Orders</b>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/homepage">
              <b>All products</b>
            </Nav.Link>
          </Nav.Item>
          <button class="btn btn-primary btn-sm btns" onClick={this.register}>Register</button>
          <button class="btn btn-primary btn-sm btns" onClick={this.logout}>Log out</button>
        </div>
      </div>
        );
    }
}

export default CustomerNavbar;
