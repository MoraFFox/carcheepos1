/** @format */

import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import FeaturedCars from "../../components/FeaturedCars/FeaturedCars";
import WhyChooseUs from "../../components/WhyChooseUs/WhyChooseUs";
import Testimonials from "../../components/Testimonials/Testimonials";
import Footer from "../../components/Footer/Footer";
import "./LandingPage.css";

const mockCars = [
  {
    id: 1,
    image: "https://via.placeholder.com/300x200",
    year: 2022,
    make: "Toyota",
    model: "Camry",
    badge: "NEW",
    rating: 4.8,
    mileage: "15,000",
    location: "New York, NY",
    price: 25000,
    originalPrice: 28000,
    dealer: "City Auto Group",
  },{
    id: 2,
    image: "https://via.placeholder.com/300x200",
    year: 2022,
    make: "Toyota",
    model: "Camry",
    badge: "NEW",
    rating: 4.8,
    mileage: "15,000",
    location: "New York, NY",
    price: 25000,
    originalPrice: 28000,
    dealer: "City Auto Group",
  },{
    id: 3,
    image: "https://via.placeholder.com/300x200",
    year: 2022,
    make: "Toyota",
    model: "Camry",
    badge: "NEW",
    rating: 4.8,
    mileage: "15,000",
    location: "New York, NY",
    price: 25000,
    originalPrice: 28000,
    dealer: "City Auto Group",
  },{
    id: 4,
    image: "https://via.placeholder.com/300x200",
    year: 2022,
    make: "Toyota",
    model: "Camry",
    badge: "NEW",
    rating: 4.8,
    mileage: "15,000",
    location: "New York, NY",
    price: 25000,
    originalPrice: 28000,
    dealer: "City Auto Group",
  },{
    id: 5,
    image: "https://via.placeholder.com/300x200",
    year: 2022,
    make: "Toyota",
    model: "Camry",
    badge: "NEW",
    rating: 4.8,
    mileage: "15,000",
    location: "New York, NY",
    price: 25000,
    originalPrice: 28000,
    dealer: "City Auto Group",
  },{
    id: 6,
    image: "https://via.placeholder.com/300x200",
    year: 2022,
    make: "Toyota",
    model: "Camry",
    badge: "NEW",
    rating: 4.8,
    mileage: "15,000",
    location: "New York, NY",
    price: 25000,
    originalPrice: 28000,
    dealer: "City Auto Group",
  }
];

const LandingPage = () => {
  const [searchFilters, setSearchFilters] = useState({
    make: "",
    model: "",
    priceRange: "",
    location: "",
  });
  const [currentTheme, setCurrentTheme] = useState("default");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = () => {
    // integrate with search page or context
    console.log("Searching with filters:", searchFilters);
  };

  const handleViewDetails = (carId) => {
    console.log("View details for car", carId);
  };

  const handleContactSeller = (carId) => {
    console.log("Contact seller for car", carId);
  };

  return (
    <div className="landing-page">
      <main>
        <Header 
        currentTheme={currentTheme}
        setCurrentTheme={setCurrentTheme}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        />
        <Hero
          searchFilters={searchFilters}
          onSearchFiltersChange={setSearchFilters}
          onSearch={handleSearch}
        />

        <FeaturedCars
          cars={mockCars}
          onViewDetails={handleViewDetails}
          onContactSeller={handleContactSeller}
        />

        <WhyChooseUs />
        <Testimonials />
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
