import React, { Component } from 'react';
import CustomerNavbar from '../CustomerModel/CustomerNavbar';
import "./MyOrders.css"
import axios from 'axios';

class MyOrders extends Component {
    constructor(props) {
        super(props);
        this.state={
            orders:[]
        }
    }
    componentDidMount(){
        let url = "http://localhost:59324/GetAllOrderofcustomer/"+sessionStorage.getItem("custid");
      axios
        .get(url)
        .then((res) => res)
        .then((response) => {
          //
          this.setState({ orders: response.data });
        })
        .catch((error) => {
          console.warn(error);
        });
    }
    orderconfirm(orderid,totprice) {
      alert("Confirm Order!!!!"+totprice);
      let url = "http://localhost:59324/updateorder/" + orderid;
      axios
        .put(url, {
         total_Price: totprice,
          status: "Confirmed",
        })
        .then((response) => {
          alert("Order Confirmed...Order will be shipped in few days"+sessionStorage.getItem("finaltotprice"));
          window.location = "/myorders";
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
          window.location = "/myorders";
          // sessionStorage.clear();
        })
        .catch((error) => {
          alert("order delete error" + error);
        });
    }
    orderdetails(orderi){
      sessionStorage.setItem("oidforview",orderi);
      window.location="/vieworderdetails";
    }
    render() {
        const { orders } = this.state;
        return (
            <>
        <CustomerNavbar></CustomerNavbar>
        <div className="heading">
          <h1> My Orders </h1>
        </div>
        <div>
          <table class="table" style={{textAlign:"center",fontSize:"15px"}}>
            <thead class="thead-dark" style={{textAlign:"center"}}>
              <tr style={{marginLeft:"2%"}}>
                <th style={{paddingLeft:"7%"}}><b>Reference no.</b></th>
                <th style={{paddingLeft:"5%"}}><b> Status</b></th>
                <th style={{paddingLeft:"5%"}}><b>Total Price </b></th> <th style={{paddingLeft:"7%"}}>Confirm Order</th>
                <th style={{paddingLeft:"6%"}}><b>Cancle Order</b></th>
                <th style={{paddingLeft:"6%"}}><b> View Details </b></th>
              </tr>
            </thead>
            <br></br>
            {orders.map((a) => (
              <tr>
                <td>{a.order_id}</td>
                <td> {a.status} </td>
                <td> {a.total_Price} </td>
                <td style={{padding:"1%"}}>
                  <button class="add-to-cart btn btns" style={{backgroundColor:"purple",padding:"3%",fontSize:"12px"}}
                    onClick={this.orderconfirm.bind(
                      this,
                     a.order_id,a.total_Price
                    )}
                  >
                    Confirm
                  </button>
                </td>
                <td>
                  <button class="add-to-cart btn btn-primary btns" style={{backgroundColor:"purple",padding:"3%",fontSize:"12px"}}
                     onClick={this.orderdelete.bind(
                      this,
                      a.order_id)   }
                  >
                    Cancle
                  </button>
                </td>
                <td>
                  <button class="add-to-cart btn btn-primary btns" style={{backgroundColor:"purple",fontSize:"12px",padding:"3%"}}
                    onClick={this.orderdetails.bind(
                      this,
                      a.order_id,
                    )}
                     >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </>
        );
    }
}

export default MyOrders;
