/** @format */

import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import QuizStepper from "../../components/HeroQuiz/QuizStepper";
import FeaturedCars from "../../components/FeaturedCars/FeaturedCars";
import WhyChooseUs from "../../components/WhyChooseUs/WhyChooseUs";
import Testimonials from "../../components/Testimonials/Testimonials";
import Footer from "../../components/Footer/Footer";
import "./LandingPage.css";
import { getAllCars } from "../../utils/api";
/* get all cars from data base  */


const mockCars = [
  {
    id: 1,
    image: "https://via.placeholder.com/300x200",
    year: 2022,
    manifacture: "Toyota",
    model: "Camry",
    badge: "NEW",
    rating: 4.8,
    mileage_km: "15,000",
    location: "New York, NY",
    price: 25000,
    originalPrice_usd: 28000,
    dealer: "City Auto Group",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/300x200",
    year: 2022,
    manifacture: "Toyota",
    model: "Camry",
    badge: "NEW",
    rating: 4.8,
    mileage_km: "15,000",
    location: "New York, NY",
    price: 25000,
    originalPrice_usd: 28000,
    dealer: "City Auto Group",
  },
  {
    id: 3,
    image: "https://via.placeholder.com/300x200",
    year: 2022,
    manifacture: "Toyota",
    model: "Camry",
    badge: "NEW",
    rating: 4.8,
    mileage_km: "15,000",
    location: "New York, NY",
    price: 25000,
    originalPrice_usd: 28000,
    dealer: "City Auto Group",
  },
  {
    id: 4,
    image: "https://via.placeholder.com/300x200",
    year: 2022,
    manifacture: "Toyota",
    model: "Camry",
    badge: "NEW",
    rating: 4.8,
    mileage_km: "15,000",
    location: "New York, NY",
    price: 25000,
    originalPrice_usd: 28000,
    dealer: "City Auto Group",
  },
  {
    id: 5,
    image: "https://via.placeholder.com/300x200",
    year: 2022,
    manifacture: "Toyota",
    model: "Camry",
    badge: "NEW",
    rating: 4.8,
    mileage_km: "15,000",
    location: "New York, NY",
    price: 25000,
    originalPrice_usd: 28000,
    dealer: "City Auto Group",
  },
  {
    id: 6,
    image: "https://via.placeholder.com/300x200",
    year: 2022,
    manifacture: "Toyota",
    model: "Camry",
    badge: "NEW",
    rating: 4.8,
    mileage_km: "15,000",
    location: "New York, NY",
    price: 25000,
    originalPrice_usd: 28000,
    dealer: "City Auto Group",
  },
];

const LandingPage = () => {
  const [cars, setCars] = useState([]);
  useEffect(() => {
    getAllCars().then((cars) => {
      setCars(cars);
    });
  }, []);
  const [searchFilters, setSearchFilters] = useState({
    manifacture: "",
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
      <Header
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
      <main>
        <Hero
          searchFilters={searchFilters}
          onSearchFiltersChange={setSearchFilters}
          onSearch={handleSearch}
        />

        {/* Car search quiz */}


        <FeaturedCars
          cars={cars}
          onViewDetails={handleViewDetails}
          onContactSeller={handleContactSeller}
        />
        <QuizStepper />
        <WhyChooseUs />
        <Testimonials />
        <Footer />
      </main>
    </div>
  );
};

export default LandingPage;
