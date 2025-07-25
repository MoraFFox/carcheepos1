import React from "react";
import { Shield, Users, Zap } from "lucide-react";
import SearchForm from "../SearchForm/SearchForm";
import "./Hero.css";

const Hero = ({ searchFilters, onSearchFiltersChange, onSearch }) => {

  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Buy & Sell Cars with Ease
              <span className="title-accent"> CarCHeepo</span>
            </h1>
            <p className="hero-subtitle">
              Your dream car is just a clicks away
            </p>
          </div>

          {/* <SearchForm
            searchFilters={searchFilters}
            onSearchFiltersChange={onSearchFiltersChange}
            onSearch={onSearch}
          /> */}
          <div className="hero-footer">
            {/*button to go to search section in page*/}
            <button
              className="hero-btn"
              onClick={() =>
                window.scrollTo({
                  top: 2800,
                  behavior: "smooth",
                })
              }
            >
              Get Yours Now
            </button>
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
        </div>
      </div>
    </section>
  );
};

export default Hero;
