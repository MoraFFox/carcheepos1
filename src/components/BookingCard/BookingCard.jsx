/** @format */

import React from "react";
import {
  FaCar,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUser,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import "./BookingCard.css";
import { getCarImage } from "../../utils/imageUtils";

const statusColors = {
  pending: "#ffd700",
  confirmed: "#4CAF50",
  completed: "#2196F3",
  cancelled: "#f44336",
  "pending-approval": "#ff9800",
};
const statusColorGradient = {
  pending:
    "linear-gradient(90deg,rgba(255, 215, 0, 1) 0%, rgb(87, 199, 165) 100%)",
  confirmed:
    "linear-gradient(90deg,rgba(76, 202, 80, 1) 0%, rgb(175, 199, 87) 100%)",
  completed:
    "linear-gradient(90deg,rgba(33, 150, 243, 1) 0%, rgba(87, 199, 133, 1) 100%)",
  cancelled:
    "linear-gradient(90deg,rgba(247, 70, 57, 1) 0%, rgba(87, 136, 199, 1) 100%)",
  "pending-approval":
    "linear-gradient(90deg,rgba(255, 152, 0, 1) 25%, rgba(255, 0, 89, 1) 100%)",
};

const BookingCard = ({
  type = "renter",
  status = "pending",
  onClick,
  booking = {
    id: "1234",
    car: {
      manifacture: "Toyota",
      model: "Camry",
      year: "2022",
      image: "/path/to/image.jpg",
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
  },
}) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div
      className={`booking-card ${
        type === "seller" ? "booking-card--seller" : ""
      }`}
      onClick={onClick}
      role='button'
      tabIndex={0}
      onKeyPress={(e) => e.key === "Enter" && onClick()}
    >
      <div
        className='booking-card__status'
        style={{
          background: statusColors[status],
          background: statusColorGradient[status],
        }}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </div>

      <div className='booking-card__content'>
        <div className='booking-card__image-section'>
          <img
            src={getCarImage(booking.car.manifacture)}
            alt={`${booking.car.manifacture} ${booking.car.model}`}
            className='booking-card__image'
          />
        </div>

        <div className='booking-card__details'>
          <h3 className='booking-card__title'>
            {booking.car.manifacture} {booking.car.model} {booking.car.year}
          </h3>

          <div className='booking-card__info-grid'>
            <div className='booking-card__info-item'>
              <FaCalendarAlt />
              <span>
                {formatDate(booking.dates.start)} -{" "}
                {formatDate(booking.dates.end)}
              </span>
            </div>

            <div className='booking-card__info-item'>
              <FaMapMarkerAlt />
              <span>{booking.location}</span>
            </div>

            <div className='booking-card__info-item'>
              <FaCar />
              <span>Booking #{booking.id}</span>
            </div>
          </div>

          <div className='booking-card__contact'>
            <h4>Contact Information</h4>
            <div className='booking-card__contact-grid'>
              <div className='booking-card__contact-item'>
                <FaUser />
                <span>{booking.contact.name}</span>
              </div>
              <div className='booking-card__contact-item'>
                <FaPhoneAlt />
                <span>{booking.contact.phone}</span>
              </div>
              <div className='booking-card__contact-item'>
                <FaEnvelope />
                <span>{booking.contact.email}</span>
              </div>
            </div>
          </div>

          <div className='booking-card__footer'>
            <div className='booking-card__price'>
              <span className='booking-card__price-label'>Offer</span>
              <span className='booking-card__price-amount'>
                ${booking.price}
              </span>
            </div>
            <div className='booking-card__view-details'>
              <span>Click to view details</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
