import React, { Component } from 'react';
import axios from 'axios';
import CustomerNavbar from '../CustomerModel/CustomerNavbar';
class ViewOrderDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order_id: "1",
            status: "",
            order_details: "",
            order_date: "",
            delivery_Address: "",
            shipment_date: "",
            payment_method: "",
            total_Price: "",
        };
    }
    componentDidMount() {
        let oi = sessionStorage.getItem("oidforview");
        //alert(oi);
        let url = "http://localhost:59324/GetByOrderid/" + oi;
        axios
            .get(url)
            .then((res) => res)
            .then((response) => {
                //alert(response.data.order_id);
                this.state.order_id = response.data.order_id;
                this.setState({
                    status: response.data.status,
                    order_details: response.data.order_details,
                    order_date: response.data.order_date,
                    delivery_Address: response.data.delivery_Address,
                    shipment_date: response.data.shipment_date,
                    payment_method: response.data.payment_method,
                    total_Price: response.data.total_Price,
                });
                console.log(this.state.status);
                //sessionStorage.setItem("prodid", this.state.product_id);
                // sessionStorage.setItem("prodprice", this.state.product_price);
                //alert(sessionStorage.getItem("prodprice"));
            })
            .catch((error) => {
                console.warn(error);
            });
    }
    render() {
        return (
            <>
                <CustomerNavbar></CustomerNavbar>
                <div class="container emp-profile">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="profile-head">
                                <h1 class="forh1">
                                    <u>Order Details</u>

                                </h1>
                            </div>
                        </div>
                        <div class="col-md-2"></div>
                    </div>
                    <div class="row">
                        <div class="col-md-8">
                            <div class="tab-content profile-tab" id="myTabContent">
                                <div
                                    class="tab-pane fade show active"
                                    id="home"
                                    role="tabpanel"
                                    aria-labelledby="home-tab"
                                >
                                    <div class="col-md-2"></div>
                                </div>
                                <div class="row">
                                    <div class="row">
                                    <div class="col-md-6">
                                        <label style={{fontSize:"20px"}}>Order Reference no</label>
                                    </div>
                                    <div class="col-md-6">
                                        <p style={{fontSize:"20px"}}>{this.state.order_id}</p>
                                    </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label style={{fontSize:"20px"}}>Status</label>
                                        </div>
                                        <div class="col-md-6">
                                            <p style={{fontSize:"20px"}}>{this.state.status}</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label style={{fontSize:"20px"}}>Details</label>
                                        </div>
                                        <div class="col-md-6">
                                            <p style={{fontSize:"20px"}}>{this.state.order_details}</p>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-md-6">
                                            <label style={{fontSize:"20px"}}>Order date</label>
                                        </div>
                                        <div class="col-md-6">
                                            <p style={{fontSize:"20px"}}>{this.state.order_date}</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label style={{fontSize:"20px"}}>Shippment date</label>
                                        </div>
                                        <div class="col-md-6">
                                            <p style={{fontSize:"20px"}}>{this.state.shipment_date}</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label style={{fontSize:"20px"}}>Payment method</label>
                                        </div>
                                        <div class="col-md-6">
                                            <p style={{fontSize:"20px"}}>{this.state.payment_method}</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label style={{fontSize:"20px"}}>Total price</label>
                                        </div>
                                        <div class="col-md-6">
                                            <p style={{fontSize:"20px"}}>{this.state.total_Price}</p>
                                        </div>
                                    </div>
                                    <br></br>
                  <a href="/myorders">Back</a>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            </>
        );
    }
}

export default ViewOrderDetails;
