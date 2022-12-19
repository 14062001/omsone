import React, { Component } from 'react';
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBContainer,
    MDBInput,
    MDBRow,
  } from "mdb-react-ui-kit";
import CustomerNavbar from '../CustomerModel/CustomerNavbar';

class CardPayment extends Component {
  constructor(props) {
    super(props);
    
  }
  paynow(){
    alert("Payment done");
    window.location="/enteremail";
  }
    render() {
        return (
            <div>
                <CustomerNavbar></CustomerNavbar>
                 <MDBContainer className="py-5" fluid>
          <MDBRow className=" d-flex justify-content-center">
            <MDBCol md="10" lg="8" xl="5">
              <MDBCard className="rounded-3">
                <MDBCardBody className="p-4">
                  <div className="text-center mb-4">
                    <h3>Settings</h3>
                    <h6>Payment</h6>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4 pb-1"></div>
                  <p className="fw-bold mb-4">Add new card:</p>
                  <MDBInput
                    label="Cardholder's Name"
                    id="form3"
                    type="text"
                    size="lg"
                    value="Anna Doe"
                  />
                  <img
                    className="img-fluid"
                    src="https://img.icons8.com/color/48/000000/visa.png"
                  />
                  <MDBRow className="my-4">
                    <MDBCol size="7">
                      <MDBInput
                        label="Card Number"
                        id="form4"
                        type="text"
                        size="lg"
                        value="1234 5678 1234 5678"
                      />
                    </MDBCol>
                    <MDBCol size="3">
                      <MDBInput
                        label="Expire"
                        id="form5"
                        type="password"
                        size="lg"
                        placeholder="MM/YYYY"
                      />
                    </MDBCol>
                    <MDBCol size="2">
                      <MDBInput
                        label="CVV"
                        id="form6"
                        type="password"
                        size="lg"
                        placeholder="CVV"
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBBtn
                    color="purple"
                    size="lg"
                    block
                    onClick={this.paynow}
                  >
                    Pay Now
                  </MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
            </div>
        );
    }
}

export default CardPayment;
