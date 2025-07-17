import React from "react";
import { Search, MapPin } from "lucide-react";
import "./SearchForm.css";
const SearchForm = ({ searchFilters, onSearchFiltersChange, onSearch }) => {
  const handleInputChange = (field, value) => {
    onSearchFiltersChange({
      ...searchFilters,
      [field]: value,
    });
  };

  return (
    <div className="search-container">
      <h2 className="search-title">Start Your Car Search</h2>
      <div className="search-form">
        <div className="search-row">
          <div className="search-field">
            <label>Make</label>
            <select
              value={searchFilters.make}
              onChange={(e) => handleInputChange("make", e.target.value)}
            >
              <option value="">Any Make</option>
              <option value="Toyota">Toyota</option>
              <option value="Honda">Honda</option>
              <option value="BMW">BMW</option>
              <option value="Ford">Ford</option>
              <option value="Tesla">Tesla</option>
              <option value="Audi">Audi</option>
            </select>
          </div>
          <div className="search-field">
            <label>Model</label>
            <select
              value={searchFilters.model}
              onChange={(e) => handleInputChange("model", e.target.value)}
            >
              <option value="">Any Model</option>
              <option value="Camry">Camry</option>
              <option value="Civic">Civic</option>
              <option value="X5">X5</option>
              <option value="F-150">F-150</option>
              <option value="Model 3">Model 3</option>
            </select>
          </div>
        </div>
        <div className="search-row">
          <div className="search-field">
            <label>Price Range</label>
            <select
              value={searchFilters.priceRange}
              onChange={(e) => handleInputChange("priceRange", e.target.value)}
            >
              <option value="">Any Price</option>
              <option value="0-20000">Under $20,000</option>
              <option value="20000-35000">$20,000 - $35,000</option>
              <option value="35000-50000">$35,000 - $50,000</option>
              <option value="50000+">Over $50,000</option>
            </select>
          </div>
          <div className="search-field">
            <label>Location</label>
            <div className="location-input">
              <MapPin className="location-icon" />
              <input
                type="text"
                placeholder="Enter ZIP code or city"
                value={searchFilters.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
              />
            </div>
          </div>
        </div>
        <button className="search-button" onClick={onSearch}>
          <Search className="search-icon" />
          Search Cars
        </button>
      </div>
    </div>
  );
};

export default SearchForm;
