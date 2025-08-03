/** @format */

import React, { useState } from "react";
import {
  HeartIcon,
  UserGroupIcon, // Capacity
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid"; // Solid heart for liked state
import "./CarCard.css"; // Import the component-specific CSS
import { getCarImage } from "../../utils/imageUtils"; // Import the shared utility

// Import other necessary images (transmission, fuel icons)
import Automatic from "../../assets/icons/A.jsx";
import Manual from "../../assets/icons/M.jsx";
import { Gas } from "../../assets/icons/index.jsx";
import { SiFueler } from "react-icons/si";
import AuthContext from "../../context/AuthContext/AuthContext";
import { isidLiked, addLikedid, removeLikedid } from "../../utils/likedCars";
import { useContext } from "react";
import { useFavorites } from "../../context/FavoritesContext/FavoritesContext";
const CarCard = React.memo((car) => {
  const { likedIds, setLikedIds, setFavorites, favorites } = useFavorites();
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const cars = car.car || car; // Handle both {car: carData} and direct carData

  // Use optional chaining and default values to prevent errors with missing data
  const {
    seats = "0",
    transmission = "Unknown",
    price: cost = 0,
    _id: id = "unknown",
    color = {},
    performance = {},
    status = "unknown",
    location = {},
    description = "",
    car_features = {},
    engine = {},
    mileage_km = 0,
    manifacture = "Unknown", // This will be car.manifacture from db
    model = "Unknown", // This is car.model from db (e.g., "Camry")
    capacity = 0,
    year = "",
    car_card = {},
    isFeatured = false,
    LikedCount = 0,
    liked = false,
  } = cars;
  // Destructure nested objects with defaults
  const { exterior = "", interior = "" } = color || {};
  const { views = 0, likes = 0, clicks = 0 } = performance || {};
  const {
    horsepower = 0,
    cylinders = 0,
    capacity_liters = 0,
    fuelcapacity = 0,
    fuelType = "Unknown",
  } = engine || {};
  const {
    currency = "USD",

    type = "",
    details = {},
  } = car_card || {};

  const imageUrl = getCarImage(manifacture);

  // Use context for liked state
  const isLiked = likedIds.includes(id);
  const [isBeating, setIsBeating] = useState(false); // State for animation
  const handleLikeClick = () => {
    let newLikedIds;
    if (!isLiked) {
      // Liked: add to localStorage and context
      addLikedid(id);
      newLikedIds = Array.from(new Set([...likedIds, id]));
      setIsBeating(true);
      setTimeout(() => setIsBeating(false), 500);
    } else {
      // Unliked: remove from localStorage and context
      removeLikedid(id);
      newLikedIds = likedIds.filter((likedId) => likedId !== id);
    }
    setLikedIds(newLikedIds);
  };
  const onBuyNowClick = () => {
    setAuth({ cars });

    // Add your buy now logic here
    navigate(`/car/${id}`);
  };

  return (
    <div className={`car-card ${isLiked ? "car-card--liked" : ""}`}>
      {/* Image Section - Placed first for flex order in liked state */}
      <div className='car-card__image-section'>
        <div className='car-card__imgbox'>
          <img
            src={imageUrl}
            alt={`${manifacture} ${model}`}
            className={`car-card__img ${
              manifacture && manifacture.toLowerCase() === "gmc"
                ? "car-card__img--gmc-adjust"
                : ""
            }; `}
            loading='lazy'
          />
        </div>
        {/* Specs overlay is now part of details, removed from here */}
      </div>

      {/* Details Section - Wraps Header, Specs, Footer */}
      <div className='car-card__details'>
        {/* Top section: Title, Type, Heart Icon */}
        <div className='car-card__header'>
          <div>
            <h3 className='car-card__headline'>
              {manifacture.toUpperCase()} {model}
            </h3>
            {/* Display year if available, or remove type if it's redundant with model */}
            <p className='car-card__type'>{year}</p>
          </div>
          <button
            className={`car-card__like-btn ${
              isLiked ? "car-card__like-btn--liked" : ""
            } ${isBeating ? "car-card__like-btn--beating" : ""}`}
            onClick={handleLikeClick}
            aria-label={isLiked ? "Unlike" : "Like"}
          >
            {isLiked ? <HeartIconSolid /> : <HeartIcon />}
          </button>
        </div>

        {/* Specs overlay - Moved inside details */}
        <div className='car-card__specs-overlay'>
          <div className='car-card__spec-item'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              class='bi bi-fuel-pump-fill'
              viewBox='0 0 16 16'
            >
              <path
                fill='currentColor'
                d='M1 2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v8a2 2 0 0 1 2 2v.5a.5.5 0 0 0 1 0V8h-.5a.5.5 0 0 1-.5-.5V4.375a.5.5 0 0 1 .5-.5h1.495c-.011-.476-.053-.894-.201-1.222a.97.97 0 0 0-.394-.458c-.184-.11-.464-.195-.9-.195a.5.5 0 0 1 0-1q.846-.002 1.412.336c.383.228.634.551.794.907.295.655.294 1.465.294 2.081V7.5a.5.5 0 0 1-.5.5H15v4.5a1.5 1.5 0 0 1-3 0V12a1 1 0 0 0-1-1v4h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1zm2.5 0a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5v-5a.5.5 0 0 0-.5-.5z'
              />
            </svg>
            <span>{fuelcapacity ? `${fuelcapacity}L` : "N/A"}</span>
          </div>
          <div className='car-card__spec-item'>
            {transmission === "Automatic" ? (
              <svg
                id='Layer_1'
                data-name='Layer 1'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 83.65 122.88'
              >
                <title>automatic-transmission</title>
                <path
                  fill='currentColor'
                  d='M14.87,66.42h5.45V11.05A11.06,11.06,0,0,1,31.37,0h4.95a11.06,11.06,0,0,1,11,11.05V66.42h5.49a3.83,3.83,0,0,1,3.82,3.82V89.63a3.83,3.83,0,0,1-3.82,3.82H47.37v18.38a11.06,11.06,0,0,1-11,11H31.37a11.06,11.06,0,0,1-11-11V93.45H14.87a3.82,3.82,0,0,1-3.81-3.82V87.84H5.8a5.78,5.78,0,0,1-4.09-1.7h0A5.77,5.77,0,0,1,0,82.05V77.82a5.75,5.75,0,0,1,1.7-4.08h0A5.78,5.78,0,0,1,5.8,72h5.26V70.24a3.82,3.82,0,0,1,3.81-3.82Zm10,0h5.59V43.93c0-4.38,6.77-4.38,6.77,0V66.42H42.8V11.05a6.5,6.5,0,0,0-6.48-6.48H31.37a6.52,6.52,0,0,0-6.48,6.48V66.42Zm17.91,27H24.89v18.38a6.52,6.52,0,0,0,6.48,6.48h4.95a6.5,6.5,0,0,0,6.48-6.48V93.45ZM55.14,17.64V14.11h7.19v3.53Zm14.64,4.88V5.5h7.47A8.52,8.52,0,0,1,79,5.69a4.12,4.12,0,0,1,1.69.8A4.19,4.19,0,0,1,82,8.33a9.11,9.11,0,0,1,.47,3.26A10,10,0,0,1,82,14.9a4.43,4.43,0,0,1-1.2,1.88,3.8,3.8,0,0,1-1.59.85,6.57,6.57,0,0,1-1.68.22c-.29,0-.59,0-.91-.05s-.62-.07-.91-.12l-.83-.16-.63-.13v5.13Zm4.45-8.66H76.8a1,1,0,0,0,.72-.25,1.47,1.47,0,0,0,.37-.75,6.72,6.72,0,0,0,.1-1.22,4.45,4.45,0,0,0-.13-1.19,1.53,1.53,0,0,0-.38-.73.92.92,0,0,0-.68-.24H74.23v4.38Zm-19.09,36V46.29h7.19v3.53ZM69.78,54.7v-17h7.27a7.43,7.43,0,0,1,2.06.28,3.84,3.84,0,0,1,1.63.93,4.22,4.22,0,0,1,1.06,1.75,8.41,8.41,0,0,1,.38,2.77A8.24,8.24,0,0,1,82,45.24a4.85,4.85,0,0,1-.49,1.31,3.35,3.35,0,0,1-.74.91,5.65,5.65,0,0,1-.9.64l2.95,6.6H78.31l-2.38-5.86h-1.7V54.7Zm4.45-9.39h2a1.83,1.83,0,0,0,.64-.11,1.18,1.18,0,0,0,.47-.33,1.43,1.43,0,0,0,.28-.58,3.13,3.13,0,0,0,.1-.86,3,3,0,0,0-.1-.85,1.16,1.16,0,0,0-.28-.54,1.2,1.2,0,0,0-.47-.29,2.11,2.11,0,0,0-.64-.09h-2v3.65ZM69.69,86.88v-17h3.53l6,9.49V69.85h4.45v17H80.12l-6-9.49v9.49Zm.09,32.18V102H77.3a6.38,6.38,0,0,1,3,.65,5,5,0,0,1,1.88,1.82,8,8,0,0,1,1,2.72,19.33,19.33,0,0,1,.28,3.33,14.54,14.54,0,0,1-.68,4.87,5.21,5.21,0,0,1-2,2.75,6.23,6.23,0,0,1-3.45.89Zm4.45-4h2.61a1.78,1.78,0,0,0,1.32-.46,2.65,2.65,0,0,0,.66-1.45,14.11,14.11,0,0,0,.2-2.61,15.38,15.38,0,0,0-.15-2.41,3.66,3.66,0,0,0-.44-1.37,1.34,1.34,0,0,0-.68-.6,2.59,2.59,0,0,0-.91-.15H74.23v9Zm-19.09-.89v-3.53h7.19v3.53ZM11.06,83.88V76H5.8a1.83,1.83,0,0,0-1.29.53h0A1.82,1.82,0,0,0,4,77.82v4.23a1.82,1.82,0,0,0,.53,1.29h0a1.8,1.8,0,0,0,1.29.54Z'
                />
              </svg>
            ) : (
              <Manual className='transmission-icon' />
            )}
            <span>{transmission || "N/A"}</span>
          </div>
          <div className='car-card__spec-item'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              class='bi bi-ev-front'
              viewBox='0 0 16 16'
            >
              <path
                fill='currentColor'
                d='M9.354 4.243a.19.19 0 0 0-.085-.218.186.186 0 0 0-.23.034L6.051 7.246a.188.188 0 0 0 .136.316h1.241l-.673 2.195a.19.19 0 0 0 .085.218c.075.043.17.03.23-.034l2.88-3.187a.188.188 0 0 0-.137-.316H8.572z'
              />
              <path
                fill='currentColor'
                d='M4.819 2A2.5 2.5 0 0 0 2.52 3.515l-.792 1.848a.8.8 0 0 1-.38.404c-.5.25-.855.715-.965 1.262L.05 8.708a2.5 2.5 0 0 0-.049.49v.413c0 .814.39 1.543 1 1.997V13.5a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-1.338c1.292.048 2.745.088 4 .088s2.708-.04 4-.088V13.5a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-1.892c.61-.454 1-1.183 1-1.997v-.413q0-.248-.049-.49l-.335-1.68a1.8 1.8 0 0 0-.964-1.261.8.8 0 0 1-.381-.404l-.792-1.848A2.5 2.5 0 0 0 11.181 2H4.82ZM3.44 3.91A1.5 1.5 0 0 1 4.82 3h6.362a1.5 1.5 0 0 1 1.379.91l.792 1.847a1.8 1.8 0 0 0 .853.904c.222.112.381.32.43.564l.336 1.679q.03.146.029.294v.413a1.48 1.48 0 0 1-1.408 1.484c-1.555.07-3.786.155-5.592.155s-4.037-.084-5.592-.155A1.48 1.48 0 0 1 1 9.611v-.413q0-.148.03-.294l.335-1.68a.8.8 0 0 1 .43-.563c.383-.19.685-.511.853-.904z'
              />
            </svg>
            <span>{fuelType ? `${fuelType}` : ""}</span>
          </div>
          {/* Capacity display needs to be updated based on where 'capacity' info comes from in new schema */}
          {/* For now, let's assume seats is a good replacement or addition */}
          <div className='car-card__spec-item'>
            <UserGroupIcon />{" "}
            {/* Using UserGroupIcon as a placeholder for seats or other spec */}
            <span>{seats ? `${seats} ` : "N/A"}</span>
          </div>
        </div>

        {/* Bottom section: Price and Button */}
        <div className='car-card__footer'>
          <div className='car-card__pricebox'>
            <span className='car-card__price'>${cost}</span>
          </div>
          <button onClick={onBuyNowClick} className='car-card__btn'>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}); // Ensure this closing part is correct

export default CarCard;
