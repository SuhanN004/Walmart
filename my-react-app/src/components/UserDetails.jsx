import { useEffect, useState } from "react";
import WalmartHeader from "./WalmartHeader";
import axios from "axios";

import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  ResponsiveContainer
} from "recharts";

import "../styles/UserDetails.css";

function UserDetails() {

  const api = import.meta.env.VITE_API;
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

  const [dailyData, setDailyData] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [yearlyData, setYearlyData] = useState([]);

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

      const dayMap = { Sun:0, Mon:0, Tue:0, Wed:0, Thu:0, Fri:0, Sat:0 };
      const weekMap = { Week1:0, Week2:0, Week3:0, Week4:0, Week5:0 };
      const monthMap = {};
      const yearMap = {};

      orders.forEach(order => {

        const date = new Date(order.createdAt);

        spent += order.totalAmount;

       
        const day = date.toLocaleString("en-US", { weekday: "short" });
        dayMap[day] += order.totalAmount;

       
        const week = Math.ceil(date.getDate() / 7);
        weekMap[`Week${week}`] += order.totalAmount;

       
        const month = date.toLocaleString("default", { month: "short" });
        monthMap[month] = (monthMap[month] || 0) + order.totalAmount;

       
        const year = date.getFullYear();
        yearMap[year] = (yearMap[year] || 0) + order.totalAmount;

        order.items.forEach(item => {
          products += item.qty;
        });

        if (order.status === "Delivered") delivered++;
        if (order.status === "Pending") pending++;
        if (order.status === "Shipping") shipped++;
      });

      setDailyData(Object.keys(dayMap).map(d => ({ day:d, amount:dayMap[d] })));
      setWeeklyData(Object.keys(weekMap).map(w => ({ week:w, amount:weekMap[w] })));
      setMonthlyData(Object.keys(monthMap).map(m => ({ month:m, amount:monthMap[m] })));
      setYearlyData(Object.keys(yearMap).map(y => ({ year:y, amount:yearMap[y] })));

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

  const COLORS = ["#4caf50", "#2196f3", "#f44336"];

  return (
    <>
      <WalmartHeader />

      <div className="user-container">

        <h1 className="user-title">
          Welcome, {user.firstName} {user.lastName}
        </h1>

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
              <PieChart>
                <Pie data={pieData} dataKey="value" outerRadius={100} label>
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-box">
            <h3>Daily Spending</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailyData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#ff7a00" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-box">
            <h3>Weekly Spending</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#9c27b0" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-box">
            <h3>Monthly Spending</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#1976d2" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-box full-width">
            <h3>Yearly Spending</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={yearlyData}>
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#4caf50" />
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>

      </div>
    </>
  );
}

export default UserDetails;