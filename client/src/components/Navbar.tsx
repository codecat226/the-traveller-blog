import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  removeAdmin,
  setAdmin,
  setLoggedIn,
  setLoggedOut,
} from "../features/userSlice";
import { logoutUser } from "../services/userServices";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const { isLoggedIn } = useAppSelector((state) => state.userR);
  const { isLoggedIn, isAdmin } = useAppSelector((state) => state.userR);
  useEffect(() => {
    let loginState = JSON.parse(localStorage.getItem("isLoggedIn")!);
    let adminState = JSON.parse(localStorage.getItem("isAdmin")!);
    if (loginState === true) {
      dispatch(setLoggedIn());
    } else if (loginState === false) {
      dispatch(setLoggedOut());
    }
    if (adminState === true) {
      dispatch(setAdmin());
    } else if (adminState === false) {
      dispatch(removeAdmin());
    }
  }, [dispatch]);

  const callLogout = async () => {
    try {
      const res = await logoutUser();
      if (res.status === 200) {
        dispatch(setLoggedOut());
        dispatch(removeAdmin());
        navigate("/home");
        localStorage.clear();
      }
    } catch (error: any) {
      console.log(error);
    }
  };
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
      {!isAdmin && (
        <Link to="/contact" className="nav__link">
          Contact
        </Link>
      )}
      {isLoggedIn && !isAdmin && (
        <Link to="/profile" className="nav__link">
          Profile
        </Link>
      )}
      {isLoggedIn && isAdmin && (
        <Link to="/admin-profile" className="nav__link">
          Profile
        </Link>
      )}
      {isLoggedIn && isAdmin && (
        <Link to="/dashboard" className="nav__link">
          Dashboard
        </Link>
      )}
      {isLoggedIn && !isAdmin && (
        <Link to="/blogs" className="nav__link">
          Blogs
        </Link>
      )}
      {isLoggedIn && (
        <Link to="/logout" onClick={callLogout} className="nav__link">
          Logout
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
