import React, { useEffect, useState } from "react";
import axios from "axios";
import { User } from "../types/types";
axios.defaults.withCredentials = true;

export const Profile = () => {
  const [user, setUser] = useState<User>({
    email: "",
    name: "",
    phone: "",
  });
  const sendReq = async () => {
    try {
      const res = await axios.get("http://localhost:3007/api/users/profile", {
        withCredentials: true,
      });
      const { email, name, phone } = res.data.foundUser;
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
