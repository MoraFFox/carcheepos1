import React from "react";
import { Calendar, MapPin, Star } from "lucide-react";

import { formatPrice } from "../../utils/theme";

const CarCard = ({ car, onViewDetails, onContactSeller }) => {
  return (
    <div className="car-card">
      <div className="car-image-container">
        <img
          src={car.image}
          alt={`${car.year} ${car.make} ${car.model}`}
          className="car-image"
        />
        {car.badge && (
          <span
            className={`car-badge ${
              car.badge.includes("OFF") ? "discount" : ""
            }`}
          >
            {car.badge}
          </span>
        )}
      </div>
      <div className="car-info">
        <div className="car-header">
          <h3 className="car-title">
            {car.year} {car.make} {car.model}
          </h3>
          <div className="car-rating">
            <Star className="star-icon" />
            <span>{car.rating}</span>
          </div>
        </div>
        <div className="car-details">
          <div className="detail-item">
            <Calendar className="detail-icon" />
            <span>{car.mileage}</span>
          </div>
          <div className="detail-item">
            <MapPin className="detail-icon" />
            <span>{car.location}</span>
          </div>
        </div>
        <div className="car-price-section">
          <div className="price-container">
            <span className="current-price">{formatPrice(car.price)}</span>
            {car.originalPrice && (
              <span className="original-price">
                {formatPrice(car.originalPrice)}
              </span>
            )}
          </div>
          <p className="dealer-name">by {car.dealer}</p>
        </div>
        <div className="car-actions">
          <button className="btn-secondary" onClick={onViewDetails}>
            View Details
          </button>
          <button className="btn-primary" onClick={onContactSeller}>
            Contact Seller
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
