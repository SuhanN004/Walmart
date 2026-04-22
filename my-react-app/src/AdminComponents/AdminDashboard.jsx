import { useEffect, useState } from "react";
import axios from "axios";
import "../AdminStyles/AdminDashboard.css";

function AdminDashboard() {

  const api = import.meta.env.VITE_API;

  const [data, setData] = useState({
    products: 0,
    services: 0,
    users: 0,
    orders: 0,
    payments: 0,
    pending: 0,
    today: 0,
    month: 0,
    year: 0
  });

  const fetchData = async () => {
    try {

      const [productsRes, servicesRes, ordersRes] = await Promise.all([
        axios.get(`${api}/api/product/view`),
        axios.get(`${api}/api/service/view`),
        axios.get(`${api}/api/order/all`)
      ]);

      const orders = ordersRes.data;

      let pending = 0;
      let today = 0;
      let month = 0;
      let year = 0;

      const now = new Date();

      orders.forEach(order => {

        const d = new Date(order.createdAt);

        if (order.status === "Pending") pending++;

        if (d.toDateString() === now.toDateString()) today++;

        if (d.getMonth() === now.getMonth()) month++;

        if (d.getFullYear() === now.getFullYear()) year++;
      });

      setData({
        products: productsRes.data.length,
        services: servicesRes.data.length,
        users: 1, // (future: create API)
        orders: orders.length,
        payments: orders.length,
        pending,
        today,
        month,
        year
      });

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="dashboard-container">

      <h1>Admin Dashboard</h1>

      <div className="dashboard-grid">

        <div className="card"><p>Products</p><h2>{data.products}</h2></div>
        <div className="card"><p>Services</p><h2>{data.services}</h2></div>
        <div className="card"><p>Users</p><h2>{data.users}</h2></div>

        <div className="card"><p>Total Orders</p><h2>{data.orders}</h2></div>
        <div className="card"><p>Payments</p><h2>{data.payments}</h2></div>
        <div className="card"><p>Pending Orders</p><h2>{data.pending}</h2></div>

        <div className="card"><p>Sales Today</p><h2>{data.today}</h2></div>
        <div className="card"><p>Sales Month</p><h2>{data.month}</h2></div>
        <div className="card"><p>Sales Year</p><h2>{data.year}</h2></div>

      </div>

    </div>
  );
}

export default AdminDashboard;