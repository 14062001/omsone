import React, { Component } from 'react';
import CustomerNavbar from './CustomerNavbar';
import Card from "react-bootstrap/Card";
import axios from 'axios';
import "./CustomerRegister.css";

class CustomerRegister extends Component {
  constructor(props) {
    super(props);
    this.state={
      firstname:"",
      lastname:"",
      gender:"",
      mobileno:"",
      email:"",
      mstate:"",
      city:"",
      pincode:"",
      address:"",
      password:"",
      efirstname:"",
      elastname:"",
      egender:"",
      emobileno:"",
      eemail:"",
      emstate:"",
      ecity:"",
      epincode:"",
      eaddress:"",
      epassword:"",
    }
    this.submit=this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  validate() {
    let res=0
    if (this.state.firstname == "") {
      this.setState({ efirstname: "Enter your first name" });
      res++;
    }
    if (this.state.lastname == "") {
      this.setState({ elastname: "Enter your last name" });
      res++;
    }
    if (this.state.email == "") {
      this.setState({ eemail: "Enter your email" });
      res++;
    }
    else if(this.state.email.includes("@gmail.com")==false){
        this.setState({eemail:"Enter valid email address"})
        res++;
    }
   if(this.state.mobileno==""){
    this.setState({ emobileno: "Enter your mobile no" });
    res++;
   }
   else if(this.state.mobileno.length!=10){
    this.setState({ emobileno: "Enter valid mobile no" });
    res++;
   }
   if(this.state.password==""){
    this.setState({ epassword: "Enter your password" });
    res++;
   }
   else if(this.state.password.length<8){
    this.setState({ epassword: "Password should be equal to or more than 8 characters" });
    res++;
   }
  if(this.state.city==""){
    this.setState({ ecity: "Enter your city" });
    res++;
  }
  if(this.state.mstate==""){
    this.setState({ emstate: "Enter your state" });
    res++;
  }
  if(this.state.pincode==""){
    this.setState({ epincode: "Enter your pincode" });
    res++;
  }
  else if(this.state.pincode.length!=6){
    this.setState({ epincode: "Enter valid pincode" });
    res++;
  }
  if(this.state.address==""){
    this.setState({ eaddress: "Enter your address" });
    res++;
  }
  if(res==0){
    return true;
  }
  else{
    return false;
  }
  }
  submit(){
    if(this.validate){
   // alert(this.state.firstname);
    let url="http://localhost:59324/RegisterCustomer";
    if(this.validate())
    axios.post(url,{
      firstname:this.state.firstname,
      lastname:this.state.lastname,
      email:this.state.email,
      gender:this.state.gender,
      mobileno:this.state.mobileno,
      state:this.state.state,
      city:this.state.city,
      address:this.state.address,
      pincode:this.state.pincode,
      password:this.state.password
    }).then((response)=>{
      alert("Customer registred successfully");
      window.location = "/";
    }).catch((error) => {
      alert("error in add to cart from view prod" + error);
    });}
  }
  handleChange(e) {
    this.setState(e);
  }
    render() {
        return (
          <>
          <CustomerNavbar></CustomerNavbar>
          <div className="fplace">
          <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 g-4">
            <Card>
              <Card.Body>
                <div bg="blue">
                  <div className="heading">
                    
                    <h2 style={{marginLeft:"20%"}}>Customer Register</h2>
                    <br></br>
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="First Name"
                      onChange={(e) =>
                        this.handleChange({ firstname: e.target.value })
                      }
                      className="form-control"
                      placeholder="First Name"
                    />
                     <h5 style={{ color: "red" }}>{this.state.efirstname}</h5>
                    <br></br>
                   
                    <input
                      type="text"
                      name="Last Name"
                      onChange={(e) =>
                        this.handleChange({ lastname: e.target.value })
                      }
                      className="form-control"
                      placeholder="Last Name"
                    />
                   <h5 style={{ color: "red" }}>{this.state.elastname}</h5>
                    {/* <label>{this.state.NameError}</label> */}
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      name="Email"
                      onChange={(e) =>
                        this.handleChange({ email: e.target.value })
                      }
                      className="form-control"
                      placeholder="Enter Email"
                    />
                    <h5 style={{ color: "red" }}>{this.state.eemail}</h5>
                  </div>
                  <div className="form-group">
                    <input
                      type="number"
                      name="mobile number"
                      onChange={(e) =>
                        this.handleChange({ mobileno: e.target.value })
                      }
                      className="form-control"
                      placeholder="Enter Mobile no"
                    />
                    <h5 style={{ color: "red" }}>{this.state.emobileno}</h5>
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      name="pass"
                      onChange={(e) =>
                        this.handleChange({ password: e.target.value })
                      }
                      className="form-control"
                      placeholder="Enter Password"
                    />
                    <h5 style={{ color: "red" }}>{this.state.epassword}</h5>
                  
                  <div className="form-group">
                    <label></label>
                    <select
                      onChange={(e) =>
                        this.handleChange({ gender: e.target.value })
                      }
                      className="form-control"
                    >
                      <option value="">Select Gender</option>
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Other">Other</option>
                    </select>
                    <h5 style={{ color: "red" }}>{this.state.egender}</h5>
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="City"
                      onChange={(e) =>
                        this.handleChange({ city: e.target.value })
                      }
                      className="form-control"
                      placeholder="Enter City"
                    />
                    <h5 style={{ color: "red" }}>{this.state.ecity}</h5>
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="State"
                      onChange={(e) =>
                        this.handleChange({ state: e.target.value })
                      }
                      className="form-control"
                      placeholder="Enter state"
                    />
                    <h5 style={{ color: "red" }}>{this.state.emstate}</h5>
                  </div>
                  <div className="form-group">
                    <input
                      type="pincode"
                      name="Pincode"
                      onChange={(e) =>
                        this.handleChange({ pincode: e.target.value })
                      }
                      className="form-control"
                      placeholder="Enter Pincode"
                    />
                    <h5 style={{ color: "red" }}>{this.state.epincode}</h5>
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="Address"
                      onChange={(e) =>
                        this.handleChange({ address: e.target.value })
                      }
                      className="form-control"
                      placeholder="Enter Address"
                    />
                    <h5 style={{ color: "red" }}>{this.state.eaddress}</h5>
                  </div>
                  {/* <div className="form-group">
             <label></label>
                <input type="number" name="leave_bal" onChange={(e) => this.handleChange({ Leave_bal: e.target.value })} className="form-control" placeholder="Enter Leave balance" />
                <p style={{color:"red"}}>{this.state.PasswordError}</p>
         </div> */}
                  {/* <div className="form-group">
             <label></label>
                <input type="number" name="mgrid" onChange={(e) => this.handleChange({ Manager_Id: e.target.value })} className="form-control" placeholder="Enter Manager id" />
                <p style={{color:"red"}}>{this.state.PasswordError}</p>
         </div>
         */}</div>
                  <br />
                  <button
                    onClick={this.submit}
                    className="btn btn-outline-info"
                    class="add-to-cart btn btn-primary btns" style={{backgroundColor:"purple",height:"30%",width:"30%",marginLeft:"30%"}}
                  >
                    Register
                  </button>
                  <br /> <br />
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </>
        );
    }
}

export default CustomerRegister;
