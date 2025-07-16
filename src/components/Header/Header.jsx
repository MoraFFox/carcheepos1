/** @format */

import React, {useRef, useState}  from "react";
import {useNavigate} from "react-router-dom"
import "./Header.css";
// Update icons
import {
  MagnifyingGlassIcon,
  BellIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
// Placeholder for logo if needed in header when sidebar is collapsed
import { CiUser } from "react-icons/ci";
import logoIcon from "../../assets/text-logo.svg"; // Replace with actual log
import { Bars3Icon } from "@heroicons/react/24/outline"; // Hamburger icon
import NotificationDropdown from '../NotificationDropdown/NotificationDropdown';



// Accept toggleSidebar prop
const Header = ({ isSidebarCollapsed, toggleSidebar }) => {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef(null);
  function onPosthandle() {
    navigate("/post-ad");
  }
  function onSearchClick() {
    if(isSearchOpen) {
      //* reomve  from search input
      searchInputRef.current.style.width = "0%";
      searchInputRef.current.style.opacity = "0";
      setIsSearchOpen(false);

    } else {

      //* open  from search input
      searchInputRef.current.style.width = "100%";
      searchInputRef.current.style.opacity = "1";
      setIsSearchOpen(true);
    }
    
  }
  return (
    <header className='header'>
      <div className='header-left-items'>
        {/* Hamburger Menu Icon for Mobile */}
        <button onClick={toggleSidebar} className='header-mobile-menu-btn'>
          <Bars3Icon />
        </button>
        {/* Notification Icon - to be shown on mobile next to hamburger */}
        <NotificationDropdown />
        {/* Old notification button replaced with dropdown */}
        <button className='header-icon-btn header-notification-icon-mobile'>
          <BellIcon className='header-icon' />
          <span className='notification-badge'>3</span>
        </button>
      </div>

      {/* Search Bar - hidden on mobile by CSS */}
      <div className='header-search' onClick={onSearchClick}>
        <MagnifyingGlassIcon className='header-search-icon' />
        <input type='text' placeholder='Search cars...' ref={searchInputRef}/>
      </div>

      {/* Mobile Logo - Centered on mobile */}
      <img src={logoIcon} className='logo-icon-mob' alt='Logo' />

      {/* Actions - Right aligned */}
      <div className='header-actions'>
        {/* Post Button */}
        <button className='header-post-btn' onClick={onPosthandle}>
          <PlusIcon className='header-post-icon' />
          <span>Post</span>
        </button>
        {/* User Info */}
        <div className='header-user'>
          <CiUser className='header-user-avatar' />
          <div className='header-user-info'>
            <span className='header-user-name'>Edward Jackson</span>
            <span className='header-user-rating'>4.8 ★</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
