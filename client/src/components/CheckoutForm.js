import React, { useState, useEffect } from "react";

import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import "./../css/Components/CheckoutForm.scss"

export default function CheckoutForm(props) {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    window
      .fetch("/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({price:props.price,cust_id:props.cust_id,email:props.tutor_id.email})
      })
      .then(res => {
        return res.json();
      })
      .then(data => {
        setClientSecret(data.client_secret);
        console.log(data);
      });
  }, []);

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async ev => {
    
    const loading = toast.loading("Please wait...");
    ev.preventDefault();
    setProcessing(true);
console.log(props)
console.log(clientSecret);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
      myHeaders.append("Content-Type", "application/json");
    
      const requestOptions = {
        method: 'POST',
        contentType:'application/json',
        headers:myHeaders,
        body: JSON.stringify({course_id:localStorage.course_id,student_id:localStorage.student_id,tutor_id:props.tutor_id._id,is_active:false})
      };
          fetch('/api/student/enroll',requestOptions)
          .then(response => response.json())
        .then(data => 
            {
                if(data.succes)
                {
                  toast.update(loading, { render: data.message, type: "success", isLoading: false,theme: "colored" });
               
                    window.location.href="/";
                }
                else 
                toast.update(loading, { render: data.message, type: "error", isLoading: false,theme: "colored" });
             
      
            })
      
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
      <button
        disabled={processing || disabled || succeeded}
        id="submit"
      >
        <span id="button-text">
          {processing ? (
            <div className="spinner" id="spinner"></div>
          ) : (
            "Pay now"
          )}
        </span>
      </button>
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      {/* Show a success message upon completion */}
      <p className={succeeded ? "result-message" : "result-message hidden"}>
        Payment succeeded, You are now successfully enrolled in that course
      </p>
    </form>
  );
}
