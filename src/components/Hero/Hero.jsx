import React from 'react';
import { Shield, Users, Zap } from 'lucide-react';
import SearchForm from '../SearchForm/SearchForm';
import "./Hero.css";

const Hero = ({
  searchFilters,
  onSearchFiltersChange,
  onSearch
}) => {
  return (
    <section className="hero" >
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Find Your Perfect Car with <span className="title-accent">CarCHeepo</span>
            </h1>
            <p className="hero-subtitle">
              Discover amazing deals on quality pre-owned vehicles from trusted dealers nationwide. 
              Your dream car is just a search away.
            </p>
            <div className="hero-features">
              <div className="feature">
                <Shield className="feature-icon" />
                <span>Verified Dealers</span>
              </div>
              <div className="feature">
                <Users className="feature-icon" />
                <span>500k+ Happy Customers</span>
              </div>
              <div className="feature">
                <Zap className="feature-icon" />
                <span>Instant Financing</span>
              </div>
            </div>
          </div>

          <SearchForm
            searchFilters={searchFilters}
            onSearchFiltersChange={onSearchFiltersChange}
            onSearch={onSearch}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;