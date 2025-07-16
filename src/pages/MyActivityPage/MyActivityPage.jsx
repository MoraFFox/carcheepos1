/** @format */

import React, { useState, useEffect } from "react";
import "./MyActivityPage.css";
import PerformanceChart from "../../components/PerformanceChart/PerformanceChart";
import RacesChart from "../../components/RacesChart/RacesChart";
import SellerCarCard from "../../components/SellerCarCard/SellerCarCard";
import { getUserCars } from "../../utils/api";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";
const MyActivityPage = () => {
  const [userListings, setUserListings] = useState([]);
  const [soldListings, setSoldListings] = useState([]); // Placeholder for sold cars
  const [activeTab, setActiveTab] = useState("active"); // 'active', 'sold'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [carsData, setCarsData] = useState([]);
  const { isAuthenticated } = useContext(AuthContext);
  const fetchCars = async () => {
    try {
      setLoading(true);
      const data = await getUserCars();
      setCarsData(data); // Ensure we always have an array
    } catch (err) {
      console.error('Error fetching cars:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
 useEffect(() => {
    fetchCars();
  }, []);
  useEffect(() => {
    setUserListings(carsData.slice(0, 2)); 
    setSoldListings(carsData.slice(2, 4)); 
  }, [carsData]);

  // Simulate performance data (adjust as needed)
  const listingPerformance = {
    views: Math.floor(Math.random() * 1000) + 50,
    likes: Math.floor(Math.random() * 200) + 10,
    clicks: Math.floor(Math.random() * 50) + 5,
  };

  return (
    <div className='my-activity-page'>
      {" "}
      {/* Changed class name */}
      <h1>My Activity</h1>
      {/* Content based on active tab */}
      <div className='tab-content'>
        {activeTab === "active" && (
          <div className='seller-section-area seller-listings-area'>
            <h4>Your Posted Cars</h4>
            <div className='seller-listings-grid'>
              {userListings.length > 0 ? (
                userListings.map((car) => (
                  console.log(car),
                  <SellerCarCard
                    key={car._id + "-active"} // Ensure unique key
                    id={car._id}
                    manifacture={car.manifacture} // Changed from manifacture
                    model={car.model}
                    price_usd={car.price} // Changed from cost
                    year={car.year} // Added year
                    views={listingPerformance.views} // Maybe fetch real stats per car
                    likes={listingPerformance.likes}
                    clicks={listingPerformance.clicks}
                    status='active' // Pass status prop
                  />
                ))
              ) : (
                <p>You haven't posted any cars yet.</p>
              )}
            </div>
          </div>
        )}
      </div>
      {/* Other sections like Charts, Photos can remain or be moved/adjusted */}
      {/* For simplicity, let's keep them outside the tabs for now */}
      <div className='overview-seller-section'>
        <h2>Performance Overview</h2>
        <div className='seller-section-area seller-charts-area'>
          <RacesChart />
          <PerformanceChart />
        </div>
        {/* Photo sections might relate more to active listings? */}
        {/* Consider moidg these inside the 'active' tab if appropriate */}
        {/* <div className="seller-section-area seller-slider-area">
          <h4>Your Car Photos</h4>
          <p>Photo slider component will go here...</p>
        </div>
        <div className="seller-section-area seller-upload-area">
          <button className="upload-photos-button">Upload More Photos</button>
        </div> */}
      </div>
    </div>
  );
};

export default MyActivityPage;
