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
import automatic from "../../assets/A.svg";
import manual from "../../assets/M.svg";
import gastank from "../../assets/gas.svg";
import { SiFueler } from "react-icons/si";
import AuthContext from "../../context/AuthContext/AuthContext";
import { isidLiked, addLikedid, removeLikedid } from "../../utils/likedCars";
import { useContext } from "react";
import { useFavorites } from "../../context/FavoritesContext/FavoritesContext";
const CarCard = React.memo((car) => {
  const {likedIds, setLikedIds, setFavorites, favorites} = useFavorites();
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
              {manifacture} {model}
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
            <img src={gastank} width='18px' alt='Fuel capacity' />
            <span>{fuelcapacity ? `${fuelcapacity}L` : "N/A"}</span>
          </div>
          <div className='car-card__spec-item'>
            <img
              src={transmission === "Automatic" ? automatic : manual}
              width='20px'
              alt={transmission}
            />
            <span>{transmission || "N/A"}</span>
          </div>
          <div className='car-card__spec-item'>
            <SiFueler />
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
