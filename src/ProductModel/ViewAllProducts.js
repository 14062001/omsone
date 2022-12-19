import React, { Component } from 'react';
import CustomerNavbar from '../CustomerModel/CustomerNavbar';
import "./ViewAllProducts.css"
import axios from 'axios';

class ViewAllProducts extends Component {
    constructor(props) {
        super(props);
        const current = new Date();
        const date = `${current.getFullYear()}/${
          current.getMonth() + 1
        }/${current.getDate()}`;
        var d = new Date(date);
        this.state={
          products:[],
          products1:[],
          product_id:"",
          productName:"",
          size:"",
          color:"",
          quantity:"1",
          product_details:"",
          imageUrl:"",
          productPrice:"",
          order_details:"Item should be opened and verified at the time of delivery.",
          status:"Pending",
          order_date:"d",
          shipment_date:"d",
          delivery_Address:sessionStorage.getItem("custaddr"),
          payment_method:"Online",
          total_price:"",
          cust_id:"",
        };
       this.viewdetails=this.viewdetails.bind(this);
    //   this.updateproduct=this.updateproduct.bind(this);
      }
      viewdetails(product_id){
       // alert(sessionStorage.getItem("custaddr"));
        sessionStorage.setItem("productid",product_id);
        window.location="/productdetails";
      }
      addtocart(productid,productprice){
       //alert(productid+" "+productprice);
      //alert(sessionStorage.getItem("custid"));
      sessionStorage.setItem("productid",productid);
      sessionStorage.setItem("prodprice",productprice);
      if (sessionStorage.getItem("orderid") == null) {
       //sessionStorage.setItem("quantityc",0);
       this.state.productPrice=productprice;
        let url="http://localhost:59324/AddNewOrder";
        axios.post(url,{
          order_details:this.state.order_details,
          status:this.state.status,
          order_date:"2022-12-12",
          shipment_date:"2022-12-12",
          delivery_Address:sessionStorage.getItem("custaddr"),
          payment_method:this.state.payment_method,
          total_price:productprice,
          cust_id:sessionStorage.getItem("custid")
        }).then((response)=>{
        //  alert("First product successfully added in order"+response.data);
        alert("first product price",productprice);
        sessionStorage.setItem("finaltotprice",productprice);
        sessionStorage.setItem("finalquantity",0);
          sessionStorage.setItem("orderid",response.data);
          this.updateproduct(productid);
          this.carttable(productid)
        }).catch((error) => {
          alert("error in add to cart from view prod" + error);
        });}else{
         // alert(sessionStorage.getItem("orderid"));
         //alert("This is "+sessionStorage.getItem("quantityc"))
         sessionStorage.setItem("prodprice",productprice);
         let p=parseInt(sessionStorage.getItem("finaltotprice"))+parseInt(sessionStorage.getItem("prodprice"));
         sessionStorage.setItem("finaltotprice",p)
         //console.log("finalxtotpric",sessionStorage.getItem("finaltotprice"));
         this.updateproduct(productid);
         this.carttable(productid)
        }
      }
      carttable(productid){
        let url5 = "http://localhost:59324/GetProductById/"+productid;
        let q=parseInt(sessionStorage.getItem("finalquantity"))+1;
        sessionStorage.setItem("finalquantity",q);
        console.log("quantity:",sessionStorage.getItem("finalquantity"));
    axios
      .get(url5)
      .then((response) => {
       // console.log(response.data)
        this.state.products1 = response.data;
        //alert(setprodid);
        //alert(response.data.product_id);
     //   console.log(this.state.products);
        this.setState({
          product_id:this.state.products1[0].product_id,
          productName: this.state.products1[0].productName,
          size:this.state.products1[0].size,
          color:this.state.products1[0].color,
          product_details: this.state.products1[0].product_details,
          quantity:this.state.products1[0].quantity,
          imageUrl:this.state.products1[0].imageUrl,
          productPrice: this.state.products1[0].productPrice,
        }); 
       // console.log(this.state.products[0].product_id)
       // sessionStorage.setItem("prodid", this.state.product_id);
        //sessionStorage.setItem("productPrice", this.state.productPrice);
     //   alert("product detail is here");
        let url6="http://localhost:59324/AddCart";
        axios.post(url6,{
          product_id:this.state.products1[0].product_id,
          productName: this.state.products1[0].productName,
          size:this.state.products1[0].size,
          color:this.state.products1[0].color,
          product_details: this.state.products1[0].product_details,
          quantity:this.state.products1[0].quantity,
          imageUrl:this.state.products1[0].imageUrl,
          productPrice: this.state.products1[0].productPrice,
        }).then((response)=>{
          alert("Product added to cart");
          sessionStorage.setItem("productprice",this.state.productPrice);
        }).catch((error) => {
          alert("error in add to cart from view prod" + error);
        });
      })
      .catch((error) => {
        console.warn(error);
        console.log(error)
      });
      }
      updateproduct(productid){
        alert("this is price of next products"+sessionStorage.getItem("prodprice"));   

        let url="http://localhost:59324/AddnewOrderItem";
        axios.post(url,{
          orderStatus:"Pending",
          quantity:1,
          price:sessionStorage.getItem("prodprice"),
          order_id:sessionStorage.getItem("orderid"),
          cust_id:sessionStorage.getItem("custid"),
          product_id:sessionStorage.getItem("productid")
        }).then((response)=>{
       //alert("data updated in orderitems successfully"+response.data);
         // sessionStorage.setItem("quantityc",sessionStorage.getItem("quantityc"));
        //  console.log(parseInt(sessionStorage.getItem("settotalprice")) +
        //  parseInt(productPrice));
        }).catch((error) => {
          alert("error in orderitem" + error);
        });
      }
      
