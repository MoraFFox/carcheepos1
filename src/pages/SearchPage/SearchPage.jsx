/** @format */

import React, { useState } from "react";
import "./SearchPage.css"; // Import the CSS file

// Remove shared style constants
// const labelStyle = "...";
// const inputStyle = "...";
// const selectStyle = "...";
// const buttonStyle = "...";

const SearchPage = () => {
  // State for filters
  const [searchTerm, setSearchTerm] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [minYear, setMinYear] = useState("");
  const [maxYear, setMaxYear] = useState("");
  const [maxseats, setMaxseats] = useState(""); // Parsecs?
  const [transmission, setTransmission] = useState(""); // Drive System?
  const [engine_type, setengine_type] = useState(""); // Propulsion System?

  const handleSearch = (e) => {
    e.preventDefault();
    // In a real app, trigger search based on filter state
    console.log("Searching with filters:", {
      searchTerm,
      priceMin,
      priceMax,
      minYear,
      maxYear,
      maxseats,
      transmission,
      engine_type,
    });
    alert("Search initiated! (Check console for parameters)");
  };

  return (
    <div className='search-page-container'>
      {" "}
      {/* Use CSS class */}
      <h1 className='page-title'>
        {" "}
        {/* Use CSS class */}
        Fleet Search Matrix
      </h1>
      <form
        onSubmit={handleSearch}
        className='search-form' // Use CSS class
      >
        {/* Search Bar */}
        <div>
          <label htmlFor='search' className='form-label'>
            {" "}
            {/* Use CSS class */}
            Search Designation / Keyword
          </label>
          <input
            id='search'
            type='text'
            placeholder='e.g., X-Wing 7, AstroDynamics, Quantum...'
            className='form-input' // Use CSS class
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filters Grid */}
        <fieldset className='filter-fieldset'>
          {" "}
          {/* Use CSS class */}
          <legend className='filter-legend'>Filter Parameters</legend>{" "}
          {/* Use CSS class */}
          <div className='filter-grid'>
            {" "}
            {/* Use CSS class */}
            {/* Price Range */}
            <div>
              <label htmlFor='priceMin' className='form-label'>
                Min Price (Ξ)
              </label>{" "}
              {/* Use CSS class */}
              <input
                id='priceMin'
                type='number'
                placeholder='Min Credits'
                className='form-input' // Use CSS class
                value={priceMin}
                onChange={(e) => setPriceMin(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='priceMax' className='form-label'>
                Max Price (Ξ)
              </label>{" "}
              {/* Use CSS class */}
              <input
                id='priceMax'
                type='number'
                placeholder='Max Credits'
                className='form-input' // Use CSS class
                value={priceMax}
                onChange={(e) => setPriceMax(e.target.value)}
              />
            </div>
            {/* Year Range */}
            <div>
              <label htmlFor='minYear' className='form-label'>
                Min Year
              </label>{" "}
              {/* Use CSS class */}
              <input
                id='minYear'
                type='number'
                placeholder='Min Year'
                className='form-input' // Use CSS class
                value={minYear}
                onChange={(e) => setMinYear(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='maxYear' className='form-label'>
                Max Year
              </label>{" "}
              {/* Use CSS class */}
              <input
                id='maxYear'
                type='number'
                placeholder='Max Year'
                className='form-input' // Use CSS class
                value={maxYear}
                onChange={(e) => setMaxYear(e.target.value)}
              />
            </div>
            {/* Max seats */}
            <div>
              <label htmlFor='seats' className='form-label'>
                {" "}
                {/* Use CSS class */}
                Max seats (Parsecs)
              </label>
              <input
                id='seats'
                type='number'
                placeholder='Max Parsecs'
                className='form-input' // Use CSS class
                value={maxseats}
                onChange={(e) => setMaxseats(e.target.value)}
                step='0.1'
              />
            </div>
            {/* Transmission (Drive System) */}
            <div className='select-wrapper'>
              {" "}
              {/* Use CSS class */}
              <label htmlFor='transmission' className='form-label'>
                {" "}
                {/* Use CSS class */}
                Drive System
              </label>
              <select
                id='transmission'
                className='form-select' // Use CSS class
                value={transmission}
                onChange={(e) => setTransmission(e.target.value)}
              >
                <option value='' className='text-sci-fi-slate/50'>
                  Any System
                </option>
                <option value='Hyperdrive'>Hyperdrive</option>
                <option value='Impulse'>Impulse</option>
                <option value='Warp Core'>Warp Core</option>
                <option value='Sublight'>Sublight</option>
              </select>
              <div className='select-arrow'>
                {" "}
                {/* Use CSS class */}
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
                  <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                </svg>
              </div>
            </div>
            {/* Fuel Type (Propulsion System) */}
            <div className='select-wrapper'>
              {" "}
              {/* Use CSS class */}
              <label htmlFor='engine_type' className='form-label'>
                {" "}
                {/* Use CSS class */}
                Propulsion System
              </label>
              <select
                id='engine_type'
                className='form-select' // Use CSS class
                value={engine_type}
                onChange={(e) => setengine_type(e.target.value)}
              >
                <option value='' className='text-sci-fi-slate/50'>
                  Any System
                </option>
                <option value='Fusion Core'>Fusion Core</option>
                <option value='Antimatter'>Antimatter</option>
                <option value='Ion Drive'>Ion Drive</option>
                <option value='Plasma Injector'>Plasma Injector</option>
                <option value='Quantum Entanglement'>
                  Quantum Entanglement
                </option>
              </select>
              <div className='select-arrow'>
                {" "}
                {/* Use CSS class */}
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
                  <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                </svg>
              </div>
            </div>
          </div>
        </fieldset>

        {/* Submit Button */}
        <div>
          <button type='submit' className='submit-button'>
            {" "}
            {/* Use CSS class */}
            Initiate Search
          </button>
        </div>
      </form>
      {/* Search Results Area (Placeholder) */}
      <div className='results-container'>
        {" "}
        {/* Use CSS class */}
        <h2 className='results-title'>Search Results Grid</h2>{" "}
        {/* Use CSS class */}
        <div className='results-placeholder'>
          {" "}
          {/* Use CSS class */}
          <p>Search results will materialize here...</p>
          <p className='placeholder-subtext'>
            (Awaiting search parameters)
          </p>{" "}
          {/* Use CSS class */}
          {/* In a real app, map over search results and display CarCard components */}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
