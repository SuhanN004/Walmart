import { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip
} from "recharts";

import "../styles/UserDetails.css";

function UserDetails() {

  const BASE_URL = "https://walmart-3-ysdt.onrender.com";
  const userId = localStorage.getItem("userId");

  const [user, setUser] = useState({});
  const [stats, setStats] = useState({
    orders: 0,
    products: 0,
    spent: 0,
    delivered: 0,
    pending: 0,
    cancelled: 0
  });

  const [monthlyData, setMonthlyData] = useState([]);

  const fetchData = async () => {
    try {

      const [userRes, ordersRes] = await Promise.all([
        axios.get(`${BASE_URL}/api/auth/user/${userId}`),
        axios.get(`${BASE_URL}/api/order/user/${userId}`)
      ]);

      const orders = ordersRes.data;

      let products = 0;
      let spent = 0;
      let delivered = 0;
      let pending = 0;
      let cancelled = 0;

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
        if (order.status === "Cancelled") cancelled++;
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
        cancelled
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
    { name: "Cancelled", value: stats.cancelled }
  ];

  const COLORS = ["#4caf50", "#024c9a", "#f44336"];

  return (
    <div className="user-container">

      <h1>Welcome, {user.firstName}</h1>

      
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
        <div className="card"><p>Cancelled</p><h2>{stats.cancelled}</h2></div>

      </div>

      
      <div className="charts">

        <div className="chart-box">
          <h3>Order Status</h3>
          <PieChart width={300} height={300}>
            <Pie data={pieData} dataKey="value" outerRadius={100} label>
              {pieData.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
              
            </Pie>
              <legend/>
          </PieChart>
        </div>

        <div className="chart-box">
          <h3>Monthly Spending</h3>
          <BarChart width={400} height={300} data={monthlyData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#0275cd" />
          </BarChart>
        </div>

      </div>

    </div>
  );
}

export default UserDetails;