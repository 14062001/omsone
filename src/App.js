import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import CustomerRegister from "./CustomerModel/CustomerRegister";
import Login from './CustomerModel/Login';
import MyOrders from "./OrderModel/MyOrders";
import PaymentMethod from "./OrderModel/PaymentMethod";
import CardPayment from "./OrderModel/CardPayment";
import ViewOrderDetails from "./OrderModel/ViewOrderDetails";
import ViewAllProducts from "./ProductModel/ViewAllProducts";
import ViewCart from "./ProductModel/ViewCart";
import ViewProductDetails from "./ProductModel/ViewProductDetails";
import EnterEmail from "./OrderModel/EnterEmail";
import EnterUpi from "./OrderModel/EnterUpi";



function App() {

  return (
    <>
    <Router>
        <Routes>
          <Route path="/" element={<Login></Login>} />
          <Route path="/registration" element={<CustomerRegister></CustomerRegister>} />
          <Route path="/homepage" element={<ViewAllProducts></ViewAllProducts>} />
          <Route path="/productdetails" element={<ViewProductDetails></ViewProductDetails>} />
          <Route path="/viewcart" element={<ViewCart></ViewCart>} />
          <Route path="/myorders" element={<MyOrders></MyOrders>} />
          <Route path="/vieworderdetails" element={<ViewOrderDetails></ViewOrderDetails>} />
          <Route path="/paymentoptions" element={<PaymentMethod></PaymentMethod>} />
          <Route path="/cardpayment" element={<CardPayment></CardPayment>} />
          <Route path="/enteremail" element={<EnterEmail></EnterEmail>} />
          <Route path="/enterupi" element={<EnterUpi></EnterUpi>} />
          </Routes>
    </Router>
    </>
  );
}

export default App;
