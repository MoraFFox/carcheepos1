/** @format */

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCarById } from "../../utils/api";
import "./CarDetailPage.css";
import {
  EyeIcon,
  HandThumbUpIcon,
  CursorArrowRaysIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { getCarImage } from "../../utils/imageUtils";
import AICarSuggestions from "../../components/AICarSuggestions/AICarSuggestions";
const CarDetailPage = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRenting, setIsRenting] = useState(false); // Renamed for clarity

  useEffect(() => {
    const fetchCarData = async () => {
      if (!id) {
        setLoading(false);
        setError("No id provided.");
        return;
      }
      try {
        setLoading(true);
        const data = await getCarById(id);
        setCar(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCarData();
  }, [id]);

  if (loading) {
    return (
      <div className="car-detail-page">
        <p>Loading car details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="car-detail-page">
        <p>Error: {error}</p>
      </div>
    );
  }
  const {
    color,
    likeCount = 0,
    price: cost,
    currency,
    seller,
    status,
    location,
    description,
    features,
    createdAt,
    updatedAt,
    engine: { horsepower, cylinders, capacity_liters, fuelCapacity, fuelType },
    mileage_km,
    manifacture,
    model,
    capacity,
    year,
    transmission,
    seats,
    type,
    images,
  } = car || {};

  const currentUserId = "user123";
  const carSellerId = id || "sellerABC";
  const isSeller = currentUserId === carSellerId;

  // Simulate performance data for this car
  const performance = isSeller ? { views: 123, likes: 45, clicks: 12 } : null;

  if (!car) {
    return (
      <div className="car-detail-page">
        <p>Car not found!</p>
      </div>
    );
  }
  const handleRentNowClick = () => {
    setIsRenting(true);
    setIsRenting(false);
  };

  return (
    <div className="car-detail-page">
      <div className="car-detail-header">
        <img
          src={images[0]} // Assuming imageUrl is the primary image from car.images[0] or a generic one
          alt={`${manifacture} ${model}`}
          className="car-detail-image"
        />
        <div className="car-detail-title-section">
          <h1>
            {manifacture} {model}
          </h1>
          <div className="car-detail-meta">
            <span className="car-detail-mileage">
              {mileage_km ? `${mileage_km.toLocaleString()} km` : "N/A"}
            </span>
            <span className="car-detail-seats">
              <UserGroupIcon /> {seats ? `${seats} Seats` : "N/A"}
            </span>
            <span
              className={`car-detail-status status-${status?.toLowerCase()}`}
            >
              {status}
            </span>
          </div>
          {/* Assuming car.images contains an array of image URLs, use the first one or a placeholder */}
          {/* For simplicity, using the existing imageUrl from getCarImage. If specific images from car.images are needed, adjust here. */}
          <p className="car-detail-price">
            ${cost ? cost.toLocaleString() : "N/A"}
          </p>
          <button
            className="rent-button"
            onClick={handleRentNowClick}
            disabled={isRenting}
          >
            Rent Now
          </button>
        </div>
      </div>

      {isSeller && performance && (
        <div className="car-performance-metrics">
          <h2>Your Listing Performance</h2>
          <div className="metrics-container">
            <span title="Views">
              <EyeIcon className="metric-icon" /> Views: {performance.views}
            </span>
            <span title="Likes">
              <HandThumbUpIcon className="metric-icon" /> Likes:{" "}
              {performance.likes}
            </span>
            <span title="Clicks">
              <CursorArrowRaysIcon className="metric-icon" /> Clicks:{" "}
              {performance.clicks}
            </span>
          </div>
        </div>
      )}

      <div className="car-detail-section car-detail-general-info">
        <h2 className="section-title">General Information</h2>
        <ul>
          <li>
            <strong>ID:</strong> {id}
          </li>
          <li>
            <strong>Location:</strong>{" "}
            {location ? `${location.city}, ${location.country}` : "N/A"}
          </li>
          <li>
            <strong>Exterior Color:</strong> {color}
          </li>
          <li>
            <strong>Interior Color:</strong> {color}
          </li>
        </ul>
      </div>

      <div className="car-detail-section car-detail-engine-performance">
        <h2 className="section-title">Engine & Performance</h2>
        <ul>
          <li>
            <strong>Transmission:</strong> {transmission}
          </li>
          <li>
            <strong>Fuel Type:</strong> {fuelType}
          </li>
          {capacity_liters && cylinders && horsepower && (
            <>
              <li>
                <strong>Engine Capacity:</strong> {capacity_liters}L
              </li>
              <li>
                <strong>Cylinders:</strong> {cylinders}
              </li>
              <li>
                <strong>Horsepower:</strong> {horsepower} hp
              </li>
            </>
          )}
        </ul>
      </div>

      <div className="car-detail-section car-detail-availability">
        <h2 className="section-title">Availability</h2>
        <ul>
          <li>
            <strong>Posted On:</strong> {createdAt}
          </li>
          <li>
            <strong>Last Updated:</strong> {updatedAt}
          </li>
        </ul>
      </div>

      {features && (
        <div className="car-detail-section car-detail-features">
          <h2 className="section-title">Features</h2>
          {Object.entries(features).map(([category, features]) => {
            return (
              features.length > 0 && (
                <ul key={category}>
                  <li className="feature-category">
                    <strong>{category}</strong>
                  </li>
                  {Array.isArray(features) &&
                    features.map((feature) => {
                      return (
                        <li key={feature} className="feature-item">
                          <span className="feature-icon"></span>
                          {feature}
                        </li>
                      );
                    })}
                </ul>
              )
            );
          })}
        </div>
      )}

      <div className="car-detail-section car-detail-description">
        <h2 className="section-title">Description</h2>
        <p>{description || "No description available."}</p>
      </div>

      {/* Independent AI-powered car suggestions section */}
      <section className="ai-suggestions-section">
        <AICarSuggestions car={car} />
      </section>
    </div>
  );
};

export default CarDetailPage;
