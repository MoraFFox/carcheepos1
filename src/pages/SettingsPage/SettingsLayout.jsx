/** @format */

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  UserIcon,
  Cog6ToothIcon,
  BellIcon,
  PaintBrushIcon,
} from '@heroicons/react/24/outline';
import './SettingsLayout.css';

const navItems = [
  { label: 'Profile', path: '/profile', icon: UserIcon },
  { label: 'Account', path: '/account', icon: Cog6ToothIcon },
  { label: 'Notifications', path: '/settings/notifications', icon: BellIcon },
  { label: 'Appearance', path: '/settings/appearance', icon: PaintBrushIcon },
];

export default function SettingsLayout({ children }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className="settings-desktop-layout">
      <aside className="settings-side-nav">
        <ul className="settings-side-list">
          {navItems.map(({ label, path, icon: Icon }) => (
            <li
              key={path}
              className={`settings-side-item ${pathname === path ? 'active' : ''}`}
              onClick={() => navigate(path)}
            >
              <Icon className="settings-side-icon" />
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </aside>
      <main className="settings-side-content">{children}</main>
    </div>
  );
}
