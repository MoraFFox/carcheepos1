/** @format */

import React from "react";
import { format } from "date-fns";
import {
  FaCar,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUser,
  FaPhoneAlt,
  FaEnvelope,
  FaDollarSign,
  FaClock,
} from "react-icons/fa";
import "./BookingDetailsModal.css";
import { getCarImage } from "../../utils/imageUtils";
const BookingDetailsModal = ({
  booking,
  onClose,
  onStatusChange,
  onMessage,
}) => {
  if (!booking) return null;

  const formatDate = (dateString) => {
    return format(new Date(dateString), "MMM dd, yyyy");
  };

  const statusActions = {
    "pending-approval": ["approve", "reject"],
    confirmed: ["cancel"],
    pending: ["cancel"],
    completed: [],
    cancelled: [],
  };

  const handleAction = (action) => {
    onStatusChange(booking.id, action);
  };

  const getStatusLabel = (status) => {
    return status
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className='modal-overlay' onClick={onClose}>
      <div className='booking-modal' onClick={(e) => e.stopPropagation()}>
        <button className='modal-close' onClick={onClose}>
          &times;
        </button>

        <div className='booking-modal__header'>
          <div
            className='booking-modal__status-badge'
            data-status={booking.status}
          >
            {getStatusLabel(booking.status)}
          </div>
          <h2>
            {booking.car.manifacture} {booking.car.model} {booking.car.year}
          </h2>
        </div>

        <div className='booking-modal__content'>
          <div className='booking-modal__image'>
            <img
              src={getCarImage(booking.car)}
              alt={`${booking.car.manifacture} ${booking.car.model}`}
            />
          </div>

          <div className='booking-modal__info-section'>
            <h3>Booking Details</h3>
            <div className='info-grid'>
              <div className='info-item'>
                <FaCalendarAlt />
                <div>
                  <strong>Dates</strong>
                  <p>
                    {formatDate(booking.dates.start)} -{" "}
                    {formatDate(booking.dates.end)}
                  </p>
                </div>
              </div>
              <div className='info-item'>
                <FaMapMarkerAlt />
                <div>
                  <strong>Location</strong>
                  <p>{booking.location}</p>
                </div>
              </div>
              <div className='info-item'>
                <FaCar />
                <div>
                  <strong>Booking ID</strong>
                  <p>#{booking.id}</p>
                </div>
              </div>
              <div className='info-item'>
                <FaDollarSign />
                <div>
                  <strong>Total Price</strong>
                  <p>${booking.price}</p>
                </div>
              </div>
            </div>
          </div>

          <div className='booking-modal__contact-section'>
            <h3>Contact Information</h3>
            <div className='contact-grid'>
              <div className='contact-item'>
                <FaUser />
                <div>
                  <strong>Name</strong>
                  <p>{booking.contact.name}</p>
                </div>
              </div>
              <div className='contact-item'>
                <FaPhoneAlt />
                <div>
                  <strong>Phone</strong>
                  <p>{booking.contact.phone}</p>
                </div>
              </div>
              <div className='contact-item'>
                <FaEnvelope />
                <div>
                  <strong>Email</strong>
                  <p>{booking.contact.email}</p>
                </div>
              </div>
            </div>
          </div>

          <div className='booking-modal__actions'>
            <button
              className='action-btn message'
              onClick={() => onMessage(booking.contact)}
            >
              Message Contact
            </button>
          </div>

          {statusActions[booking.status]?.length > 0 && (
            <div className='booking-modal__actions'>
              {statusActions[booking.status].includes("approve") && (
                <button
                  className='action-btn approve'
                  onClick={() => handleAction("approve")}
                >
                  Approve Booking
                </button>
              )}
              {statusActions[booking.status].includes("reject") && (
                <button
                  className='action-btn reject'
                  onClick={() => handleAction("reject")}
                >
                  Reject Booking
                </button>
              )}
              {statusActions[booking.status].includes("cancel") && (
                <button
                  className='action-btn cancel'
                  onClick={() => handleAction("cancel")}
                >
                  Cancel Booking
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsModal;
