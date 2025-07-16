import React, { useState } from 'react';
import { isToday, isYesterday, differenceInCalendarDays, formatDistanceToNow } from 'date-fns';
import { useNotifications } from '../../context/NotificationsContext/NotificationsContext';
import './NotificationsPage.css';

export default function NotificationsPage() {
  const [mode, setMode] = useState('date'); // date | type
  const [showUnread, setShowUnread] = useState(false);
  const { notifications, markAllAsRead } = useNotifications();
  

  // Helper: filter list according to pill selections
  const visible = notifications.filter((n) => (showUnread ? !n.read : true));

  const groupedByDate = React.useMemo(() => {
    const groups = { Today: [], Yesterday: [], 'Last 7 days': [], Earlier: [] };
    visible.forEach((n) => {
      if (isToday(n.timestamp)) groups.Today.push(n);
      else if (isYesterday(n.timestamp)) groups.Yesterday.push(n);
      else if (differenceInCalendarDays(new Date(), n.timestamp) <= 7) groups['Last 7 days'].push(n);
      else groups.Earlier.push(n);
    });
    return groups;
  }, [visible]);

  const groupedByType = React.useMemo(() => {
    const map = {};
    visible.forEach((n) => {
      const key = n.type || 'other';
      if (!map[key]) map[key] = [];
      map[key].push(n);
    });
    return map;
  }, [visible]);

  const groups = mode === 'date' ? groupedByDate : groupedByType;
  
  return (
    <div className="notifications-container">
            <div className="notifications-filter-bar">
        <button className={`filter-pill ${!showUnread ? 'active' : ''}`} onClick={() => setShowUnread(false)}>All</button>
        <button className={`filter-pill ${showUnread ? 'active' : ''}`} onClick={() => setShowUnread(true)}>Unread</button>
        <button className={`filter-pill ${mode === 'date' ? 'active' : ''}`} onClick={() => setMode('date')}>By Date</button>
        <button className={`filter-pill ${mode === 'type' ? 'active' : ''}`} onClick={() => setMode('type')}>By Type</button>
      </div>

      <div className="notifications-header">
        <h2>Notifications</h2>
        {notifications.length > 0 && (
          <button className="mark-all-btn" onClick={markAllAsRead}>
            Mark all as read
          </button>
        )}
      </div>
      {visible.length > 0 ? (
        Object.entries(groups).map(([label, items]) =>
          items.length === 0 ? null : (
            <NotificationSection key={label} label={label} items={items} />
          )
        )
      ) : (
        <p>No notifications</p>
      )}
    </div>
  );
}

function NotificationSection({ label, items }) {
  return (
    <div className="notification-section">
      <div className="notification-section-header">
        <span>{label}</span>
        <span className="notification-count">{items.length}</span>
      </div>
      <ul className="notifications-list">
        {items.map((n) => (
          <NotificationItem key={n.id} notification={n} />
        ))}
      </ul>
    </div>
  );
}

// Map type to icon component
import { ShoppingBagIcon, CalendarDaysIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';

function iconForType(type) {
  switch (type) {
    case 'purchase':
      return <ShoppingBagIcon className="notification-type-icon" />;
    case 'appointment':
      return <CalendarDaysIcon className="notification-type-icon" />;
    case 'response':
      return <ChatBubbleLeftRightIcon className="notification-type-icon" />;
    default:
      return <ChatBubbleLeftRightIcon className="notification-type-icon" />;
  }
}

function NotificationItem({ notification }) {
  const { markAsRead } = useNotifications();
  return (
    <li
      className={`notification-item ${notification.read ? '' : 'unread'}`}
      onClick={() => markAsRead(notification.id)}
    >
      {iconForType(notification.type)}
      <div className="notification-content">
        <p>{notification.message}</p>
        <small>{formatDistanceToNow(notification.timestamp, { addSuffix: true })}</small>
      </div>
    </li>
  );
}