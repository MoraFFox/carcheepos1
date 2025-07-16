/** @format */

import React from "react";
import { Link } from "react-router-dom";
import "./SellerCarCard.css";
import {
  PencilSquareIcon,
  TrashIcon,
  EyeIcon,
  HandThumbUpIcon,
  CursorArrowRaysIcon,
} from "@heroicons/react/24/outline";
import { getCarImage } from "../../utils/imageUtils"; // Import the shared utility

const OriginalSellerCarCard = ({
  id,
  manifacture, // Changed from manifacture
  model,
  price_usd, // Changed from cost
  year, // Added year
  // seats_km, // Optional: if you want to show seats
  // color, // Optional: if you want to show color
  views,
  likes,
  clicks,
  status = "active", // Accept status prop, default to 'active'
}) => {
  const imageUrl = getCarImage(manifacture); // Use manifacture for image lookup

  const handleEdit = () => {
    console.log(`Edit car: ${id}`);
    // TODO: Add navigation or modal logic for editing
  };

  const handleDelete = () => {
    console.log(`Delete car: ${id}`);
    // TODO: Add confirmation and delete logic
  };

  return (
    // Add conditional 'sold' class
    <div className={`seller-car-card ${status === "sold" ? "sold" : ""}`}>
      <div className='seller-card-img-container'>
        <img
          src={imageUrl}
          alt={`${manifacture} ${model}`}
          className='seller-card-img'
          loading='lazy' // Added lazy loading
        />
      </div>
      <div className='seller-card-content'>
        <h4 className='seller-card-title'>
          <span>{manifacture}</span>{" "}
          <span>
            {model} {year ? `(${year})` : ""}
          </span>
        </h4>
        <p className='seller-card-price'>
          ${price_usd ? price_usd.toLocaleString() : "N/A"}
        </p>
        {/* Conditionally render stats only if status is 'active' */}
        {status === "active" && (
          <div className='seller-card-stats'>
            <span title='Views'>
              <EyeIcon className='stat-icon' /> {views ?? "N/A"}
            </span>
            <span title='Likes'>
              <HandThumbUpIcon className='stat-icon' /> {likes ?? "N/A"}
            </span>
            <span title='Clicks'>
              <CursorArrowRaysIcon className='stat-icon' /> {clicks ?? "N/A"}
            </span>
          </div>
        )}
      </div>
      <div className='seller-card-actions'>
        {/* Conditionally render edit/delete only if status is 'active' */}
        {status === "active" && (
          <>
            <button
              onClick={handleEdit}
              className='action-button edit-button'
              aria-label='Edit Listing'
            >
              <PencilSquareIcon className='action-icon' />
            </button>
            {/* Remove the View link from inside the conditional block */}
            {/*<Link
              to={`/car/${id}`}
              className="action-button view-button"
              aria-label="View Listing"
            >
              View
            </Link>*/}
            <button
              onClick={handleDelete}
              className='action-button delete-button'
              aria-label='Delete Listing'
            >
              <TrashIcon className='action-icon' />
            </button>
          </>
        )}
        {/* Keep this View link - it should always be visible */}
        <Link
          to={`/car/${id}`}
          className='action-button view-button'
          aria-label='View Listing'
        >
          View
        </Link>
      </div>
    </div>
  );
};

const SellerCarCard = React.memo(OriginalSellerCarCard);
export default SellerCarCard;
