import React from "react";

const CarResult = ({ car }) => {
  if (!car) {
    return (
      <div className="no-result">
        <h1>No cars match your criteria</h1>
      </div>
    );
  }

  return (
    <div className="car-result-card">
      <img src={car.image} alt={car.model} className="car-image" />
      <div className="car-info">
        <h2>{car.make} {car.model}</h2>
        <p>${car.price.toLocaleString()}</p>
        <p>{car.mpg} MPG • {car.seats} seats • {car.type}</p>
      </div>
    </div>
  );
};

export default CarResult;
