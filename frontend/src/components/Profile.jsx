import React, { useContext } from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import { UserContext } from "./context/UserProvider";
import "bootstrap/dist/css/bootstrap.min.css";

const Profile = () => {
  //extract user and loading state from UserContext
  const { user, loading } = useContext(UserContext);

  //loading message while user data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  //log in button if no user data is available
  if (!user) {
    return (
      <>
        <NavBar />

        <div className="text-center mt-5">
          <p className="text-white">Log in to see the profile</p>
          <Link to="/logIn" className="btn button">
            Log In
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title text-center mb-4">Profile</h3>
                <ul className="list-group">
                  <li className="list-group-item">
                    <strong>Firstname:</strong> {user.firstname}
                  </li>
                  <li className="list-group-item">
                    <strong>Lastname:</strong> {user.lastname}
                  </li>
                  <li className="list-group-item">
                    <strong>Email:</strong> {user.email}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
