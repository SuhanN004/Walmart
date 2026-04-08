import "../styles/Login1.css";
import logo from "../assets/walmart-logo.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


import axios from "axios";




function Login1() {
  const navigate = useNavigate();

  const BASE_URL = "https://walmart-3-ysdt.onrender.com";

  
  const [email,setEmail] =useState("");

  const [password, setPassword] = useState("");
  const [emailExists, setEmailExists] = useState(false);

  
  
const handleContinue = async () => {
  if (!email) {
    alert("Please enter phone or email");
    return;
  }

  try {
    const res = await axios.post(`${BASE_URL}/api/auth/check-email`, { email: email});

    if (res.data.exists) {
    
      setEmailExists(true);
    } else {
    
      navigate("/create-account", { state: { email } });
    }
  } catch (err) {
    console.log(err);
    alert("Something went wrong");
  }
};



  const handleLogin = async () => {
  if (!password) {
    alert("Please enter password");
    return;
  }

  try {
    const res = await axios.post(`${BASE_URL}/api/auth/login`, {
      email: email,
      password: password
    });

    
    localStorage.setItem("userId", res.data.user._id);

    alert("Login successful");
    navigate("/home");

  } catch (err) {
    alert("Please provide valid credentials");
  }
};




  return (
    <div className="login-page">
      <div className="login-box">



        <img src={logo} alt="Walmart" className="logo" />


        
        <h1>Sign in or create your account</h1>

        <p className="subtitle">
          Not sure if you have an account? Enter your phone<br />
          number or email and we'll check for you.

        </p>
        
        <label className="label">Phone number or email *</label>

        <input

          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}

        />

         {emailExists && (
          <>

            <label className="label">Password *</label>
            <input


              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </>
        )}
 

        <p className="privacy">
          Securing your personal information is our priority.<br />
          <a href="#">See our privacy measures.</a>

        </p>



        <button className="btn" onClick={emailExists ? handleLogin : handleContinue}>
          {emailExists ? "Sign In" : "Continue"}
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

export default Login1;
