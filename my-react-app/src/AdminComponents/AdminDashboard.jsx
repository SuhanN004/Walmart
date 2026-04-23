import { useEffect, useState } from "react";
import axios from "axios";
import "../AdminStyles/AdminDashboard.css";

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell, Legend,
  ResponsiveContainer, Line,
  LineChart
} from "recharts";

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

      const [productsRes, servicesRes, ordersRes, usersRes] = await Promise.all([
        axios.get(`${api}/api/product/view`),
        axios.get(`${api}/api/service/view`),
        axios.get(`${api}/api/order/all`),
        axios.get(`${api}/api/auth/all`)
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
        users: usersRes.data.length,
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



  const salesData = [
    { name: "Today", value: data.today },
    { name: "Month", value: data.month },
    { name: "Year", value: data.year }
  ];

  const orderStatusData = [
    { name: "Pending", value: data.pending },
    { name: "Completed", value: data.orders - data.pending }
  ];

  const businessData = [
    { name: "Orders", value: data.orders },
    { name: "Payments", value: data.payments },
    { name: "Sales", value: data.year }
  ];

  const usersData = [{ name: "Active", value: data.users }];

  const COLORS = ["#ff9800", "#4caf50"];

  return (
    <div className="dashboard-container">

      <h1 className="dashboard-title">Admin Dashboard</h1>


      <div className="dashboard-grid">

        <div className="card"><p className="card-title">Products</p><h2>{data.products}</h2></div>
        <div className="card"><p className="card-title">Services</p><h2>{data.services}</h2></div>
        <div className="card"><p className="card-title">Users</p><h2>{data.users}</h2></div>

        <div className="card"><p className="card-title">Total Orders</p><h2>{data.orders}</h2></div>
        <div className="card"><p className="card-title">Payments</p><h2>{data.payments}</h2></div>
        <div className="card"><p className="card-title">Pending Orders</p><h2>{data.pending}</h2></div>

        <div className="card"><p className="card-title">Sales Today</p><h2>{data.today}</h2></div>
        <div className="card"><p className="card-title">Sales Month</p><h2>{data.month}</h2></div>
        <div className="card"><p className="card-title">Sales Year</p><h2>{data.year}</h2></div>

      </div>


      <div className="charts-container">


        <div className="chart-box">
          <h3>Sales Overview</h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#1976d2" />
            </BarChart>
          </ResponsiveContainer>
        </div>


        


        <div className="chart-box">
          <h3>Order Status</h3>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={orderStatusData} dataKey="value" outerRadius={100} label>
                {orderStatusData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h3>Business Overview</h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={businessData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#673ab7" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;