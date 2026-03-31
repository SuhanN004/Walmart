import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App.jsx'
import './index.css'

import { CartProvider } from './context/CartContext'


import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";


require("dotenv").config();

const stripePromise = loadStripe(process.env.MY_PUBLISH_KEY);

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