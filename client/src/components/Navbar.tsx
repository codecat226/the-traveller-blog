import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

const Navbar = () => {
  const { isLoggedIn } = useAppSelector((state) => state.userR);
  return (
    <nav className="nav">
      {!isLoggedIn && (
        <Link to="/" className="nav__link">
          Home
        </Link>
      )}
      {!isLoggedIn && (
        <Link to="/register" className="nav__link">
          Register
        </Link>
      )}
      {!isLoggedIn && (
        <Link to="/login" className="nav__link">
          Login
        </Link>
      )}
      <Link to="/contact" className="nav__link">
        Contact
      </Link>
      {isLoggedIn && (
        <Link to="/profile" className="nav__link">
          Profile
        </Link>
      )}
      {isLoggedIn && (
        <Link to="/blogs" className="nav__link">
          Blogs
        </Link>
      )}
      {isLoggedIn && (
        <Link to="/logout" className="nav__link">
          Logout
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
