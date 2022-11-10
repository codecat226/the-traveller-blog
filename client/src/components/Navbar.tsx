import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setLoggedIn, setLoggedOut } from "../features/userSlice";
import { logoutUser } from "../services/userServices";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const { isLoggedIn } = useAppSelector((state) => state.userR);
  const { isLoggedIn } = useAppSelector((state) => state.userR);
  console.log(isLoggedIn);
  useEffect(() => {
    let loginState = JSON.parse(localStorage.getItem("isLoggedIn")!);
    if (loginState === true) {
      dispatch(setLoggedIn());
    } else if (loginState === false) {
      dispatch(setLoggedOut());
    }
  }, [dispatch]);

  const callLogout = async () => {
    try {
      const res = await logoutUser();
      if (res.status === 200) {
        dispatch(setLoggedOut());
        navigate("/");
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
        <Link to="/logout" onClick={callLogout} className="nav__link">
          Logout
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
