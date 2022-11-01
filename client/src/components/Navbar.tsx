import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="nav">
      <Link to="/" className="nav__link">
        Home
      </Link>
      <Link to="/register" className="nav__link">
        Register
      </Link>
      <Link to="/login" className="nav__link">
        Login
      </Link>
      <Link to="/contact" className="nav__link">
        Contact
      </Link>
    </nav>
  );
};

export default Navbar;
