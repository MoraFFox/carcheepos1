/** @format */

import React, { useState, useMemo } from "react";
import { FiX, FiTag } from "react-icons/fi";
import {
  getUniqueValues,
  getMinMaxValues,
  formatPrice,
  formatMileage,
  bodyTypes,
  fuelTypes,
  transmissionTypes,
  commonFeatures,
} from "../../utils/filterUtils";
import "./FiltersSidebar.css";
import { FaArrowDownShortWide } from "react-icons/fa6";
const FiltersSidebar = ({
  favorites,
  filters,
  setFilters,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  selectedTags,
  setSelectedTags,
  classControlFilterSidebar,
}) => {
  // Common tags for cars
  const commonTags = [
    // Price-based tags
    { id: "luxury", label: "Luxury" },
    { id: "premium", label: "Premium" },
    { id: "economy", label: "Economy" },
    { id: "budget", label: "Budget-Friendly" },

    // Performance tags
    { id: "sports", label: "Sports" },
    { id: "performance", label: "High Performance" },
    { id: "supercar", label: "Supercar" },
    { id: "muscle", label: "Muscle Car" },

    // Usage tags
    { id: "family", label: "Family" },
    { id: "commuter", label: "Commuter" },
    { id: "business", label: "Business" },
    { id: "weekend", label: "Weekend Car" },

    // Style tags
    { id: "classic", label: "Classic" },
    { id: "modern", label: "Modern" },
    { id: "idtage", label: "idtage" },
    { id: "retro", label: "Retro" },

    // Feature tags
    { id: "tech", label: "High-Tech" },
    { id: "safety", label: "Safety Focus" },
    { id: "comfort", label: "Comfort" },
    { id: "leather", label: "Leather Interior" },

    // Capability tags
    { id: "offroad", label: "Off-Road" },
    { id: "allweather", label: "All-Weather" },
    { id: "towing", label: "Towing" },
    { id: "cargo", label: "Cargo Space" },

    // Efficiency tags
    { id: "efficient", label: "Fuel Efficient" },
    { id: "hybrid", label: "Hybrid" },
    { id: "electric", label: "Electric" },
    { id: "eco", label: "Eco-Friendly" },

    // Brand quality tags
    { id: "reliable", label: "Reliable" },
    { id: "imported", label: "Imported" },
    { id: "domestic", label: "Domestic" },
    { id: "limited", label: "Limited Edition" },
  ];
  // Derive filter options from favorites data
  const filterOptions = useMemo(
    () => ({
      manifactures: getUniqueValues(favorites, "manifacture"),
      priceRange: getMinMaxValues(favorites, "price"),
      modelRange: getMinMaxValues(favorites, "year"),
      mileage_kmRange: getMinMaxValues(favorites, "mileage_km"),
      features: getUniqueValues(favorites, "features").filter((feature) =>
        commonFeatures.includes(feature)
      ),
    }),
    [favorites]
  );

  const handleClearFilters = () => {
    setFilters({
      priceRange: { min: "", max: "" },
      model: { min: "", max: "" },
      mileage_km: { min: "", max: "" },
      manifacture: [],
      type: [],
      transmission: [],
      engine: { fuelType: [] },
      features: [],
    });
  };

  const handleToggleFilter = (type, value) => {
    setFilters((prev) => {
      if (type === "fuelType") {
        return {
          ...prev,
          engine: {
            ...prev.engine,
            fuelType: prev.engine.fuelType.includes(value)
              ? prev.engine.fuelType.filter((item) => item !== value)
              : [...prev.engine.fuelType, value],
          },
        };
      } else {
        return {
          ...prev,
          [type]: prev[type].includes(value)
            ? prev[type].filter((item) => item !== value)
            : [...prev[type], value],
        };
      }
    });
  };

  return (
    <div className={classControlFilterSidebar}>
      <div className='filters-header'>
        <h3>Filters</h3>
        <button className='clear-filters' onClick={handleClearFilters}>
          Clear All
        </button>
      </div>

      <div className='filter-group'>
        <h4>Sort By</h4>
        <div className='sort-controls'>
          <select
            className='sort-select'
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value='dateAdded'>Date Added</option>
            <option value='price'>Price</option>
            <option value='year'>Year</option>
            <option value='mileage'>Mileage</option>
          </select>
          <button
            className='sort-order'
            onClick={() =>
              setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
            }
          >
            {sortOrder === "asc" ? (
              <FaArrowDownShortWide />
            ) : (
              <FaArrowDownShortWide style={{ transform: "rotate(180deg)" }} />
            )}
          </button>
        </div>
      </div>

      <div className='filter-group'>
        <h4>Price Range</h4>
        <div className='range-inputs'>
          <input
            type='number'
            placeholder={formatPrice(filterOptions.priceRange.min)}
            value={filters.priceRange.min}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                priceRange: { ...prev.priceRange, min: e.target.value },
              }))
            }
          />
          <input
            type='number'
            placeholder={formatPrice(filterOptions.priceRange.max)}
            value={filters.priceRange.max}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                priceRange: { ...prev.priceRange, max: e.target.value },
              }))
            }
          />
        </div>
      </div>

      <div className='filter-group'>
        <h4>Year</h4>
        <div className='range-inputs'>
          <input
            type='number'
            placeholder={filterOptions.modelRange.min}
            value={filters.model.min}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                model: { ...prev.model, min: e.target.value },
              }))
            }
          />
          <input
            type='number'
            placeholder={filterOptions.modelRange.max}
            value={filters.model.max}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                model: { ...prev.model, max: e.target.value },
              }))
            }
          />
        </div>
      </div>

      <div className='filter-group'>
        <h4>Mileage</h4>
        <div className='range-inputs'>
          <input
            type='number'
            placeholder={formatMileage(filterOptions.mileage_kmRange.min)}
            value={filters.mileage_km.min}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                mileage_km: { ...prev.mileage_km, min: e.target.value },
              }))
            }
          />
          <input
            type='number'
            placeholder={formatMileage(filterOptions.mileage_kmRange.max)}
            value={filters.mileage_km.max}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                mileage_km: { ...prev.mileage_km, max: e.target.value },
              }))
            }
          />
        </div>
      </div>

      <div className='filter-group'>
        <h4>manifacture</h4>
        <div className='checkbox-group scrollable'>
          {filterOptions.manifactures.map((manifacture) => (
            <label key={manifacture} className='checkbox-label'>
              <input
                type='checkbox'
                checked={filters.manifacture.includes(manifacture)}
                onChange={() => handleToggleFilter("manifacture", manifacture)}
              />
              {manifacture}
            </label>
          ))}
        </div>
      </div>

      <div className='filter-group'>
        <h4>Body Type</h4>
        <div className='checkbox-group scrollable'>
          {bodyTypes.map((type) => (
            <label key={type} className='checkbox-label'>
              <input
                    type='checkbox'
                    checked={filters.type.includes(type)}
                onChange={() => handleToggleFilter("type", type)}
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      <div className='filter-group'>
        <h4>Transmission</h4>
        <div className='checkbox-group'>
          {transmissionTypes.map((trans) => (
            <label key={trans} className='checkbox-label'>
              <input
                type='checkbox'
                checked={filters.transmission.includes(trans)}
                onChange={() => handleToggleFilter("transmission", trans)}
              />
              {trans}
            </label>
          ))}
        </div>
      </div>

      <div className='filter-group'>
        <h4>Fuel Type</h4>
        <div className='checkbox-group'>
          {fuelTypes.map((fuel) => (
            <label key={fuel} className='checkbox-label'>
              <input
                type='checkbox'
                checked={filters.engine.fuelType.includes(fuel)}
                onChange={() => handleToggleFilter("fuelType", fuel)}
              />
              {fuel}
            </label>
          ))}
        </div>
      </div>
      <div className='filter-group'>
        <h4>Tags</h4>
        <div className='tags-grid'>
          {commonTags.map((tag) => (
            <button
              key={tag.id}
              className={`tag-button ${
                selectedTags.includes(tag.id) ? "active" : ""
              }`}
              onClick={() => {
                setSelectedTags((prev) =>
                  prev.includes(tag.id)
                    ? prev.filter((t) => t !== tag.id)
                    : [...prev, tag.id]
                );
              }}
            >
              <FiTag className='tag-icon' />
              {tag.label}
            </button>
          ))}
        </div>
      </div>

      {/* Active Filters */}
      <div className='active-filters'>
        {Object.entries(filters).map(([key, value]) => {
          if (Array.isArray(value) && value.length > 0) {
            return value.map((item) => (
              <span key={`${key}-${item}`} className='filter-tag'>
                {item}
                <button onClick={() => handleToggleFilter(key, item)}>
                  <FiX />
                </button>
              </span>
            ));
          }
          return null;
        })}
        {selectedTags.map((tagId) => {
          const tag = commonTags.find((t) => t.id === tagId);
          return (
            <span key={`tag-${tagId}`} className='filter-tag'>
              <FiTag className='tag-icon' />
              {tag?.label}
              <button
                onClick={() =>
                  setSelectedTags((prev) => prev.filter((t) => t !== tagId))
                }
              >
                <FiX />
              </button>
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default FiltersSidebar;
