/** @format */

import React, { useState, useCallback } from "react";
import BookingCalendar from "../../components/BookingCalendar/BookingCalendar";
import BookingCard from "../../components/BookingCard/BookingCard";
import BookingDetailsModal from "../../components/BookingDetailsModal/BookingDetailsModal";
import MessageModal from "../../components/MessageModal/MessageModal";
import "./BookingsPage.css";

const BookingsPage = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [viewMode, setViewMode] = useState("list");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [messageRecipient, setMessageRecipient] = useState(null); // 'list' or 'calendar'

  // Mock data - replace with actual data from your backend
  const [mockBookings, setMockBookings] = useState({
    upcoming: [
      {
        id: "1234",
        car: {
          manifacture: "Toyota",
          model: "Camry",
          year: "2022",
          image: "/cars/camry.jpg",
        },
        dates: {
          start: "2025-06-01",
          end: "2025-06-05",
        },
        location: "New York, NY",
        price: 250,
        contact: {
          name: "John Doe",
          phone: "+1 234 567 8900",
          email: "john@example.com",
        },
        status: "confirmed",
      },
      {
        id: "1235",
        car: {
          manifacture: "Toyota",
          model: "Camry",
          year: "2022",
          image: "/cars/camry.jpg",
        },
        dates: {
          start: "2025-06-01",
          end: "2025-06-05",
        },
        location: "New York, NY",
        price: 250,
        contact: {
          name: "John Doe",
          phone: "+1 234 567 8900",
          email: "john@example.com",
        },
        status: "confirmed",
      },
      {
        id: "1236",
        car: {
          manifacture: "Toyota",
          model: "Camry",
          year: "2022",
          image: "/cars/camry.jpg",
        },
        dates: {
          start: "2025-06-01",
          end: "2025-06-05",
        },
        location: "New York, NY",
        price: 250,
        contact: {
          name: "John Doe",
          phone: "+1 234 567 8900",
          email: "john@example.com",
        },
        status: "confirmed",
      },
    ],
    past: [
      {
        id: "1237",
        car: {
          manifacture: "Honda",
          model: "Civic",
          year: "2021",
          image: "/cars/civic.jpg",
        },
        dates: {
          start: "2025-05-01",
          end: "2025-05-03",
        },
        location: "Los Angeles, CA",
        price: 180,
        contact: {
          name: "Jane Smith",
          phone: "+1 234 567 8901",
          email: "jane@example.com",
        },
        status: "completed",
      },
    ],
    manage: [
      {
        id: "12358",
        car: {
          manifacture: "BMW",
          model: "X5",
          year: "2023",
          image: "/cars/bmw.jpg",
        },
        dates: {
          start: "2025-06-10",
          end: "2025-06-15",
        },
        location: "Miami, FL",
        price: 450,
        contact: {
          name: "Mike Johnson",
          phone: "+1 234 567 8902",
          email: "mike@example.com",
        },
        status: "pending-approval",
      },
    ],
  });

  const handleBookingClick = useCallback((booking) => {
    setSelectedBooking(booking);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedBooking(null);
  }, []);

  const handleMessage = useCallback((contact) => {
    setMessageRecipient(contact);
  }, []);

  const handleSendMessage = useCallback(
    (message) => {
      // Here you would typically manifacture an API call to send the message
      console.log(`Sending message to ${messageRecipient.name}:`, message);
      // Close the message modal
      setMessageRecipient(null);
    },
    [messageRecipient]
  );

  const handleStatusChange = useCallback((bookingId, action) => {
    // Here you would typically manifacture an API call to update the booking status
    console.log(`Updating booking ${bookingId} with action: ${action}`);

    // For now, we'll just update the local state
    const newStatus =
      action === "approve"
        ? "confirmed"
        : action === "reject"
        ? "cancelled"
        : action === "cancel"
        ? "cancelled"
        : "pending";

    // Update the booking in all tabs
    const updateBookingInTab = (tab) => {
      return tab.map((booking) =>
        booking.id === bookingId ? { ...booking, status: newStatus } : booking
      );
    };

    setMockBookings((prev) => ({
      upcoming: updateBookingInTab(prev.upcoming),
      past: updateBookingInTab(prev.past),
      manage: updateBookingInTab(prev.manage),
    }));

    // Close the modal after action
    handleCloseModal();
  }, []);

  return (
    <div className='bookings-page'>
      <div className='bookings-page__header'>
        <div className='bookings-page__title-row'>
          <h1>My Bookings</h1>
          <div className='view-toggle'>
            <button
              className={`view-btn ${viewMode === "list" ? "active" : ""}`}
              onClick={() => setViewMode("list")}
            >
              List View
            </button>
            <button
              className={`view-btn ${viewMode === "calendar" ? "active" : ""}`}
              onClick={() => setViewMode("calendar")}
            >
              Calendar View
            </button>
          </div>
        </div>
        <div className='bookings-page__tabs'>
          <button
            className={`tab-btn ${activeTab === "upcoming" ? "active" : ""}`}
            onClick={() => setActiveTab("upcoming")}
          >
            Upcoming Trips
          </button>
          <button
            className={`tab-btn ${activeTab === "past" ? "active" : ""}`}
            onClick={() => setActiveTab("past")}
          >
            Past Trips
          </button>
          <button
            className={`tab-btn ${activeTab === "manage" ? "active" : ""}`}
            onClick={() => setActiveTab("manage")}
          >
            Manage Bookings
          </button>
        </div>
      </div>

      <div className='bookings-page__content'>
        {viewMode === "calendar" ? (
          <BookingCalendar bookings={Object.values(mockBookings).flat()} />
        ) : mockBookings[activeTab]?.length > 0 ? (
          <div className='bookings-list'>
            {mockBookings[activeTab].map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                type={activeTab === "manage" ? "seller" : "renter"}
                status={booking.status}
                onClick={() => handleBookingClick(booking)}
              />
            ))}
          </div>
        ) : (
          <div className='bookings-empty'>
            <img
              src='/empty-bookings.svg'
              alt='No bookings'
              className='empty-illustration'
            />
            <h3>No bookings found</h3>
            <p>You don't have any {activeTab} bookings at the moment.</p>
          </div>
        )}
      </div>

      {selectedBooking && (
        <BookingDetailsModal
          booking={selectedBooking}
          onClose={handleCloseModal}
          onStatusChange={handleStatusChange}
          onMessage={handleMessage}
        />
      )}

      {messageRecipient && (
        <MessageModal
          recipient={messageRecipient}
          onClose={() => setMessageRecipient(null)}
          onSend={handleSendMessage}
        />
      )}
    </div>
  );
};

export default BookingsPage;
