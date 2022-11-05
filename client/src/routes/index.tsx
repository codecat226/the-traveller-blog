import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import {
  Home,
  Login,
  Register,
  Contact,
  Profile,
  Logout,
} from "../pages/Index";
import { useAppSelector } from "../app/hooks";

// Create routes for app
const Index = () => {
  const { isLoggedIn } = useAppSelector((state) => state.userR);
  return (
    <BrowserRouter>
      <Navbar />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          {!isLoggedIn && (
            <Route path="/register" element={<Register />}></Route>
          )}
          {!isLoggedIn && <Route path="/login" element={<Login />}></Route>}
          <Route path="/contact" element={<Contact />}></Route>
          {isLoggedIn && <Route path="/profile" element={<Profile />}></Route>}
          {isLoggedIn && <Route path="/logout" element={<Logout />}></Route>}
          <Route path="*" element={<Home />}></Route>
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default Index;
