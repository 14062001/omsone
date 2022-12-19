import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";
import CustomerNavbar from '../CustomerModel/CustomerNavbar';

const EnterEmail = () => {
    const msg =
    "Your order has been " +
    sessionStorage.getItem("status") +
    "..Happy shopping!!";
  const form = useRef();
  const name = "Customer";
  const subject = "ShopNow";

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_2mevbyx",
        "template_68wzsc9",
        form.current,
        "sWzZGLwxdjMbFms-C"
      )
      .then(
        (result) => {
          console.log(result.text);
          //  alert("Check your email");
          window.location = "/homepage";
          sessionStorage.clear();
        },
        (error) => {
          console.log(error.text);
        }
      );
    };
    return (
        <>
        
        <div>
          <CustomerNavbar></CustomerNavbar>
        </div>
        <div className="email">
        <img src={require('./done.jpg')} style={{height:"35%",width:"20%",padding:"2%"}}></img>
          <div className="loginf">
            
            <form ref={form} onSubmit={sendEmail} class="form-inline">
              <div class="form-group mb-2">
                <input type="hidden" defaultValue={subject} name="subject" />
                <input type="hidden" defaultValue={name} name="name" />
                <input type="hidden" defaultValue={msg} name="message" />
              </div>
              <input type="submit" value="Check your mail" class="btnc" />
            </form>
          </div>
        </div>
      </>
    );
}

export default EnterEmail;
