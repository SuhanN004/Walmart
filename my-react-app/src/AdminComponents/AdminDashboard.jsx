import { useEffect, useState } from "react";
import axios from "axios";
import "../AdminStyles/AdminDashboard.css";

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell, Legend,
  ResponsiveContainer, LineChart, Line
} from "recharts";

function AdminDashboard() {

  const api = import.meta.env.VITE_API;

  const [data, setData] = useState({});
  const [weeklyOrders, setWeeklyOrders] = useState([]);

  const [dailyRevenue, setDailyRevenue] = useState([]);
  const [weeklyRevenue, setWeeklyRevenue] = useState([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);

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

      const weekMap = { Week1: 0, Week2: 0, Week3: 0, Week4: 0, Week5: 0 };

      const dayMap = { Sun: 0, Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0 };
      const weekRevenueMap = { Week1: 0, Week2: 0, Week3: 0, Week4: 0, Week5: 0 };
      const monthMap = {};

      orders.forEach(order => {

        const d = new Date(order.createdAt);


        if (order.status === "Pending") pending++;
        if (d.toDateString() === now.toDateString()) today++;
        if (d.getMonth() === now.getMonth()) month++;
        if (d.getFullYear() === now.getFullYear()) year++;


        const week = Math.ceil(d.getDate() / 7);
        weekMap[`Week${week}`]++;


        const amount = order.totalAmount;


        const day = d.toLocaleString("en-US", { weekday: "short" });
        dayMap[day] += amount;


        weekRevenueMap[`Week${week}`] += amount;


        const monthName = d.toLocaleString("default", { month: "short" });
        monthMap[monthName] = (monthMap[monthName] || 0) + amount;

      });

      setWeeklyOrders(
        Object.keys(weekMap).map(w => ({ week: w, orders: weekMap[w] }))
      );

      setDailyRevenue(
        Object.keys(dayMap).map(d => ({ day: d, amount: dayMap[d] }))
      );

      setWeeklyRevenue(
        Object.keys(weekRevenueMap).map(w => ({ week: w, amount: weekRevenueMap[w] }))
      );

      setMonthlyRevenue(
        Object.keys(monthMap).map(m => ({ month: m, amount: monthMap[m] }))
      );

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

  const COLORS = ["#ff9800", "#4caf50"];

  return (
    <div className="dashboard-container">

      <h1 className="dashboard-title">Admin Dashboard</h1>


      <div className="dashboard-grid">

        <div className="card"><p>Products</p><h2>{data.products}</h2></div>
        <div className="card"><p>Services</p><h2>{data.services}</h2></div>
        <div className="card"><p>Users</p><h2>{data.users}</h2></div>

        <div className="card highlight"><p>Total Orders</p><h2>{data.orders}</h2></div>
        <div className="card highlight"><p>Payments</p><h2>{data.payments}</h2></div>
        <div className="card highlight"><p>Pending</p><h2>{data.pending}</h2></div>

        <div className="card"><p>Today</p><h2>{data.today}</h2></div>
        <div className="card"><p>Month</p><h2>{data.month}</h2></div>
        <div className="card"><p>Year</p><h2>{data.year}</h2></div>

      </div>


      <div className="charts-container">


        <div className="chart-box">
          <h3>Daily Revenue</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line dataKey="amount" stroke="#ff5722" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>


        <div className="chart-box">
          <h3>Weekly Revenue</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#9c27b0" />
            </BarChart>
          </ResponsiveContainer>
        </div>




        <div className="chart-box">
          <h3>Order Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={[
                { name: "Pending", value: data.pending },
                { name: "Completed", value: data.orders - data.pending }
              ]} dataKey="value" outerRadius={100}>
                <Cell fill="#ff9800" />
                <Cell fill="#4caf50" />
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>


        <div className="chart-box">
          <h3>Weekly Orders</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyOrders}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#673ab7" />
            </BarChart>
          </ResponsiveContainer>
        </div>


        <div className="chart-box">
          <h3>Monthly Revenue</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#1976d2" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;