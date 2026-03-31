import { Routes, Route } from "react-router-dom";

import Login1 from "./components/Login1";
import Login2 from "./components/Login2";

import Home from "./components/home";
import ProductPage from "./components/ProductPage"; 
import CartPage from "./components/CartPage";

import AdminLogin from "./AdminComponents/AdminLogin";
import AdminBoard from "./AdminComponents/adminboard";
import AddProduct from "./AdminComponents/add-product";
import ViewProduct from "./AdminComponents/view-product";
import AddService from "./AdminComponents/AddService";
import CheckoutPage from "./components/CheckoutPage";
import MyOrders from "./components/MyOrders";
import ManageOrders from "./AdminComponents/ManageOrders";


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
      
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/adminboard" element={<AdminBoard />} />
      <Route path="/admin/add-product" element={<AddProduct />} />
      <Route path="/admin/view-product" element={<ViewProduct />} />
      <Route path="/admin/add-service" element={<AddService />} />
      <Route path="/admin/orders" element={<ManageOrders/>}/>
    </Routes>
  );
}

export default App;