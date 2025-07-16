/** @format */

import React, { useState } from "react";
import "./DashboardOverview.css";
import StatsCard from "../../components/StatsCard"; // Import the new StatsCard component
import "../../components/StatsCard.css"; // Import its CSS
import carsData from "../../db/db-cars.json";
import { Link } from "react-router-dom"; // Import Link for navigation
import {
  DocumentTextIcon,
  EyeIcon,
  CheckCircleIcon,
  ArrowRightIcon, // For the link button
} from "@heroicons/react/24/outline"; // Import icons
import SellerCarCard from "../../components/SellerCarCard"; // Import SellerCarCard for preview
import "../../components/SellerCarCard.css"; // Import its CSS

function DashboardOverview() {
  const [isSeller, setIsSeller] = useState(true); // Simulate seller status
  const simulatedUserId = "user123"; // Simulate a logged-in user ID

  // Simulate fetching only the first few ads for the current user for preview
  const userListingsPreview = carsData
    // .filter((car) => car.sellerId === simulatedUserId) // sellerId might be nested: car.seller.id
    .filter((car) => car.seller && car.seller.id === simulatedUserId) // Adjusted for new schema
    .slice(0, 2); // Show max 2 cards in preview (was 3, corrected comment)

  return (
    <div className='dashboard-overview'>
      <h2>Dashboard Overview</h2>

      <div className='overview-section quick-stats-section'>
        <h3>Quick Stats</h3>
        <div className='stats-cards-container'>
          <StatsCard
            label='Total Listings'
            value={carsData.length}
            icon={<DocumentTextIcon />}
          />
          <StatsCard
            label='Active Ads'
            value={12} // Simulated value
            icon={<CheckCircleIcon />}
          />
          <StatsCard
            label='Total Views'
            value='1.2K' // Simulated value
            icon={<EyeIcon />}
          />
          {/* Add more StatsCard components as needed */}
        </div>
      </div>

      {/* Section for My Ads Preview */}
      {isSeller && userListingsPreview.length > 0 && (
        <div className='overview-section my-ads-preview-section'>
          <h3>My Recent Ads</h3>
          <div className='seller-listings-grid preview-grid'>
            {userListingsPreview.map((car) => {
              // Map to the new props expected by SellerCarCard
              const cardProps = {
                id: car.id,
                manifacture: car.manifacture,
                model: car.model,
                price_usd: car.price_usd,
                year: car.year,
                // Add views, likes, clicks if available in car object or from another source
                // views: car.views,
                // likes: car.likes,
                // clicks: car.clicks,
                status: car.status === "available" ? "active" : car.status, // Example mapping
              };
              return <SellerCarCard key={car.id} {...cardProps} />;
            })}
          </div>
          <Link to='/my-ads' className='view-all-ads-link'>
            View All My Ads <ArrowRightIcon />
          </Link>
        </div>
      )}
    </div>
  );
}

export default DashboardOverview;
