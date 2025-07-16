import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { BellIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '../../context/NotificationsContext/NotificationsContext';
import './NotificationDropdown.css';

const NotificationDropdown = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, unreadCount, markAsRead } = useNotifications();

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleViewAll = () => {
    setIsOpen(false);
    navigate('/notifications');
  };

  return (
    <div className="notification-dropdown">
      <button className="notification-icon" onClick={toggleDropdown}>
        <BellIcon className="icon" />
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount}</span>
        )}
      </button>

      {isOpen && (
        <div className="dropdown-content">
          <div className="dropdown-header">
            <h3>Notifications</h3>
            <button className="view-all" onClick={handleViewAll}>View All</button>
          </div>
          
          <div className="notifications-list">
            {notifications.length === 0 && (
              <div className="notification-item empty">No notifications</div>
            )}
            {notifications.slice(0, 5).map(notification => (
              <div
                key={notification.id}
                className={`notification-item ${notification.read ? '' : 'unread'}`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="notification-icon">
                  <BellIcon className="icon" />
                </div>
                <div className="notification-content">
                  <h4>{notification.title}</h4>
                  <p>{notification.message}</p>
                  <span className="notification-time">{formatDistanceToNow(notification.timestamp, { addSuffix: true })}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;