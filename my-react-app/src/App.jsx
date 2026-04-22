import { Routes, Route } from "react-router-dom";

import Login1 from "./components/Login1";
import Login2 from "./components/Login2";

import Home from "./components/home";
import ProductPage from "./components/ProductPage"; 
import CartPage from "./components/CartPage";
import CheckoutPage from "./components/CheckoutPage";
import MyOrders from "./components/MyOrders";

import AdminLogin from "./AdminComponents/AdminLogin";
import AdminBoard from "./AdminComponents/adminboard";
import AddProduct from "./AdminComponents/add-product";
import ViewProduct from "./AdminComponents/view-product";
import AddService from "./AdminComponents/AddService";
import ManageOrders from "./AdminComponents/ManageOrders";
import AdminDashboard from "./AdminComponents/AdminDashboard";


function DummyPage({ title }) {
  return (
    <div style={{ padding: "120px", fontSize: "24px" }}>
      {title}
    </div>
  );
}

function App() {
  return (
    <Routes>

      
      <Route path="/" element={<Login1 />} />
      <Route path="/create-account" element={<Login2 />} />

      
      <Route path="/home" element={<Home />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/orders" element={<MyOrders />} />
      <Route path="/details" element={<DummyPage title="My Details Page" />} />
      
      <Route path="/auto-service" element={<DummyPage title="Auto Service Page" />} />
      <Route path="/cashback" element={<DummyPage title="Cashback Page" />} />
      <Route path="/gift-cards" element={<DummyPage title="Gift Cards Page" />} />
      <Route path="/wishlist" element={<DummyPage title="Wishlist Page" />} />
      <Route path="/taxes" element={<DummyPage title="Taxes Page" />} />

      
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/adminboard" element={<AdminBoard />} />
      <Route path="/admin/add-product" element={<AddProduct />} />
      <Route path="/admin/view-product" element={<ViewProduct />} />
      <Route path="/admin/add-service" element={<AddService />} />
      <Route path="/admin/orders" element={<ManageOrders />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;