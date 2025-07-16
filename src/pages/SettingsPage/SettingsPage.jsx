/** @format */

import React from "react";
import "./SettingsPage.css";
import {
  UserIcon,
  BellIcon,
  PaintBrushIcon,
  LifebuoyIcon,
  StarIcon,
  AtSymbolIcon,
  // DatabaseIcon,
  ArrowLeftOnRectangleIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

function ListItem({ icon: Icon, label, onClick, external }) {
  return (
    <li className="settings-item" onClick={onClick}>
      <div className="settings-item-left">
        <Icon className="settings-item-icon" />
        <span>{label}</span>
      </div>
      <ChevronRightIcon
        className={`settings-item-chevron ${external ? "external" : ""}`}
      />
    </li>
  );
}

export default function SettingsPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: integrate auth logout
    alert("Logged out (mock)");
  };

  return (
    <div className="settings-container">
      {/* Profile */}
      <section className="settings-profile-card">
        <img
          src={`https://i.pravatar.cc/150?u=static`}
          alt="Profile"
          className="settings-avatar"
        />
        <div className="settings-profile-info">
          <h3>John Smith</h3>
          <button
            className="edit-profile-btn"
            onClick={() => navigate("/profile")}
          >
            Edit Profile
          </button>
        </div>
      </section>

      {/* Account settings */}
      <ul className="settings-list">
        <ListItem
          icon={UserIcon}
          label="Account Settings"
          onClick={() => navigate("/account")}
        />
      </ul>

      {/* Preferences header */}
      <h4 className="settings-section-title">Preferences</h4>
      <ul className="settings-list">
        <ListItem
          icon={BellIcon}
          label="Notifications"
          onClick={() => navigate("/settings/notifications")}
        />
        <ListItem
          icon={PaintBrushIcon}
          label="Appearance"
          onClick={() => navigate("/settings/appearance")}
        />
      </ul>

      {/* Resources header */}
      <h4 className="settings-section-title">Resources</h4>
      <ul className="settings-list">
        <ListItem
          icon={LifebuoyIcon}
          label="Contact Support"
          external
          onClick={() => window.open("mailto:support@example.com", "_blank")}
        />
        <ListItem
          icon={AtSymbolIcon}
          label="Follow us"
          external
          onClick={() => window.open("https://twitter.com/company", "_blank")}
        />
      </ul>

      {/* Sign out */}
      <ul className="settings-list">
        <ListItem
          icon={ArrowLeftOnRectangleIcon}
          label="Sign Out"
          onClick={handleLogout}
        />
      </ul>

      {/* Footer */}
      <footer className="settings-footer">
        <div className="settings-logo">CarCHeepo</div>
        <small className="settings-version">Version 0.1.0</small>
        <button className="settings-terms" onClick={() => navigate("/terms")}>
          Terms & Privacy
        </button>
      </footer>
    </div>
  );
}
