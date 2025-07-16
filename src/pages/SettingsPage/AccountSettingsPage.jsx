/** @format */

import React, { useContext, useState } from 'react';
import AuthContext from '../../context/AuthContext/AuthContext';
import './SettingsSubPage.css';

export default function AccountSettingsPage() {
  const { user, updateProfile } = useContext(AuthContext);
  const [form, setForm] = useState({
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSaved(false);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // simple client-side validation for new password match
    if (form.newPassword && form.newPassword !== form.confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    if (form.email !== user?.email) {
      updateProfile({ email: form.email });
    }
    // Password update would call backend – placeholder
    setSaved(true);
  };
  return (
    <div className="settings-subpage-container">
      <h2>Account Settings</h2>
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="currentPassword">Current Password</label>
          <input
            id="currentPassword"
            name="currentPassword"
            type="password"
            value={form.currentPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            id="newPassword"
            name="newPassword"
            type="password"
            value={form.newPassword}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm New Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
          />
        </div>
        {error && <p className="error-msg">{error}</p>}
        <button type="submit" className="primary-btn">Save</button>
        {saved && <p className="save-msg">Saved!</p>}
      </form>

      <hr style={{ margin: '32px 0', border: 'none', borderTop: '1px solid var(--divider)' }} />
      <button className="danger-btn" disabled>Delete Account (coming soon)</button>
    </div>
  );
}
