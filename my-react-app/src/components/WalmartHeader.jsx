import { useState, useEffect, useContext } from 'react'
import '../styles/WalmartHeader.css'
import logo from '../assets/walmart-logo.svg'

import shipIcon from '../assets/dropship.png'
import pickIcon from '../assets/droppick.png'
import deliveryIcon from '../assets/dropdelivery.png'
import pickbox from '../assets/pickupboxmain.jpg'
import cartIcon from '../assets/add-to-cart.png'

import magnifier from '../assets/magnifier copy.png'

import {useNavigate} from "react-router-dom"
import axios from "axios"


import { CartContext } from "../context/CartContext";

function WalmartHeader() {

  const navigate= useNavigate();
  const BASE_URL = "https://walmart-3-ysdt.onrender.com";
  const [open, setOpen] = useState(false)
  const [searchActive, setSearchActive] = useState(false)
  const [deptOpen, setDeptOpen] = useState(false)
  const [serviceOpen, setServiceOpen] = useState(false)

  const [services, setServices] = useState([])


  const { cartItems } = useContext(CartContext);


  const totalItems = cartItems.reduce((total, item) => total + item.qty, 0);


  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );


  const fetchServices = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/service/view`)
      setServices(res.data)
    } catch (error) {
      console.log("Error fetching services:", error)
    }
  }

  useEffect(() => {
    fetchServices()
  }, [])

  return (
    <div className="w-header-wrapper">


      <div className="w-header">

        <div className="w-left">
          


          <div 
            className="w-item cart"
            onClick={() => navigate("/home")}
          >
            <img src={logo} alt="walmart" className="w-logo" />

          </div>





          <div className="pickup-box" onClick={() => setOpen(!open)}>

            <div className="pickup-icon">
              <img src={pickbox} alt="location" />
            </div>

            <div className="pickup-text">
              <div className="pickup-top">Pickup or delivery?</div>
              <div className="pickup-sub">
                Sacramento, 95829 • Sacramento Superc...
              </div>
            </div>

            <div className="arrow">
              {open ? '▲' : '▼'}
            </div>

          </div>
        </div>


        <div className={`w-search ${searchActive ? 'active' : ''}`}>
          <input
            type="text"
            placeholder="Search everything at Walmart online and in store"
            onFocus={() => setSearchActive(true)}
          />

          <button className="search-btn">
            <img src={magnifier} alt="Search" />
          </button>
        </div>


        <div className="w-right">

          <div
            className="w-item my-orders"
            onClick={() => navigate("/orders")}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/3081/3081559.png"
              alt="orders"
              className="orders-icon"
            />

            <span>
              My<br />Orders
            </span>
          </div>


          <div className="w-item">
            <span>Sign In<br />Account</span>
          </div>


          <div 
            className="w-item cart"
            onClick={() => navigate("/cart")}
          >

            <img src={cartIcon} alt="cart" className="cart-icon" />

            
            {totalItems > 0 && (
              <span className="cart-count">{totalItems}</span>
            )}

            
            <span>₹{totalPrice}</span>

          </div>

        </div>

      </div>


      {open && <div className="header-overlay" onClick={() => setOpen(false)} />}


      <div className={`pickup-dropdown ${open ? 'show' : ''}`}>

        <div className="pickup-options">

          <div className="option">
            <div className="option-circle">
              <img src={shipIcon} alt="Shipping" />
            </div>
            <span>Shipping</span>
          </div>

          <div className="option">
            <div className="option-circle">
              <img src={pickIcon} alt="Pickup" />
            </div>
            <span>Pickup</span>
          </div>

          <div className="option">
            <div className="option-circle">
              <img src={deliveryIcon} alt="Delivery" />
            </div>
            <span>Delivery</span>
          </div>

        </div>

        <div className="pickup-card">
          <p className="card-title">Add an address for shipping and delivery</p>
          <p className="card-sub">Sacramento, CA 95829</p>
          <button className="blue-btn">Add address</button>
        </div>

        <div className="pickup-card">
          <p className="card-title">Sacramento Supercenter</p>
          <p className="card-sub">
            8915 GERBER ROAD, Sacramento, CA 95829
          </p>
        </div>

      </div>


      <div className="w-nav">

        <div className="w-nav-left">

          <button className="nav-btn bold" onClick={() => setDeptOpen(!deptOpen)}>
            Departments ▾
          </button>

          {deptOpen && (
            <div className="dept-overlay" onClick={() => setDeptOpen(false)} />
          )}

          <button className="nav-btn bold" onClick={() => setServiceOpen(!serviceOpen)}>
            Services ▾
          </button>

          {serviceOpen && (
            <div className="service-dropdown">
              {services.map((service) => (
                <div key={service._id} className="service-item">
                  {service.title}
                </div>
              ))}
            </div>
          )}



          <button className="nav-btn">Get it Fast</button>
          <button className="nav-btn">Rollbacks & More</button>
          <button className="nav-btn">Valentine's Day</button>
          <button className="nav-btn">Virtual Care</button>


          <button className="nav-btn">New Arrivals</button>
          <button className="nav-btn">bettergoods</button>
          <button className="nav-btn">Walmart+</button>

        </div>

        <div className="w-nav-right">
          <button className="nav-btn bold">More ▾</button>
        </div>

      </div>

    </div>
  )
}

export default WalmartHeader;