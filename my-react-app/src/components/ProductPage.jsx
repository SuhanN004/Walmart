import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import "../styles/Productpage.css";
import WalmartHeader from "./WalmartHeader";
import { CartContext } from "../context/CartContext";

import shipIcon from '../assets/dropship.png';
import pickIcon from '../assets/droppick.png';
import deliveryIcon from '../assets/dropdelivery.png';

function ProductPage() {

  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [deliveryType, setDeliveryType] = useState("shipping"); 

  const api= import.meta.env.VITE_API;

  const { addToCart, cartItems, removeFromCart } = useContext(CartContext);

  const userId = localStorage.getItem("userId");

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`${api}/api/product/${id}`);
      setProduct(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const getItemQty = () => {
    if (!product) return 0;
    const item = cartItems.find(i => i._id === product._id);
    return item ? item.qty : 0;
  };

  const handleBuy = async () => {
    try {
      await axios.post(`${api}/api/order/create`, {
        userId: userId,
        items: [{ ...product, qty: 1 }],
        totalAmount: product.price
      });

      alert("Product purchased successfully");
    } catch (err) {
      console.log(err);
      alert("Error purchasing product");
    }
  };

  if (!product) return <h2>Loading...</h2>;

  return (
    <>
      <WalmartHeader />

      <div className="product-page">

        
        <div className="product-left">
          <div className="main-image-box">
            <img
              src={`${api}/uploads/${product.image}`}
              alt="product"
            />
          </div>
        </div>

        
        <div className="product-center">

          <p className="brand">Visit Store</p>

          <h2 className="product-title">{product.name}</h2>

          
          <div className="desc-box">
            <h3>Product Description</h3>
            <p>{product.description}</p>
          </div>

          
          {product.features && product.features.length > 0 && (
            <div className="features-box">
              <h3>Key Features</h3>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

        </div>

        
        <div className="product-right">

          <div className="price-box">
            <h2 className="price">₹{product.price}</h2>
          </div>

          <div className="cart-section">

            
            {getItemQty() === 0 ? (
              <button
                className="add-btn"
                onClick={() => addToCart(product)}
              >
                Add to cart
              </button>
            ) : (
              <div className="qty-box">
                <button onClick={() => removeFromCart(product._id)}>−</button>
                <span>{getItemQty()}</span>
                <button onClick={() => addToCart(product)}>+</button>
              </div>
            )}

            
            <button
              className="buy-btn"
              onClick={handleBuy}
            >
              Buy Now
            </button>

            
            <h4 className="delivery-title">How you'll get this item:</h4>

            <div className="delivery-options">

             
              <div
                className={`delivery-card ${deliveryType === "shipping" ? "active" : ""}`}
                onClick={() => setDeliveryType("shipping")}
              >
                <div className="icon-circle">
                  <img src={shipIcon} alt="shipping" />
                </div>

                <h5>Shipping</h5>
                <p className="arrival">Arrives Apr 21</p>
                <p className="time">Order within 8 hr 35 min</p>
                <p className="free">Free</p>
              </div>

              
              <div
                className={`delivery-card ${deliveryType === "pickup" ? "active" : ""}`}
                onClick={() => setDeliveryType("pickup")}
              >
                <div className="icon-circle">
                  <img src={pickIcon} alt="pickup" />
                </div>

                <h5>Pickup</h5>
                <p className="not">Not available</p>
              </div>

              
              <div
                className={`delivery-card ${deliveryType === "delivery" ? "active" : ""}`}
                onClick={() => setDeliveryType("delivery")}
              >
                <div className="icon-circle">
                  <img src={deliveryIcon} alt="delivery" />
                </div>

                <h5>Delivery</h5>
                <p className="not">Not available</p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default ProductPage;