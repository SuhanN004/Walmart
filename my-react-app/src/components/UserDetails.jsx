import { useEffect, useState } from "react";

import WalmartHeader from "./WalmartHeader";
import axios from "axios";
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip,Legend, ResponsiveContainer
} from "recharts";

import "../styles/UserDetails.css";

function UserDetails() {

   

  const api= import.meta.env.VITE_API;
  const userId = localStorage.getItem("userId");

  const [user, setUser] = useState({});
  const [stats, setStats] = useState({
    orders: 0,
    products: 0,
    spent: 0,
    delivered: 0,
    pending: 0,
    shipped: 0
  });

  const [monthlyData, setMonthlyData] = useState([]);

  const fetchData = async () => {
    try {

      const [userRes, ordersRes] = await Promise.all([
        axios.get(`${api}/api/auth/user/${userId}`),
        axios.get(`${api}/api/order/user/${userId}`)
      ]);

      const orders = ordersRes.data;

      let products = 0;
      let spent = 0;
      let delivered = 0;
      let pending = 0;
      let shipped = 0;

      const monthlyMap = {};

      orders.forEach(order => {

        spent += order.totalAmount;

        const month = new Date(order.createdAt)
          .toLocaleString("default", { month: "short" });

        monthlyMap[month] = (monthlyMap[month] || 0) + order.totalAmount;

        order.items.forEach(item => {
          products += item.qty;
        });

        if (order.status === "Delivered") delivered++;
        if (order.status === "Pending") pending++;
        if (order.status === "Shipping") shipped++;
      });

      const monthlyArray = Object.keys(monthlyMap).map(m => ({
        month: m,
        amount: monthlyMap[m]
      }));

      setMonthlyData(monthlyArray);
      setUser(userRes.data);

      setStats({
        orders: orders.length,
        products,
        spent,
        delivered,
        pending,
        shipped
      });

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const pieData = [
    { name: "Delivered", value: stats.delivered },
    { name: "Pending", value: stats.pending },
    { name: "Shipped", value: stats.shipped }
  ];

  const COLORS = ["#4caf50", "#0a77ec", "#f44336"];

  return (
    <>
    <WalmartHeader />
    <div className="user-container">

      <h1 className="user-title">Welcome, {user.firstName} {user.lastName}</h1>

      
      <div className="user-info">
        <p><b>Email:</b> {user.email}</p>
        <p><b>Phone:</b> {user.phone}</p>
      </div>

      
      <div className="stats-grid">

        <div className="card"><p>Total Orders</p><h2>{stats.orders}</h2></div>
        <div className="card"><p>Total Products</p><h2>{stats.products}</h2></div>
        <div className="card"><p>Total Spent</p><h2>₹ {stats.spent}</h2></div>

        <div className="card"><p>Delivered</p><h2>{stats.delivered}</h2></div>
        <div className="card"><p>Pending</p><h2>{stats.pending}</h2></div>
        <div className="card"><p>Shipped</p><h2>{stats.shipped}</h2></div>

      </div>

      
      <div className="charts">

        <div className="chart-box">
          <h3>Order Status</h3>
          <ResponsiveContainer width="100%" height={300}>
          <PieChart width={300} height={300}>
            <Pie data={pieData} dataKey="value" outerRadius={100} label>
              {pieData.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
              
            </Pie>
             <Legend />
          </PieChart>
        </ResponsiveContainer>
        </div>

        





        <div className="chart-box">
          <h3>Monthly Spending</h3>
          <BarChart width={400} height={300} data={monthlyData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#e9700d" />
          </BarChart>
        </div>

      </div>

    </div>
    </>
  );
}

export default UserDetails;