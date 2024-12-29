import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "../style.css/navbar.css"
import { AuthContext } from "./context/AuthProvider.jsx";

const NavBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { auth, logout } = useContext(AuthContext);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogOut = () => {
    logout();
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light custom-nav">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/everything">LOGO</Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={handleToggle}
          aria-controls="navbarNavAltMarkup"
          aria-expanded={!isCollapsed}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isCollapsed ? '' : 'show'}`} id="navbarNavAltMarkup">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link className="nav-link" to="/everything">EVERYTHING</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/about">ABOUT</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contact">CONTACT US</Link></li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart"><i className="fas fa-shopping-cart"></i></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profile"><i className="fas fa-user"></i></Link>
            </li>
          </ul>
          <ul className="navbar-nav mb-2 mb-lg-0">
              {auth ? (
              <li className="nav-item"><button className="nav-link btn" onClick={handleLogOut}>Log Out</button></li>
            ) : (
              <li className="nav-item"><Link className="nav-link" to="/logIn">Log In</Link></li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;