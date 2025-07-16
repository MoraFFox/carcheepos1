/** @format */

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  HeartIcon,
  MapPinIcon,
  CalendarIcon,
  ChevronDownIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { Cog6ToothIcon, FireIcon } from "@heroicons/react/20/solid";
import CarCard from "../../components/CarCard/CarCard"; // Import the CarCard component
import { getCarImage } from "../../utils/imageUtils"; // Import the utility function
import "./HomePage.css";
import mercedesImg from "../../assets/mercedes.svg"; // Keep for hero image
import fordImg from "../../assets/ford.svg"; // Keep for initial popular car state

const HomePage = () => {
  const [popularCars, setPopularCars] = useState([
    {
      id: "WBASP4C55BC394788",
      manifacture: "Ford",
      model: 1987,
      city: "Rýmařov",
      phone: "239-744-7495",
      cost: "$13.99",
      imageUrl: fordImg,
      description: "A reliable classic with surprising fuel efficiency.",
    },
  ]);

  useEffect(() => {
    fetch("https://my.api.mockaroo.com/car_data.json?key=ea05faa0")
      .then((res) => res.json())
      .then((data) => {
        // Combine initial car with fetched data and update state
        setPopularCars((prevCars) => [...prevCars, ...data]);
      })
      .catch((error) => {
        console.error("Error fetching car data:", error);
      });
  }, []); // Empty dependency array ensures this runs only once on mount

  console.log(popularCars);
  return (
    <div className='homepage-container'>
      {/* Hero Section */}
      <section className='hero-section'>
        <div className='hero-bg'></div>
        <div className='hero-content'>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h1 className='hero-title'>The Best Platform for Car Rental</h1>
            <p className='hero-desc'>
              We open the door for you to explore the world in comfort and
              style. Being your trusted travel partner.
            </p>
            <div className='hero-search'>
              <div style={{ flex: 1, minWidth: 0 }}>
                <label className='hero-search-label'>
                  <MapPinIcon
                    style={{
                      height: 20,
                      width: 20,
                      color: "#2962FF",
                      marginRight: 4,
                    }}
                  />
                  Where
                </label>
                <input
                  type='text'
                  placeholder='City Or Destination'
                  className='hero-search-input'
                />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <label className='hero-search-label'>
                  <CalendarIcon
                    style={{
                      height: 20,
                      width: 20,
                      color: "#2962FF",
                      marginRight: 4,
                    }}
                  />
                  Pickup
                </label>
                <input
                  type='text'
                  placeholder='Date & Time'
                  className='hero-search-input'
                />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <label className='hero-search-label'>
                  <CalendarIcon
                    style={{
                      height: 20,
                      width: 20,
                      color: "#2962FF",
                      marginRight: 4,
                    }}
                  />
                  Drop-Off
                </label>
                <input
                  type='text'
                  placeholder='Date & Time'
                  className='hero-search-input'
                />
              </div>
              <button className='hero-search-btn'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  style={{ width: 24, height: 24 }}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className='hero-img-container' style={{ flex: 1, minWidth: 0 }}>
            {/* Revert hero image path as well */}
            <img src={mercedesImg} alt='Featured Car' className='hero-img' />
          </div>
        </div>
      </section>
      {/* Sponsor Logos */}
      <section className='sponsor-section'>
        {["HONDA", "BENTLEY", "PEUGEOT", "HYUNDAI"].map((brand, idx) => (
          <span key={brand + idx} className='sponsor-brand'>
            {brand}
          </span>
        ))}
      </section>
      {/* Popular Cars Section */}
      <section className='popular-section'>
        <h2 className='popular-title'>Our Popular Car</h2>
        {popularCars.map((car) => (
          <CarCard
            key={car.id}
            {...car}
            imageUrl={car.imageUrl || getCarImage(car.manifacture)}
            description={car.description || "No description available"}
          />
        ))}
      </section>
      {/* Recommendation Section */}
      <section className='section'>
        <h2 className='section-title'>Recommendation Car</h2>
        <div className='section-placeholder'>
          Recommendation Car Section Placeholder
        </div>
      </section>
      {/* Journey/Blog Section */}
      <section className='section'>
        <h2 className='section-title'>Embark on a Journey...</h2>
        <div className='section-placeholder'>Blog/Info Section Placeholder</div>
      </section>
    </div>
  );
};

export default HomePage;
