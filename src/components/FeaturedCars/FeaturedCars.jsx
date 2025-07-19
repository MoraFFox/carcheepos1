import React from "react";

import CarCard from "../CarCard/CarCard";
import "./FeaturedCars.css";

const FeaturedCars = ({ cars, onViewDetails, onContactSeller }) => {
  return (
    <section className="featured-cars">
      <div className="container-featured-cars">
        <div className="section-header">
          <h2 className="section-title">Featured Deals</h2>
          <p className="section-subtitle">
            Hand-picked cars with special offers and unbeatable prices
          </p>
        </div>
        <div className="cars-grid">
          {cars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              onViewDetails={() => onViewDetails(car.id)}
              onContactSeller={() => onContactSeller(car.id)}
            />
          ))}
        </div>
        <div className="section-cta">
          <button className="btn-primary-large">View All Cars</button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;
