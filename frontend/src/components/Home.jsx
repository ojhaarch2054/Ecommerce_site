// Home.jsx
import React, { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthProvider.jsx";
import { useNavigate } from "react-router-dom";
import Everything from "./Everything.jsx";

const Home = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Auth state:", auth);
  }, [auth]);

  const handleLogIn = () => {
    navigate("/login");
  };

  const handleLogOut = () => {
    logout();
  };

  return (
    <div>
      <Everything />
      {auth ? (
        <button onClick={handleLogOut}>Log Out</button>
      ) : (
        <button onClick={handleLogIn}>Log In</button>
      )}
    </div>
  );
};

export default Home;