      componentDidMount() {
        let url = "http://localhost:59324/GetAllProducts";
        axios
          .get(url)
          .then((res) => res)
          .then((response) => {
            //
            this.setState({ products: response.data });
          })
          .catch((error) => {
            console.warn(error);
          });
      }
    render() {
       
        const { products } = this.state;
        return (
            <>
            <CustomerNavbar></CustomerNavbar>
            <section>
            {products.map((a) => (
  <div class="container py-5">
    <div class="row justify-content-center mb-3">
      <div class="col-md-12 col-xl-10">
        <div class="card shadow-0 border rounded-3">
          <div class="card-body">
            <div class="row">
              <div class="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                <div class="bg-image hover-zoom ripple rounded ripple-surface">
                  <img src={a.imageUrl}
    
                    class="w-100" />
                  <a href="#!">
                    <div class="hover-overlay">
                      <div class="mask"></div>
                    </div>
                  </a>
                </div>
              </div>
              <div class="col-md-6 col-lg-6 col-xl-6">
                <h5>{a.productName}</h5>
                <div class="d-flex flex-row">
                  <div class="text-danger mb-1 me-2">
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                  </div>
                  <span>{a.productPrice}</span>
                </div>
                <div class="mt-1 mb-0 text-muted small">
                  <span>{a.size}</span>
                  <span class="text-primary"> • </span>
                  <span>{a.color}</span>
                  <span class="text-primary"> • </span>
                  <span>Availability: {a.quantity}<br /></span>
                </div>
                <p class="text-truncate mb-4 mb-md-0">
                  {a.product_details}
                </p>
              </div>
              <div class="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                <div class="d-flex flex-row align-items-center mb-1">
                  <h4 class="mb-1 me-1">₹{a.productPrice}</h4>
                </div>
                <h6 class="text-success">Free shipping</h6>
                <div class="d-flex flex-column mt-4">
                  <button class="btn btn-primary btn-sm btns" type="button"onClick={()=>this.viewdetails(a.product_id)}>Details</button>
                  <button class="btn btn-outline-primary btn-sm mt-2 btns1" type="button" onClick={()=>this.addtocart(a.product_id, a.productPrice)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   </div>))}
</section>
            </>
        );
    }
}

export default ViewAllProducts;
