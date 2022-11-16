import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import {
  Home,
  Login,
  Register,
  Contact,
  Profile,
  Blogs,
  AdminLogin,
  AdminProfile,
  Dashboard,
  EditBlog,
  Activate,
  ForgotPassword,
  ResetPassword,
  AddBlog,
  DeleteBlog,
} from "../pages/Index";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  removeAdmin,
  setAdmin,
  setLoggedIn,
  setLoggedOut,
} from "../features/userSlice";

// Create routes for app
const Index = () => {
  const { isLoggedIn, isAdmin } = useAppSelector((state) => state.userR);
  const dispatch = useAppDispatch();
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

  return (
    <BrowserRouter>
      <Navbar />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          {!isLoggedIn && (
            <Route path="/register" element={<Register />}></Route>
          )}
          <Route path="/activate-account/:token" element={<Activate />}></Route>
          {!isLoggedIn && <Route path="/login" element={<Login />}></Route>}
          {!isLoggedIn && (
            <Route path="/admin-login" element={<AdminLogin />}></Route>
          )}
          <Route path="/contact" element={<Contact />}></Route>
          {isLoggedIn && !isAdmin && (
            <Route path="/profile" element={<Profile />}></Route>
          )}
          {isLoggedIn && isAdmin && (
            <Route path="/admin-profile" element={<AdminProfile />}></Route>
          )}
          {isLoggedIn && isAdmin && (
            <Route path="/dashboard" element={<Dashboard />}></Route>
          )}
          <Route path="*" element={<Home />}></Route>
          {!isLoggedIn && (
            <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          )}
          {!isLoggedIn && (
            <Route
              path="/reset-password/:token"
              element={<ResetPassword />}
            ></Route>
          )}
          {isLoggedIn && <Route path="/blogs" element={<Blogs />}></Route>}
          {isLoggedIn && isAdmin && (
            <Route path="/edit-blog" element={<EditBlog />}></Route>
          )}
          {isLoggedIn && isAdmin && (
            <Route path="/add-blog" element={<AddBlog />}></Route>
          )}
          {isLoggedIn && isAdmin && (
            <Route path="/delete-blog" element={<DeleteBlog />}></Route>
          )}
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default Index;
