import React, { useState, useContext } from "react";
import { AuthContext } from "./context/AuthProvider.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from './context/UserProvider';
import "../style.css/everything.css";

const LogIn = () => {
  //destructure setAuth from AuthContext using useContext hook
  const { setAuth } = useContext(AuthContext);

  const { fetchUser } = useContext(UserContext);

  //for input fields
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  //for err msg
  const [error, setError] = useState("");

  //useNavigate to navigate
  const navigate = useNavigate();

  //to navigate to the sign-up page
  const signUpBtn = () => {
    navigate(`/signUp`);
  };

  //to handle input changes
  const handleChangeInput = (e) => {
    //extract the name and value from the input field
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //to handle form submission
  const logInSubmit = async (e) => {
    e.preventDefault();
    console.log("logIn btn clicked");
    console.log("Input data:", input); 

    try {
      //POST request to the login endpoint
      const response = await axios.post("http://localhost:3000/users/login", input);
      console.log("Login successful:", response.data);

      //setting the auth state with the response data
      setAuth(response.data);
      //Store authentication token in local storage
      localStorage.setItem("authToken", response.data.token);
      // Fetch user data after successful login
      await fetchUser();
      //navigating to the home page after successful login
      navigate("/");
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 200 range
        console.error("Login failed:", error.response.data);
        alert(`Login failed: ${error.response.data.message}`);
      } else if (error.request) {
        // Request was made but no response received
        console.error("No response received:", error.request);
        alert("Login failed. No response from server.");
      } else {
        // Something else happened while setting up the request
        console.error("Error:", error.message);
        alert(`Login failed: ${error.message}`);
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Log In</h3>
              <form onSubmit={logInSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={input.email}
                    onChange={handleChangeInput}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={input.password}
                    onChange={handleChangeInput}
                    required
                  />
                </div>
                {error && <div className="alert alert-danger mt-3">{error}</div>}
                <button type="submit" className="btn button w-100">
                  Log In
                </button>
              </form>
              <div>
                <p>
                  Haven't registered yet? Register here:
                  <button className="btn btn-link" onClick={signUpBtn}>
                    Sign Up
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
