import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App.jsx'
import './index.css'

import { CartProvider } from './context/CartContext'


import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";


const stripePromise = loadStripe("pk_test_51TERqKPlQRfRg8zOjp5xUXcYoq1QxTZ9TGvYWSJEMwKNeFtJRE146c6pzrDkMjyg9cP8bitGLC9YBVuxZ5jwKYRX00Oj0VAEHM");

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>

      
      <Elements stripe={stripePromise}>
        <CartProvider>
          <App />
        </CartProvider>
      </Elements>

    </BrowserRouter>
  </React.StrictMode>
)