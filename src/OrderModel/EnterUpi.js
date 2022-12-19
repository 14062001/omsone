import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import CustomerNavbar from '../CustomerModel/CustomerNavbar';

class EnterUpi extends Component {
    paynow(){
        alert("Payment done");
        window.location="/enteremail";
      }
        
    render() {
        return (
            <>
            <CustomerNavbar></CustomerNavbar>
            <h3 style={{marginLeft:"40%"}}>Please enter your UPI Id</h3>
            <Card style={{height:"40%",width:"30%",padding:"2%",marginLeft:"40%",marginTop:"5%"}}>
            <div class="form-outline">
            <input type="text" id="form12" class="form-control" />
            <label class="form-label" for="form12">Enter UPI ID</label>
            <br></br>
            <button  onClick={this.paynow}>Pay now</button>
            </div>
            </Card>
            </>
        );
    }
}

export default EnterUpi;
