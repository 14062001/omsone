import React, { Component } from 'react';
import CustomerNavbar from '../CustomerModel/CustomerNavbar';
import axios from 'axios';
class ViewProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state={
      product_id:"",
      productName:"",
      size:"",
      color:"",
      quantity:"",
      product_details:"",
      imageUrl:"",
      productPrice:"",
      products:[]
    }
  }
  back(){
    window.location="/homepage"
  }
  componentDidMount() {
    let setprodid = sessionStorage.getItem("productid");
//alert(setprodid);
    let url1 = "http://localhost:59324/GetProductById/"+setprodid;
    axios
      .get(url1)
      .then((response) => {
       // console.log(response.data)
        this.state.products = response.data;
        //alert(setprodid);
        //alert(response.data.product_id);
        console.log(this.state.products);
        this.setState({
          product_id:this.state.products[0].product_id,
          productName: this.state.products[0].productName,
          size:this.state.products[0].size,
          color:this.state.products[0].color,
          product_details: this.state.products[0].product_details,
          quantity:this.state.products[0].quantity,
          imageUrl:this.state.products[0].imageUrl,
          productPrice: this.state.products[0].productPrice,
        }); 
       // console.log(this.state.products[0].product_id)
        sessionStorage.setItem("prodid", this.state.product_id);
        sessionStorage.setItem("productPrice", this.state.productPrice);
        //alert(sessionStorage.getItem("prodprice"));
      })
      .catch((error) => {
        console.warn(error);
        console.log(error)
      });
  }
    
    render() {
        return (
            <>
            <CustomerNavbar></CustomerNavbar>
            <br></br>
            <br></br>
            <div class="container">
		<div class="card">
			<div class="container-fliud">
				<div class="wrapper row">
					<div class="preview col-md-6">
						
						<img style={{height:"95%",width:"90%",paddingLeft:"15%",paddingTop:"4%"}} src={this.state.imageUrl}></img>
					
						
					</div>
					<div class="details col-md-6">
						<h3 class="product-title">{this.state.productName}</h3>
						<div class="rating">
							<div class="stars">
								<span class="fa fa-star checked"></span>
								<span class="fa fa-star checked"></span>
								<span class="fa fa-star checked"></span>
								<span class="fa fa-star"></span>
								<span class="fa fa-star"></span>
							</div>
							<span class="review-no">41 reviews</span>
						</div>
						<p class="product-description">{this.state.product_details}</p>
						<h4 class="price">current price: <span>₹{this.state.productPrice}</span></h4>
						<p class="vote"><strong>91%</strong> of buyers enjoyed this product! <strong>(87 votes)</strong></p>
						<h5 class="sizes">sizes:
							<span class="size" data-toggle="tooltip" title="small">{this.state.size}</span>
							
						</h5>
						<h5 class="colors">colors:
							<span class="color orange not-available" data-toggle="tooltip" title="Not In store">{this.state.color}</span>
							
						</h5>
            <br></br>
						<div class="action" style={{paddingBottom:"2%"}}>
							<button class="add-to-cart btn btn-primary" style={{backgroundColor:"purple",padding:"1.5%"}} type="button" onClick={this.back}>Back</button>
					</div>
					</div>
				</div>
			</div>
		</div>
	</div>
            </>
        );
    }
}

export default ViewProductDetails;
