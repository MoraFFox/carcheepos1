/** @format */

import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./signup.css";
import instance from "../../../api/API-URL-AXIOS.JS";
const Signup = () => {
  const signupUrl = "/api/v1/register-user";
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    country: "",
    city: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Replace with your actual signup API call
      console.log(formData);
      const response = await instance.post(signupUrl, formData);
      console.log(response.data.accessToken);
      console.log(response.status);

      const data = await response.data;
      console.log(data);
      navigate("/auth/login");
    } catch (err) {
      if (err.response?.status === 400) {
        setError('This email is already in use');
      } else if(err.response?.status === 401) {
        setError('Unauthorized');
      }else if(err.response?.status === 404) {
        setError(err.response?.data?.message);
      }else if(err.response?.status === 500) {
        setError('Internal Server Error');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='signup-page'>
      <form onSubmit={handleSubmit} className='signup-form'>
        <h2>Create Account</h2>
        {error && <div className='error-message'>{error}</div>}

        <div className='form-row'>
          <div className='form-group'>
            <label>Username</label>
            <input
              type='text'
              name='username'
              value={formData.username}
              onChange={handleChange}
              required
              autoComplete='off'
            />
          </div>
        </div>

        <div className='form-group'>
          <label>Email</label>
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete='off'
          />
        </div>

        <div className='form-group'>
          <label>Password</label>
          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete='off'
          />
        </div>
        <div className='form-group-row'>
          <label>Country</label>
          <input
            type='text'
            name='country'
            value={formData.country}
            onChange={handleChange}
            required
            autoComplete='off'
          />
          <label>City</label>
          <input
            type='text'
            name='city'
            value={formData.city}
            onChange={handleChange}
            required
            autoComplete='off'
          />
        </div>
        <div className='form-group'>
          <label>Phone Number</label>
          <input
            type='text'
            name='phone'
            value={formData.phone}
            onChange={handleChange}
            required
            autoComplete='off'
          />
        </div>

        <button type='submit' disabled={loading}>
          Sign Up
        </button>

        <p className='login-link'>Already have an account? <NavLink to='/auth/login'>Login</NavLink></p>
        
      </form>
    </div>
  );
};

export default Signup;
