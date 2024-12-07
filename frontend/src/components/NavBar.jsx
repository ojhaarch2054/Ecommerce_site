import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">LOGO</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link className="nav-link" to="/">EVERYTHING</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/women">WOMEN</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/men">MEN</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/accessories">ACCESSORIES</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/about">ABOUT</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contact">CONTACT US</Link></li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart"><i className="fas fa-shopping-cart"></i></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profile"><i className="fas fa-user"></i></Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
