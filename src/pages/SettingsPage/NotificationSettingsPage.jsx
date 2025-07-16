/** @format */

import React, { useEffect, useState } from 'react';
import './SettingsSubPage.css';

const PREF_KEYS = ['push', 'email', 'sms', 'marketing'];

export default function NotificationSettingsPage() {
  const [prefs, setPrefs] = useState(() => {
    const stored = JSON.parse(localStorage.getItem('notificationPrefs') || '{}');
    return PREF_KEYS.reduce((acc, key) => ({ ...acc, [key]: stored[key] ?? true }), {});
  });

  useEffect(() => {
    localStorage.setItem('notificationPrefs', JSON.stringify(prefs));
  }, [prefs]);

  const togglePref = (key) => setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  return (
    <div className="settings-subpage-container">
      <h2>Notification Preferences</h2>
      {PREF_KEYS.map((key) => (
        <label key={key} className="switch-label">
          <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
          <input
            type="checkbox"
            checked={prefs[key]}
            onChange={() => togglePref(key)}
          />
          <span className="switch-slider"></span>
        </label>
      ))}
    </div>
  );
}
