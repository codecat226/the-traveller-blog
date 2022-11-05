import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserProfile } from "../types/types";
import { userProfile } from "../services/userServices";
axios.defaults.withCredentials = true;

export const Profile = () => {
  const [user, setUser] = useState<UserProfile>({
    email: "",
    name: "",
    phone: "",
  });
  const sendReq = async () => {
    try {
      const res = await userProfile();
      const { email, name, phone } = res.foundUser;
      setUser({
        email: email,
        name: name,
        phone: phone,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    sendReq();
  }, []);

  return (
    <main>
      <h2>User Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
    </main>
  );
};
