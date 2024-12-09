import { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

const NavBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">LOGO</Link>
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
            <li className="nav-item"><Link className="nav-link" to="/">EVERYTHING</Link></li>
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
            <li className="nav-item"><Link className="nav-link" to="/logIn">Log In</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;