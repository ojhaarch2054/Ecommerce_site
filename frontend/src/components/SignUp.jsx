import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import bcrypt from 'bcryptjs';

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordsMatch, setPasswordsMatch] = useState(false);

  //useNavigate to navigate
  const navigate = useNavigate();

  //handle input change and update form data state
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData, [id]: value };
      if (id === "password" || id === "confirmPassword") {
        setPasswordsMatch(updatedFormData.password === updatedFormData.confirmPassword);
      }
      return updatedFormData;
    });
  };

  //form submission
  const signUpSubmit = async (e) => {
    e.preventDefault();
  
    //check if passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
  
    try {
         //hash the password before sending it to the server
      const hashedPassword = await bcrypt.hash(formData.password, 10);

      //POST request to create a new user
      const user = {
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        password: hashedPassword,
      };
  
      const response = await axios.post("http://localhost:3000/users", user);
  
      console.log("User created:", response.data);
      //navigate to login page
      navigate("/login");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Sign Up</h3>
              <form onSubmit={signUpSubmit}>
                <div className="mb-3">
                  <label className="form-label">Firstname</label>
                  <input
                    className="form-control"
                    id="firstname"
                    placeholder="Enter your firstname"
                    onChange={handleChange}
                    value={formData.firstname}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Lastname</label>
                  <input
                    className="form-control"
                    id="lastname"
                    placeholder="Enter your lastname"
                    onChange={handleChange}
                    value={formData.lastname}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    onChange={handleChange}
                    value={formData.email}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                    onChange={handleChange}
                    value={formData.password}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className={`form-control ${passwordsMatch ? 'is-valid' : ''}`}
                    id="confirmPassword"
                    placeholder="Re-enter your password"
                    onChange={handleChange}
                    value={formData.confirmPassword}
                    required
                  />
                  {passwordsMatch && (
                    <span className="input-group-text bg-transparent border-0">
                      <FontAwesomeIcon icon={faCheckCircle} className="text-success" />
                    </span>
                  )}
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;