import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../AdminStyles/AdminLogin.css";
import logo from "../assets/walmart-logo.svg";

function AdminLogin() {

  const navigate = useNavigate();

  const[username,setUsername]= useState("");
  const[password,setPassword] =useState("");

  const handleLogin = () => {
    if (username === "suhanvnrs@gmail.com" && password === "SuhanN") {
      
      navigate("/adminboard"); 
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">

        <img src={logo} alt="Walmart" className="logo" />

        <h1>Walmart Admin Login</h1>

        <label className="label">Username *</label>
        <input


          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />



        <label className="label">Password *</label>
        <input
          type="password"
          value={password}


          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn" onClick={handleLogin}>
          Sign In
        </button>

      </div>

       <footer className="login-footer">


        <span>© 2026 Walmart. All Rights Reserved.</span>
        <a href="#">Give feedback</a>

        <a href="#">CA Privacy Rights</a>


        <a href="#">Your Privacy Choices</a>
        <a href="#">Notice at Collection</a>
        <a href="#">Request My Personal Information</a>


        <a href="#">Delete Account</a>

        <a href="#">California Supply Chains Act</a>
      </footer>
    </div>
  );
}

export default AdminLogin;