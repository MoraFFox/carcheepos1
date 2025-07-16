/** @format */

import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

/* ----------------------------- Hero Section ----------------------------- */
function HeroSection() {
  return (
    <section className="hero">
      <div className="hero__overlay">
        <h1 className="hero__title">Find Your Next Car</h1>
        <p className="hero__subtitle">Search thousands of verified listings.</p>
        <form
          className="hero__search"
          onSubmit={(e) => {
            e.preventDefault();
            // TODO: hook into search page or context
          }}>
          <input
            className="hero__input"
            type="text"
            placeholder="Search by Make, Model, Year..."
          />
          <button className="hero__button" type="submit">
            Search
          </button>
        </form>
      </div>
    </section>
  );
}

/* -------------------------- Featured Listings --------------------------- */
function FeaturedListings() {
  // Placeholder data – replace with API call later
  const cars = [
    {
      id: 1,
      title: "2021 Toyota Camry",
      price: "$22,900",
      img: "https://via.placeholder.com/300x180?text=Toyota+Camry",
    },
    {
      id: 2,
      title: "2019 Honda Civic",
      price: "$17,500",
      img: "https://via.placeholder.com/300x180?text=Honda+Civic",
    },
    {
      id: 3,
      title: "2020 Ford F-150",
      price: "$29,800",
      img: "https://via.placeholder.com/300x180?text=Ford+F-150",
    },
  ];

  return (
    <section className="featured">
      <h2 className="section__title">Featured Listings</h2>
      <div className="featured__grid">
        {cars.map((car) => (
          <Link to={`/car/${car.id}`} className="car-card" key={car.id}>
            <img src={car.img} alt={car.title} className="car-card__img" />
            <div className="car-card__info">
              <h3>{car.title}</h3>
              <p>{car.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* --------------------------- How It Works ------------------------------ */
function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: "Search Cars",
      description: "Find the perfect car using our powerful search.",
    },
    {
      id: 2,
      title: "Compare Options",
      description: "Review photos, specs, and prices to choose wisely.",
    },
    {
      id: 3,
      title: "Contact Seller",
      description: "Message the seller or book a test drive instantly.",
    },
  ];

  return (
    <section className="how">
      <h2 className="section__title">How It Works</h2>
      <div className="how__steps">
        {steps.map((step) => (
          <div key={step.id} className="how__step">
            <span className="how__number">{step.id}</span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------ Browse By Category --------------------------- */
function BrowseByCategory() {
  const categories = [
    { id: "suv", label: "SUV" },
    { id: "sedan", label: "Sedan" },
    { id: "truck", label: "Truck" },
    { id: "coupe", label: "Coupe" },
    { id: "hatchback", label: "Hatchback" },
  ];

  return (
    <section className="browse">
      <h2 className="section__title">Browse by Category</h2>
      <div className="browse__grid">
        {categories.map((cat) => (
          <Link key={cat.id} to={`/cars?bodyType=${cat.id}`} className="browse__item">
            {cat.label}
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------- Home ---------------------------------- */
export default function Home() {
  return (
    <main className="home">
      <HeroSection />
      <FeaturedListings />
      <HowItWorks />
      <BrowseByCategory />
    </main>
  );
}
