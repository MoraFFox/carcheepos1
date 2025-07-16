/** @format */

import React, { useContext, useState } from 'react';
import AuthContext from '../../context/AuthContext/AuthContext';
import './ProfilePage.css';

export default function ProfilePage() {
  const { user, updateProfile } = useContext(AuthContext);
  const [form, setForm] = useState({
    username: user?.username || '',
    phone: user?.phone || '',
    location: user?.location || '',
  });
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSaved(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(form);
    setSaved(true);
  };
  return (
    <div className="settings-subpage-container">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label htmlFor="username">User Name</label>
          <input
            id="username"
            name="username"
            type="text"
            value={form.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            pattern="[0-9+\-() ]*"
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            id="location"
            name="location"
            type="text"
            value={form.location}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="primary-btn">Save</button>
        {saved && <p className="save-msg">Saved!</p>}
      </form>
    </div>
  );
}
