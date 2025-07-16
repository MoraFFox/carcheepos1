/** @format */

import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./FiltersPanel.css";
import { MdFilterAlt } from "react-icons/md";
import { MdFilterAltOff } from "react-icons/md";

import { ColorPicker, Space } from "antd";

// Import transmission icons
import autoIcon from "../../assets/automatic-transmission.svg";
import manualIcon from "../../assets/manual-transmission.svg";
import { TiArrowSortedDown, TiArrowSortedUp, TiEquals } from "react-icons/ti"; // Added TiEquals for the grabber
// Consider adding an 'any' icon or using a placeholder/text

// Add isExpanded and onToggleExpand to props
const FiltersPanel = ({ onApplyFilters, isExpanded, onToggleExpand }) => {
  // ===========================================================================
  // State
  // ===========================================================================
  const currentYear = new Date().getFullYear();
  const initialFilters = {
    manifacture: "",
    priceRange: [0, 1000000],
    transmission: "",
    type: "",
    capacity: "",
    color: "",
    yearRange: [1990, currentYear],
  };

  const [filters, setFilters] = useState(initialFilters);

  // ===========================================================================
  // Handlers
  // ===========================================================================
  const handleChange = (event) => {
    const { name, value, type } = event.target;
    let newValue = value;

    if (type === "number" || name === "capacity") {
      newValue = value === "" ? "" : parseInt(value, 10);
      if (newValue < 0) {
        newValue = 0;
      }
    } else if (type === "radio") {
      // For radio buttons, the value is directly the selected option's value
      // No change needed for 'value' itself, it's already correct
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: newValue,
    }));
  };

  const handleSliderChange = (name, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setFilters(initialFilters);
    if (onApplyFilters) {
      const { priceRange, yearRange, ...restOfInitialFilters } = initialFilters;
      onApplyFilters({
        ...restOfInitialFilters,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        minYear: yearRange[0],
        maxYear: yearRange[1],
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (onApplyFilters) {
      const { priceRange, yearRange, ...restOfFilters } = filters;
      onApplyFilters({
        ...restOfFilters,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        minYear: yearRange[0],
        maxYear: yearRange[1],
      });
    }
    // Close panel after applying filters
    if (isExpanded && onToggleExpand) onToggleExpand();
  };

  return (
    <form
      className={`filters-panel ${
        isExpanded ? "panel-expanded" : "panel-collapsed"
      }`}
      onSubmit={handleSubmit}
    >
      <div className='panel-toggle-area' onClick={onToggleExpand}>
        {/* Visual grabber hint - styled with CSS ::before */}
        <span className='panel-toggle-title'>
          {isExpanded ? "Hide Filters" : "Show Filters"}
        </span>
        {isExpanded ? (
          <TiArrowSortedDown size={28} />
        ) : (
          <TiArrowSortedUp size={28} />
        )}
      </div>

      {/* Filters content is now conditionally rendered and wrapped for scrolling */}
      {isExpanded && (
        <div className='filters-content-wrapper'>
          {" "}
          {/* New wrapper for scrolling content */}
          <div className='actual-filters-scrollable-area'>
            {" "}
            {/* Actual scrollable content */}
            {/* manifacture Filter */}
            <div className='filter-group'>
              <label htmlFor='manifacture-filter' className='filter-group-label'>manifacture</label>
              <select
                id='manifacture-filter'
                name='manifacture'
                value={filters.manifacture}
                onChange={handleChange}
              >
                <option value=''>All</option>
                <option value='Kia'>Kia</option>
                <option value='Isuzu'>Isuzu</option>
                <option value='Hyundai'>Hyundai</option>
                <option value='Audi'>Audi</option>
                <option value='BMW'>BMW</option>
                <option value='Ford'>Ford</option>
                <option value='Mercedes-Benz'>Mercedes-Benz</option>
                <option value='Tesla'>Tesla</option>
              </select>
            </div>
            {/* Price Filter */}
            <div className='filter-group filter-group-slider'>
              <label className='filter-group-label'>Price Range</label>
              <Slider
                range
                min={0}
                max={1000000}
                value={filters.priceRange}
                onChange={(value) => handleSliderChange("priceRange", value)}
                allowCross={false}
                step={1000}
              />
              <div className='slider-values'>
                <span>${filters.priceRange[0].toLocaleString()}</span>
                <span>${filters.priceRange[1].toLocaleString()}</span>
              </div>
            </div>
            {/* Transmission Filter */}
            <div className='filter-group filter-group-transmission'>
              <label className='filter-group-label'>Transmission</label>
              <div className='transmission-options'>
                {/* Any Option */}
                <label htmlFor='trans-any' className='transmission-option'>
                  <input
                    type='radio'
                    id='trans-any'
                    name='transmission'
                    value=''
                    checked={filters.transmission === ""}
                    onChange={handleChange}
                  />
                  <span className='transmission-icon-placeholder'>?</span>
                  <span className='transmission-name'>Any</span>
                </label>
                {/* Automatic Option */}
                <label htmlFor='trans-auto' className='transmission-option'>
                  <input
                    type='radio'
                    id='trans-auto'
                    name='transmission'
                    value='Automatic'
                    checked={filters.transmission === "Automatic"}
                    onChange={handleChange}
                  />
                  <img
                    src={autoIcon}
                    alt='Automatic'
                    className='transmission-icon'
                  />
                  <span className='transmission-name'>Auto</span>
                </label>
                {/* Manual Option */}
                <label htmlFor='trans-manual' className='transmission-option'>
                  <input
                    type='radio'
                    id='trans-manual'
                    name='transmission'
                    value='Manual'
                    checked={filters.transmission === "Manual"}
                    onChange={handleChange}
                  />
                  <img
                    src={manualIcon}
                    alt='Manual'
                    className='transmission-icon'
                  />
                  <span className='transmission-name'>Manual</span>
                </label>
              </div>
            </div>
            {/* Type Filter */}
            <div className='filter-group filter-group-car-type'>
              <label className='filter-group-label'>Car Type</label>
              <div className='car-type-options'>
                {/* Any Option */}
                <label htmlFor='type-any' className='car-type-option'>
                  <input
                    type='radio'
                    id='type-any'
                    name='type'
                    value=''
                    checked={filters.type === ""}
                    onChange={handleChange}
                  />
                  <div className='car-type-icon'>🚗</div>
                  <span className='car-type-name'>Any</span>
                </label>

                {/* Sport Option */}
                <label htmlFor='type-sport' className='car-type-option'>
                  <input
                    type='radio'
                    id='type-sport'
                    name='type'
                    value='Sport'
                    checked={filters.type === "Sport"}
                    onChange={handleChange}
                  />
                  <div className='car-type-icon'>🏎️</div>
                  <span className='car-type-name'>Sport</span>
                </label>

                {/* SUV Option */}
                <label htmlFor='type-suv' className='car-type-option'>
                  <input
                    type='radio'
                    id='type-suv'
                    name='type'
                    value='SUV'
                    checked={filters.type === "SUV"}
                    onChange={handleChange}
                  />
                  <div className='car-type-icon'>🚙</div>
                  <span className='car-type-name'>SUV</span>
                </label>

                {/* Sedan Option */}
                <label htmlFor='type-sedan' className='car-type-option'>
                  <input
                    type='radio'
                    id='type-sedan'
                    name='type'
                    value='Sedan'
                    checked={filters.type === "Sedan"}
                    onChange={handleChange}
                  />
                  <div className='car-type-icon'>🚘</div>
                  <span className='car-type-name'>Sedan</span>
                </label>

                {/* Hatchback Option */}
                <label htmlFor='type-hatchback' className='car-type-option'>
                  <input
                    type='radio'
                    id='type-hatchback'
                    name='type'
                    value='Hatchback'
                    checked={filters.type === "Hatchback"}
                    onChange={handleChange}
                  />
                  <div className='car-type-icon'>🚗</div>
                  <span className='car-type-name'>Hatchback</span>
                </label>

                {/* Coupe Option */}
                <label htmlFor='type-coupe' className='car-type-option'>
                  <input
                    type='radio'
                    id='type-coupe'
                    name='type'
                    value='Coupe'
                    checked={filters.type === "Coupe"}
                    onChange={handleChange}
                  />
                  <div className='car-type-icon'>🏎️</div>
                  <span className='car-type-name'>Coupe</span>
                </label>
              </div>
            </div>
            {/* Color Filter */}
            <div className='filter-group filter-group-color'>
              <label className='filter-group-label'>Color</label>
              <div className='color-options'>
                <label htmlFor='color-any' className='color-option'>
                  <input
                    type='radio'
                    id='color-any'
                    name='color'
                    value=''
                    checked={filters.color === ""}
                    onChange={handleChange}
                  />
                  <span className='color-dot any'></span>
                  <span className='color-name'>Any</span>
                </label>
                {[
                  { name: "Black", code: "#000000" },
                  { name: "White", code: "#FFFFFF" },
                  { name: "Silver", code: "#C0C0C0" },
                  { name: "Gray", code: "#808080" },
                  { name: "Red", code: "#FF0000" },
                  { name: "Blue", code: "#0000FF" },
                ].map((color) => (
                  <label
                    key={color.name}
                    htmlFor={`color-${color.name.toLowerCase()}`}
                    className='color-option'
                  >
                    <input
                      type='radio'
                      id={`color-${color.name.toLowerCase()}`}
                      name='color'
                      value={color.name}
                      checked={filters.color === color.name}
                      onChange={handleChange}
                    />

                    <span
                      className='color-dot'
                      style={{ backgroundColor: color.code }}
                    ></span>
                    <span className='color-name'>{color.name}</span>
                  </label>
                ))}
              </div>
            </div>
            {/* Seats Filter */}
            <div className='filter-group'>
              <label htmlFor='capacity-filter' className='filter-group-label'>Seats</label>
              <select
                id='capacity-filter'
                name='capacity'
                value={filters.capacity}
                onChange={handleChange}
              >
                <option value=''>Any</option>
                <option value='2'>2</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
                <option value='7'>7</option>
              </select>
            </div>
            {/* Year Filter */}
            <div className='filter-group filter-group-slider'>
              <label className='filter-group-label'>Year Range</label>
              <Slider
                range
                min={1990}
                max={currentYear}
                value={filters.yearRange}
                onChange={(value) => handleSliderChange("yearRange", value)}
                allowCross={false}
                step={1}
              />
              <div className='slider-values'>
                <span>{filters.yearRange[0]}</span>
                <span>{filters.yearRange[1]}</span>
              </div>
            </div>
          </div>
        </div> // This div closes the 'filters-content-wrapper'
      )}

      {/* Submit and Toggle Button Section */}
      <div className='filter-submit-section'>
        {/* Only show Apply button if expanded */}
        {isExpanded && (
          <>
            <button type='submit' className='apply-filters-button'>
              Apply
            </button>
            <button
              type='button'
              className='reset-all-button'
              onClick={handleReset}
            >
              Reset All
            </button>
          </>
        )}
      </div>
      {/* Toggle Button */}
      <button
        type='button'
        className={
          isExpanded
            ? "toggle-filters-button-close"
            : "toggle-filters-button-open"
        }
        onClick={onToggleExpand} // Use the passed-down handler
        aria-expanded={isExpanded}
      >
        {isExpanded ? <TiArrowSortedUp /> : <MdFilterAlt />}
      </button>
    </form>
  );
};

export default FiltersPanel;
