import React, { Component } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "./CustomerLogin.css";
import CustomerNavbar from './CustomerNavbar';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            eusername: "",
            epassword: "",
          };
          this.LoginCustomer = this.LoginCustomer.bind(this);
    }
    validate() {
        if (this.state.username == "" && this.state.password == "") {
          //alert("pls enter username password");
          this.setState({ eusername: "Enter your email" });
          this.setState({ epassword: "Enter your password" });
        } else {
          return true;
        }
      }
      LoginCustomer() {
        if (this.validate()) {
          axios
            .get(
              "http://localhost:59324/login/" +
                this.state.username +
                "/" +
                this.state.password
            )
            .then((res) => res)
            .then((result) => {
              let r = result.data;
              if (r != null) {
                alert("welcome " + result.data.email);
                sessionStorage.setItem("username", result.data.email);
                sessionStorage.setItem("custid",result.data.cust_id);
                sessionStorage.setItem("custaddr",result.data.address)
                window.location = "/homepage";
              } else {
                alert("Invalid Credentials");
              }
            })
            .catch((err) => {
              console.log(err);
              alert("Enter valid credentials");
            });
        }
      }
    
    render() {
        return (
          <>
          <CustomerNavbar></CustomerNavbar>
            <div className="login">
          <div className="title1">Customer Login</div>
          <div className="login-form">
            <div className="title">Sign In</div>
            <div className="input-container">
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label1">
                  Username
                </label>
                <input
                  type="text"
                  required
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={(e) => this.setState({ username: e.target.value })}
                />
                <h5 style={{ color: "red" }}>{this.state.eusername}</h5>
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  class="form-control"
                  id="exampleInputPassword1"
                  onChange={(e) => this.setState({ password: e.target.value })}
                />
              </div>
              <h5 style={{ color: "red" }}>{this.state.epassword}</h5>
              <button class="add-to-cart btn btn-primary btns" style={{backgroundColor:"purple"}} onClick={this.LoginCustomer}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </>
        );
    }
}

export default Login;
