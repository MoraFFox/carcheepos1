/** @format */

import React, { useState, useEffect } from "react";
import "./MyAdsPage.css";
import PerformanceChart from "../../components/PerformanceChart/PerformanceChart";
import RacesChart from "../../components/RacesChart/RacesChart";
import "../../components/PerformanceChart.css";
import "../../components/RacesChart.css";
import SellerCarCard from "../../components/SellerCarCard/SellerCarCard";
import "../../components/SellerCarCard.css";
import carsData from "../db/db-cars.json"; // Assuming you might need this for context or future features

const MyAdsPage = () => {
  // State and effect moved from DashboardOverview
  const [userListings, setUserListings] = useState([]);

  useEffect(() => {
    // Simulate fetching user's listings (adjust as needed for actual data fetching)
    setUserListings(carsData.slice(0, 2)); // Example: using first 2 cars from db
  }, []);

  // Simulate performance data (adjust as needed)
  const listingPerformance = {
    views: Math.floor(Math.random() * 1000) + 50,
    likes: Math.floor(Math.random() * 200) + 10,
    clicks: Math.floor(Math.random() * 50) + 5,
  };

  return (
    <div className='my-ads-page'>
      <h1>My Advertisements</h1>

      {/* Content moved from DashboardOverview */}
      <div className='overview-seller-section'>
        {" "}
        {/* Reuse class or create new ones in MyAdsPage.css */}
        <h2>Seller Management Area</h2>
        <div className='seller-section-area seller-charts-area'>
          <RacesChart />
          <PerformanceChart />
        </div>
        <div className='seller-section-area seller-listings-area'>
          <h4>Your Posted Cars</h4>
          <div className='seller-listings-grid'>
            {userListings.length > 0 ? (
              userListings.map((car) => (
                <SellerCarCard
                  key={car.id}
                  id={car.id}
                  manifacture={car.manifacture} // Changed from manifacture
                  model={car.model}
                  price_usd={car.price_usd} // Changed from cost
                  year={car.year} // Added year
                  views={listingPerformance.views} // These are simulated, ensure car object has them if real
                  likes={listingPerformance.likes}
                  clicks={listingPerformance.clicks}
                  // status={car.status} // Pass status if available and needed by SellerCarCard
                />
              ))
            ) : (
              <p>You haven't posted any cars yet.</p>
            )}
          </div>
        </div>
        <div className='seller-section-area seller-slider-area'>
          <h4>Your Car Photos</h4>
          <p>Photo slider component will go here...</p>{" "}
          {/* Keep or replace placeholder */}
        </div>
        <div className='seller-section-area seller-upload-area'>
          <button className='upload-photos-button'>Upload More Photos</button>
        </div>
      </div>
    </div>
  );
};

export default MyAdsPage;
