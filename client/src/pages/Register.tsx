import React, { FormEvent, useState } from "react";
import axios from "axios";

export const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    setUser((prevState) => {
      return { ...prevState, [fieldName]: e.target.value };
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await axios.post(
      "http://localhost:3007/api/users/register",
      user
    );
    console.log(res.data.message);
    setUser({
      name: "",
      email: "",
      password: "",
      phone: "",
    });
  };

  return (
    <div className="register">
      <h1>Register:</h1>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form__section">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              value={user.name}
              onChange={handleChange}
            />
          </div>
          <div className="form__section">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              value={user.email}
              onChange={handleChange}
            />
          </div>
          <div className="form__section">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              value={user.password}
              onChange={handleChange}
            />
          </div>
          <div className="form__section">
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              name="phone"
              id="phone"
              value={user.phone}
              onChange={handleChange}
            />
          </div>
          <div className="form__section">
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};
