import { useEffect, useState } from "react";
import axios from "axios";
import WalmartHeader from "./WalmartHeader";
import "../styles/MyOrders.css";

function MyOrders() {

  const [orders, setOrders] = useState([]);

  const userId = localStorage.getItem("userId");

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/order/user/${userId}`
      );
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      <WalmartHeader />

      <div className="orders-page">

        <h2 className="orders-title">My Orders</h2>

        {orders.length === 0 ? (
          <div className="empty-orders">
            <h3>No orders yet </h3>
            <p>Start shopping and your orders will appear here</p>
          </div>
        ) : (
          orders.map((order) => (
            <div className="order-card" key={order._id}>

              
              <div className="order-header">
                <span>Order ID: {order._id.slice(-6)}</span>
                <span className="order-date">
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
              </div>

              
              <div className="order-items">
                {order.items.map((item, i) => (
                  <div className="order-item" key={i}>

                    <div className="item-left">
                      <div className="item-name">{item.name}</div>
                      <div className="item-qty">Qty: {item.qty}</div>
                    </div>

                    <div className="item-right">
                      ₹{item.price * item.qty}
                    </div>

                  </div>
                ))}
              </div>

              
              <div className="order-footer">
                <span>Total</span>
                <span className="total-price">₹{order.totalAmount}</span>
              </div>

            </div>
          ))
        )}

      </div>
    </>
  );
}

export default MyOrders;
