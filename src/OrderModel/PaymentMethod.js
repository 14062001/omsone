import React, { Component } from 'react';
import CustomerNavbar from '../CustomerModel/CustomerNavbar';
import "./PaymentMethod.css";
import { MDBRadio, MDBBtn } from "mdb-react-ui-kit";
import axios from 'axios';
class PaymentMethod extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    this.onChangeValue = this.onChangeValue.bind(this);
    this.payment = this.payment.bind(this);
  
    }
    
    onChangeValue(event) {
        sessionStorage.setItem("paymentmethod", event.target.value);
      }

      payment() {
        alert(sessionStorage.getItem("paymentmethod"));
       
        if (sessionStorage.getItem("paymentmethod") == "UPI") {
            let url="http://localhost:59324/updatepaymentmethod/"+sessionStorage.getItem("orderid");
        axios.put(url,{
            payment_method:"UPI"
        }).then((response)=>{
            alert("payment method is updated");
            window.location="/enterupi";
        }).catch((error)=>{
            alert(error);
        });
        } 
        if(sessionStorage.getItem("paymentmethod") == "Cash on delivery"){
            let url="http://localhost:59324/updatepaymentmethod/"+sessionStorage.getItem("orderid");
            axios.put(url,{
                payment_method:"Cash on delivery"
            }).then((response)=>{
                alert("payment method is updated");
             window.location="/enteremail";
            }).catch((error)=>{
                alert(error);
            });
        }
        else{
            let url="http://localhost:59324/updatepaymentmethod/"+sessionStorage.getItem("orderid");
            axios.put(url,{
                payment_method:"ATM Card"
            }).then((response)=>{
                alert("payment method is updated");
                window.location="/cardpayment";
            }).catch((error)=>{
                alert(error);
            });
        }
      }
    render() {
        return (
            <>
                <CustomerNavbar></CustomerNavbar>
            
                    <div className="outerdiv">
                        <div className="title">Payment Options</div>

                        <div className="choose-form" onChange={this.onChangeValue} style={{flex:"align"}}>
                            
                                <MDBRadio
                                    name="flexRadioDefault"
                                    id="flexRadioDefault1"
                                    label=" UPI"
                                    value={"UPI"}
                                    
                                />

                            <br></br>
                            <MDBRadio
                                name="flexRadioDefault"
                                id="flexRadioDefault2"
                                label="Credit/Debit/ATM Card"
                                value={"ATM"}
                            />
                           
                           
                            <br></br>
                            <MDBRadio
                                name="flexRadioDefault"
                                id="flexRadioDefault2"
                                label="Cash on delivery"
                                value={"Cash on delivery"}
                            />
                            <br></br>
                            <MDBBtn className="btn1" onClick={this.payment}>
                                Continue
                            </MDBBtn>
                        </div>
                    </div>
             
            </>
        );
    }
}

export default PaymentMethod;
