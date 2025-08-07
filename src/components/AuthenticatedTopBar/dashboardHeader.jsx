/** @format */

import React, { useState } from "react";
import {
  FiSearch,
  FiPlus,
  FiBell,
  FiMessageSquare,
  FiMoon,
  FiSun,
  FiUser,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext/ThemeContext";
import "./dashboardHeader.css";
import { useNotifications } from "../../context/NotificationsContext/NotificationsContext";
import {
  isToday,
  isYesterday,
  differenceInCalendarDays,
  formatDistanceToNow,
} from "date-fns";

import { FiMenu } from "react-icons/fi";

const AuthenticatedTopBar = ({ user, toggleSidebar }) => {
  const navigate = useNavigate();
  const { themeName, toggleTheme } = useTheme();
  const { markAsRead, notifications, unreadCount } = useNotifications();

  const [searchQuery, setSearchQuery] = useState("");
  const [showNotif, setShowNotif] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // mock notifications – replace later

  const unread = unreadCount;
  console.log(notifications);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className='auth-header'>
      <div className='auth-container'>
        <button className='icon-btn menu-btn' onClick={toggleSidebar}>
          <FiMenu />
        </button>

        <form className='auth-search' onSubmit={handleSearchSubmit}>
          <input
            type='text'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder='Search cars...'
          />
          <div className='search-icon'>
            <FiSearch />
          </div>
        </form>

        <div className='auth-actions'>
          <button className='add-car-btn' onClick={() => navigate("/post-ad")}>
            <FiPlus /> <span className='btn-label'>Add Car</span>
          </button>

          <button
            className={`icon-btn notif-btn ${showNotif ? "active" : ""}`}
            onClick={() => setShowNotif((p) => !p)}
          >
            <FiBell />
            {unread > 0 && <span className='badge'>{unread}</span>}
            {showNotif && (
              <div className='notif-dropdown'>
                <h4>Notifications</h4>
                {notifications.length ? (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`notif-item ${!n.read ? "unread" : ""}`}
                      onClick={() => {
                        markAsRead(n.id);
                      }}
                    >
                      <p>{n.message}</p>
                      <span className='notif-times'>
                        {isToday(n.timestamp)
                          ? "Today"
                          : isYesterday(n.timestamp)
                          ? "Yesterday"
                          : differenceInCalendarDays(
                              new Date(),
                              new Date(n.timestamp)
                            ) <= 7
                          ? formatDistanceToNow(n.timestamp)
                          : formatDistanceToNow(n.timestamp, {
                              addSuffix: true,
                            })}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className='empty'>No notifications</p>
                )}
              </div>
            )}
          </button>

          <button className='icon-btn' onClick={toggleTheme}>
            {themeName === "dark" ? <FiSun /> : <FiMoon />}
          </button>

          <div className='user-wrapper'>
            <button
              className='avatar-btn'
              onClick={() => setShowMenu((p) => !p)}
            >
              {user?.avatar ? (
                <img src={user.avatar} alt='avatar' />
              ) : (
                <span>{user?.name?.[0] || "U"}</span>
              )}
            </button>
            {showMenu && (
              <div className='user-dropdown'>
                <button onClick={() => navigate("/profile")}>
                  {" "}
                  <FiUser /> Profile
                </button>
                <button onClick={() => navigate("/messages")}>
                  {" "}
                  <FiMessageSquare /> Messages
                </button>
                <button onClick={() => navigate("/settings")}>
                  {" "}
                  <FiSettings /> Settings
                </button>
                <button
                  onClick={() => {
                    /* TODO logout */
                  }}
                >
                  {" "}
                  <FiLogOut /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AuthenticatedTopBar;
