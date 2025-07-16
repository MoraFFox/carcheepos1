/** @format */

import React, { useState, useEffect } from "react";
import "./CarGrid.css";
import CarCard from "../CarCard/CarCard";
import { getAllCars } from "../../utils/api";

const CarGrid = ({ filters = {} }) => {
  const [carsData, setCarsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const data = await getAllCars();
        setCarsData(data || []); // Ensure we always have an array
      } catch (err) {
        console.error('Error fetching cars:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) {
    return (
      <div className='car-grid'>
        <p className='car-grid__loading'>Loading cars...</p>
      </div>
    );
  }


  if (error) {
    return (
      <div className='car-grid'>
        <p className='car-grid__error'>Error: {error}</p>
      </div>
    );
  }

  if (!carsData || !Array.isArray(carsData)) {
    return (
      <div className='car-grid'>
        <p className='car-grid__no-data'>No car data available</p>
      </div>
    );
  }

  const {
    manifacture: filtermanifacture,
    minPrice,
    maxPrice,
    transmission: filterTransmission,
    color: filterColor,
    minYear,
    maxYear,
  } = filters;


  const filteredCars = carsData.filter((car) => {
    if (!car || typeof car !== 'object') {
      return false;
    }

    const carPrice = parseFloat(car.cost || car.car_card?.price || 0);
    const carYear = parseInt(car.year || 0, 10);

    if (minPrice !== undefined && !isNaN(carPrice) && carPrice < minPrice) return false;
    if (maxPrice !== undefined && !isNaN(carPrice) && carPrice > maxPrice) return false;
    if (
      filtermanifacture && car.manifacture &&
      car.manifacture.toLowerCase() !== filtermanifacture.toLowerCase()
    )
      return false;
    if (filterTransmission && car.car_card?.details?.transmission !== filterTransmission)
      return false;
    if (
      filterColor && car.color?.exterior &&
      car.color.exterior.toLowerCase() !== filterColor.toLowerCase()
    )
      return false;
    if (minYear !== undefined && !isNaN(carYear) && carYear < minYear) return false;
    if (maxYear !== undefined && !isNaN(carYear) && carYear > maxYear) return false;

    return true;
  });
  if (filteredCars.length === 0) {
    return (
      <div className='car-grid'>
        <p className='car-grid__no-cars-message'>No cars match your filters</p>
      </div>
    );
  }

  return (
    <div className='car-grid'>
      {filteredCars
        .slice(0, 100)
        .map(
          (car) =>  (<CarCard key={car._id} car={car} />)
        )}
    </div>
  );
};

export default CarGrid;
