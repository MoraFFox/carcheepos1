/** @format */

import React, { createContext, useState, useContext, useCallback } from "react";

// Mock notifications data – replace with API integration when backend is ready
const initialNotifications = [
  {
    id: 1,
    title: "Response from seller",
    type: "response",
    message: "John replied to your inquiry.",
    timestamp: Date.now() - 2 * 60 * 60 * 1000, // 2 hours ago
    read: false,
  },
  {
    id: 2,
    title: "New appointment",
    type: "appointment",
    message: "You have a viewing appointment tomorrow at 4 PM.",
    timestamp: Date.now() - 24 * 60 * 60 * 1000, // 1 day ago
    read: false,
  },
  {
    id: 3,
    title: "Purchase confirmed",
    type: "purchase",
    message: "Your payment for the BMW i3 is confirmed.",
    timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000,
    read: false,
  },
];

const NotificationsContext = createContext();

export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(initialNotifications);

  // Mark a notification as read
  const markAsRead = useCallback((id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  }, []);

  // Mark all as read
  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  // Add a new notification (for future use / testing)
  const addNotification = useCallback((notification) => {
    setNotifications((prev) => [{ ...notification, read: false }, ...prev]);
  }, []);

  // Derived count of unread notifications
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationsContext.Provider
      value={{ notifications, unreadCount, markAsRead, markAllAsRead, addNotification }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => {
  const ctx = useContext(NotificationsContext);
  if (!ctx) {
    throw new Error("useNotifications must be used within NotificationsProvider");
  }
  return ctx;
};
