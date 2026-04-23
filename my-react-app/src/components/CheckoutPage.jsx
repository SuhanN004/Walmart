import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

import toast from "react-hot-toast";

import "../styles/CheckoutPage.css";
import cardImage from "../assets/cards.jpg";

function CheckoutPage() {

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const location = useLocation();

  const { cartItems, clearCart } = useContext(CartContext);

  const api = import.meta.env.VITE_API;

  
  const total =
    location.state?.total ||
    cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    if (!api) {
      console.error(" VITE_API not defined");
      toast.error("Server configuration error");
      return;
    }

    const userId = localStorage.getItem("userId");

    if (!userId) {
      toast.error("User not logged in ");
      return;
    }

    if (!total || total <= 0) {
      setError("Invalid amount");
      return;
    }

    setLoading(true);
    setError("");

    try {

      
      const res = await axios.post(
        `${api}/api/payment/create-payment`,
        { amount: total }
      );

      const clientSecret = res.data.clientSecret;

      const cardElement = elements.getElement(CardNumberElement);

      if (!cardElement) {
        setError("Card element not loaded");
        setLoading(false);
        return;
      }

      
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (result.error) {
        setError(result.error.message);
        toast.error(result.error.message);
        setLoading(false);
        return;
      }

      
      if (result.paymentIntent.status === "succeeded") {

        // prevent multiple clicks
        setLoading(true);

        await axios.post(`${api}/api/order/create`, {
          userId: userId,
          items: cartItems,
          totalAmount: total
        });

        clearCart();

        
        toast.success("Order placed! Invoice sent to your email 📩");

        
        setTimeout(() => {
          navigate("/orders");
        }, 1500);
      }

    } catch (err) {
      console.log(" PAYMENT ERROR:", err.response?.data || err.message);
      setError("Payment failed. Try again.");
      toast.error("Payment failed. Try again ");
    }

    setLoading(false);
  };

  return (
    <div className="checkout-container">

      {/* LEFT SIDE */}
      <div className="checkout-left">

        <h2>Payment Method</h2>
        <img src={cardImage} alt="card" className="card-logos" />

        <form onSubmit={handlePayment}>

          <label>Card Number</label>
          <div className="stripe-input">
            <CardNumberElement />
          </div>

          <div className="row">
            <div>
              <label>Expiry</label>
              <div className="stripe-input">
                <CardExpiryElement />
              </div>
            </div>

            <div>
              <label>CVC</label>
              <div className="stripe-input">
                <CardCvcElement />
              </div>
            </div>
          </div>

          {error && <p className="error">{error}</p>}

          <button className="pay-btn" disabled={loading || !stripe}>
            {loading ? "Processing..." : `Pay ₹${total}`}
          </button>

        </form>
      </div>

      {/* RIGHT SIDE */}
      <div className="checkout-right">

        <h3>Order Summary</h3>

        <div className="summary-box">
          <p>Items: {cartItems.length}</p>
          <p>Delivery: Free</p>
          <h2>Total: ₹{total}</h2>

          <button className="summary-btn" disabled>
            Payment
          </button>
        </div>

      </div>

    </div>
  );
}

export default CheckoutPage;