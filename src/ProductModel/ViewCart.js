import React, { Component } from 'react';
import "./ViewCart.css";
import CustomerNavbar from '../CustomerModel/CustomerNavbar';
import axios from "axios";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";

class ViewCart extends Component {
constructor(props) {
    super(props);
    this.state={
        products:[],
        singleproduct:[],
        id:""
    }
  
}
t=0;
componentDidMount() {
    let url ="http://localhost:59324/GetAllCartProducts"
   
    axios
    .get(url)
    .then((res) => res)
    .then((response) => {
      //
      this.setState({ products: response.data });
      this.state.singleproduct = response.data;
     // sessionStorage.setItem("totprice",this.state.singleproduct[0].productPrice);
      console.log(sessionStorage.getItem("totprice"));
      // this.t = parseInt(
      //   sessionStorage.getItem("totprice")) + this.t
      //console.log(this.t);
    })
    .catch((error) => {
      console.warn(error);
    });
  }
  orderconfirm(orderid) {
    alert("Confirm Order!!!!");
    let url = "http://localhost:59324/updateorder/" + orderid;
    axios
      .put(url, {
        total_Price: sessionStorage.getItem("finaltotprice"),
        status: "Confirmed",
      })
      .then((response) => {
        alert("Order Confirmed...Order will be shipped in few days"+sessionStorage.getItem("finaltotprice"));
        window.location = "/paymentoptions";
        sessionStorage.setItem("status","confirmed");
        // sessionStorage.clear();
      })
      .catch((error) => {
        alert("order confirm error" + error);
      });
  }
  orderdelete(orderid) {
    alert("Order Cancelled");
    let url = "http://localhost:59324/updateorder/" + orderid;
    axios
      .put(url, {
        status: "Cancelled",
      })
      .then((response) => {
        alert("Order Cancelled");
        window.location = "/homepage";
       // sessionStorage.setItem("status","cancelled");
        // sessionStorage.clear();
      })
      .catch((error) => {
        alert("order delete error" + error);
      });
  }
  deleteproduct(orderid,productid){
    alert("Are you sure u want to delete this product"+productid);
    let url9="http://localhost:59324/deleteproduct/"+productid;
    axios.delete(url9)
      .then(res=>{
        alert("Product removed from cart");
        let url10="http://localhost:59324/deleteproductid/"+orderid+"/"+productid
        alert(res.data.productPrice)
        sessionStorage.setItem("prodprice",res.data.productPrice);
        axios.delete(url10)
        .then(res=>{
          alert("product removed from items");
          //sessionStorage.setItem("prodprice",productprice);
          let p=parseInt(sessionStorage.getItem("finaltotprice"))-parseInt(sessionStorage.getItem("prodprice"));
          sessionStorage.setItem("finaltotprice",p)
          let q=parseInt(sessionStorage.getItem("finalquantity"))-1;
          sessionStorage.setItem("finalquantity",q);
          window.location="/viewcart";

        }).catch((err) => {
          console.log(err);
      })
      }).catch((err) => {
        console.log(err);
    })
  }
    render() {
        const { products } = this.state;    
        return (
           <>
        <CustomerNavbar></CustomerNavbar>
        <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
          <MDBContainer className="py-5 h-100">
            <MDBRow className="justify-content-center align-items-center h-100">
              <MDBCol>
                <MDBCard>
                  <MDBCardBody className="p-4">
                    <MDBRow>
                      <MDBCol lg="7">
                        <MDBTypography tag="h5">
                          <a href="/homepage" className="text-body">
                            <MDBIcon fas icon="long-arrow-alt-left me-2" />
                            Continue shopping
                          </a>
                        </MDBTypography>

                        <hr />

                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <div>
                            <p className="mb-1">Shopping cart</p>
                            <p className="mb-0">
                              You have {sessionStorage.getItem("finalquantity")} items in your cart
                            </p>
                          </div>
                          x
                        </div>
                        {products.map((a) => (
                          <MDBCard className="mb-3">
                            <MDBCardBody>
                              <div className="d-flex justify-content-between">
                                <div className="d-flex flex-row align-items-center">
                                  <div>
                                    <MDBCardImage
                                      src={a.imageUrl}
                                      fluid
                                      className="rounded-3"
                                      style={{ width: "65px" }}
                                      alt="Shopping item"
                                    />
                                  </div>
                                  <div className="ms-3">
                                    <MDBTypography tag="h5">
                                      {a.productName}
                                    </MDBTypography>
                                    <p className="small mb-0">
                                      {a.product_details}
                                    </p>
                                  </div>
                                </div>
                                <div className="d-flex flex-row align-items-center">
                                  <div style={{ width: "50px" }}></div>
                                  <div style={{ width: "80px" }}>
                                    <MDBTypography tag="h5" className="mb-0">
                                      {a.productPrice}
                                    </MDBTypography>
                                  </div>
                                  <button
                                    style={{ color: "white",backgroundColor:"purple",borderColor:"purple" }}
                                    onClick={this.deleteproduct.bind(
                                      this,
                                     sessionStorage.getItem("orderid"),
                                    a.product_id                                 
                                    )}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </MDBCardBody>
                          </MDBCard>
                        ))}
                      </MDBCol>

                      <MDBCol lg="5">
                        <br></br>
                        <MDBCard className="text-black rounded-3">
                          <MDBCardBody>
                            <hr />

                            <div className="d-flex justify-content-between">
                              <p className="mb-2">Total(Incl. taxes)</p>
                              <p className="mb-2">₹{sessionStorage.getItem("finaltotprice")}</p>
                            </div>
                            <br></br>
                            <MDBBtn
                              onClick={this.orderconfirm.bind(
                                this,
                                sessionStorage.getItem("orderid")
                              )}
                              style={{backgroundColor:"purple"}}
                              color="purple"
                              block
                              size="lg"
                            >
                              <div className="d-flex justify-content-between" >
                                <span>
                                  {sessionStorage.getItem("settotalprice")}
                                </span>
                                <span style={{color:"white"}}>
                                  Confirm Order
                                  <i className="fas fa-long-arrow-alt-right ms-2"></i>
                                </span>
                              </div>
                            </MDBBtn>
                            <br></br>
                            <br></br>
                            <MDBBtn
                               onClick={this.orderdelete.bind(
                                this,
                               sessionStorage.getItem("orderid")                                     
                              )}
                              style={{backgroundColor:"purple"}}
                              color="purple"
                              block
                              size="lg"
                            >
                              <div className="d-flex justify-content-between">
                                <span></span>
                                <span style={{color:"white"}}>
                                  Cancle Order
                                  <i className="fas fa-long-arrow-alt-right ms-2"></i>
                                </span>
                              </div>
                            </MDBBtn>
                          </MDBCardBody>
                        </MDBCard>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
      </>
        );
    }
}

export default ViewCart;
