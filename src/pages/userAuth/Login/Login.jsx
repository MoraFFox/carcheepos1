/** @format */

import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Login.css";
import instance from "../../../api/API-URL-AXIOS.JS";
import AuthContext from "../../../context/AuthContext/AuthContext";
import { useContext } from "react";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const { setAuth, login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const loginUrl = "/api/v1/login-user";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Replace with your actual authentication logic
      const response = await instance.post(loginUrl, formData);
      const accessToken = response.data.jwtToken;
      const userRole = response.data;
      const userData = response.data;
      const refresh_token = response.data.refreshToken;
      console.log(response);
      login(accessToken, refresh_token, userData);
      setAuth({ accessToken, userRole, userData: formData });
      console.log(userData);

      navigate("/");
    } catch (err) {
      if (!err?.response) {
        setError("No response from server");
      } else if (err.response?.status === 401) {
        setError("Invalid credentials");
      } else if (err.response?.status === 400) {
        setError("Missing a Field");
      } else {
        setError("Failed to login");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        <div className="form-group">
          <label className="form-label" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="form-button" disabled={loading}>
          Login
        </button>
        <p className="login-link">
          Don't have an account? <NavLink to="/auth/signup">Sign Up</NavLink>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
