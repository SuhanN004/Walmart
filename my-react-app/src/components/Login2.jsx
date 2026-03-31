import "../styles/Login2.css";
import logo from "../assets/walmart-logo.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login2() {
  
  const navigate = useNavigate();
  const location = useLocation();


  
  const email = location.state?.email || "";

 
  const[firstName,setFirstName] =useState("");

  const[lastName,setLastName] =useState("");



  const [phone,setPhone]=useState("");
  const [password,setPassword]=useState("");


  
const handleSignup = async () => {

  if (!firstName || !lastName || !phone || !password) {
    alert("Please fill all fields");
    return;
  }

  try {

    const res = await axios.post("http://localhost:5000/api/auth/signup", {
      email,
      firstName,
      lastName,
      phone,
      password
    });

    
    localStorage.setItem("userId", res.data.user._id);

    alert("Account created successfully");

    navigate("/home");

  } catch (err) {
    console.log(err);

    alert(err.response?.data?.message || "Error creating account");
  }
};

  return (
    <div className="login-page">

      <div className="container">

        <div className="logo">
          <img src={logo} alt="Walmart" />
        </div>

        <h1>Create your Walmart account</h1>
        <div className="email-section">
          <div className="email-label">Email</div>
          <div className="email-row">
            <span className="email-text">{email}</span>

            <a href="#" className="change-link">Change</a>
          </div>
        </div>

        <div className="form-group">


          <label>First name *</label>

          <input type="text" onChange={(e)=>setFirstName(e.target.value)} />
        </div>

        <div className="form-group">

          <label>Last name *</label>

          <input type="text" onChange={(e)=>setLastName(e.target.value)} />
        </div>

        <div className="form-group">

          <label>Phone number *</label>

          <input type="text" onChange={(e)=>setPhone(e.target.value)} />
        </div>


        <div className="form-group">




          <label>Create a password *</label>

          <input type="password" onChange={(e)=>setPassword(e.target.value)} />
        </div>

        <div className="terms">

          <label className="checkbox-row">

            <input type="checkbox" defaultChecked />
            <span>
              Send me emails about new arrivals, hot items, daily savings and more.
            </span>
          </label>

          <p className="terms-text">


            By clicking Continue, you agree to our

            <a href="#"> Terms of Use</a> & acknowledge you've read our
            <a href="#"> Privacy Notice</a> &
            <a href="#"> Mobile Alerts Terms</a>.


          </p>
        </div>



        <button className="btn" onClick={handleSignup}>
          Sign In
        </button>

      </div>


      <footer>
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

export default Login2;
