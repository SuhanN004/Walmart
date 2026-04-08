import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "../styles/CartPage.css";
import WalmartHeader from "./WalmartHeader";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://walmart-3-ysdt.onrender.com";

function CartPage() {

  const { cartItems, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  
  const handleCheckout = () => {
    navigate("/checkout", {
      state: { total }
    });
  };

  return (
    <>
      <WalmartHeader />

      <div className="cart-page">

        <h2 className="cart-heading">
          Cart ({cartItems.length} items)
        </h2>

        <div className="cart-container">

          
          <div className="cart-left">

            {cartItems.length === 0 ? (
              <h2 className="empty-cart">
                Your cart is empty 
              </h2>
            ) : (
              cartItems.map((item) => (

                <div className="cart-item" key={item._id}>

                  <img
                    src={`${BASE_URL}/uploads/${item.image}`}
                    alt="product"
                  />

                  <div className="cart-details">

                    <h3 className="cart-title">{item.name}</h3>

                    <p className="cart-price">₹{item.price}</p>

                    <p className="cart-qty">Qty: {item.qty}</p>

                    <div className="cart-actions">
                      <span onClick={() => removeFromCart(item._id)}>
                        Remove
                      </span>
                    </div>

                  </div>

                </div>

              ))
            )}

          </div>

          
          <div className="cart-right">

            <button
              className="checkout-btn"
              onClick={handleCheckout}
              disabled={cartItems.length === 0}
            >
              Buy Now
            </button>

            <div className="summary-box">

              <div className="summary-row">
                <span>Subtotal ({cartItems.length} items)</span>
                <span>₹{total}</span>
              </div>

              <div className="summary-row">
                <span>Shipping</span>
                <span className="free">Free</span>
              </div>

              <hr />

              <div className="summary-total">
                <span>Total Cost</span>
                <span>₹{total}</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default CartPage;