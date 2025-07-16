/** @format */

import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import {
  HomeIcon,
  RectangleGroupIcon, // Cars
  CalendarDaysIcon, // Bookings
  HeartIcon, // Favorites
  DocumentTextIcon, // My Ads (using DocumentTextIcon as placeholder)
  BellIcon,
  Cog6ToothIcon, // Settings
  ArrowLeftOnRectangleIcon, // Logout
  ChevronDoubleLeftIcon, // Collapse icon
  ChevronDoubleRightIcon, // Expand icon
} from "@heroicons/react/24/outline";
// Placeholder for logo
import LogoFull from "../../assets/logo-icon.svg"; // Changed to png, assuming this is the intended full logo for now
import LogoIcon from "../../assets/logo-icon.svg"; // Assuming this is also the icon
import textIcon from "../../assets/text-logo.svg";

// Accept isCollapsed and toggleSidebar props
const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  return (
    // Add 'collapsed' class based on state
    <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className='sidebar-header'>
        {/* Logo and Toggle Button Container */}
        <button onClick={toggleSidebar} className='sidebar-logo-toggle-btn'>
          {/* Always render the main icon/logo part of the button */}
          <img
            src={isCollapsed ? LogoIcon : LogoFull}
            alt={isCollapsed ? "Logo Icon" : "Full Logo"}
            className={`sidebar-logo-${isCollapsed ? "icon" : "full"}`}
          />
          {/* Text logo, only shown when not collapsed */}
          {!isCollapsed && (
            <img
              src={textIcon}
              alt='Rivent Text Logo'
              className='sidebar-logo-text-img'
            />
          )}
        </button>
      </div>

      <nav className='sidebar-nav sidebar-nav-main'>
        <NavLink
          to='/'
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <HomeIcon />
          {!isCollapsed && <span>Dashboard</span>}
        </NavLink>
        <NavLink
          to='/cars'
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <RectangleGroupIcon />
          {!isCollapsed && <span>Cars</span>}
        </NavLink>
        <NavLink
          to='/bookings'
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <CalendarDaysIcon />
          {!isCollapsed && <span>Bookings</span>}
        </NavLink>
        <NavLink
          to='/favorites'
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <HeartIcon />
          {!isCollapsed && <span>Favorites</span>}
        </NavLink>
        <NavLink
          to='/my-ads'
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <DocumentTextIcon />
          {!isCollapsed && <span>My Activity</span>} {/* Updated text */}
        </NavLink>
      </nav>

      <nav className='sidebar-nav sidebar-nav-bottom'>
        <NavLink
          to="/notifications"
          className={({ isActive }) =>
            `sidebar-nav-link ${isActive ? "active" : ""}`
          }
        >
          <BellIcon className="sidebar-nav-icon" />
          {!isCollapsed && <span>Notifications</span>}
        </NavLink>
        <NavLink
          to='/settings'
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <Cog6ToothIcon />
          {!isCollapsed && <span>Settings</span>}
        </NavLink>
        <NavLink
          to='/logout'
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <ArrowLeftOnRectangleIcon />
          {!isCollapsed && <span>Logout</span>}
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
