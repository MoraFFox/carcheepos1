/** @format */

import React, { useState } from "react";
import "./CarListPage.css";
import FiltersPanel from "../../components/FiltersPanel/FiltersPanel";
import CarGrid from "../../components/CarGrid/CarGrid";

const CarListPage = () => {
  const [activeFilters, setActiveFilters] = useState({});
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false); // State for panel visibility

  const handleApplyFilters = (newFilters) => {
    setActiveFilters(newFilters);
    // Optionally collapse after applying filters
    setIsFiltersExpanded(false);
    console.log("Applying filters:", newFilters);
  };

  const toggleFiltersExpand = () => {
    setIsFiltersExpanded(!isFiltersExpanded);
  };

  return (
    // Add class based on expanded state
    <div
      className={`car-list-page ${
        isFiltersExpanded ? "" : "filters-collapsed"
      }`}
    >
      <FiltersPanel
        onApplyFilters={handleApplyFilters}
        isExpanded={isFiltersExpanded} // Pass state down
        onToggleExpand={toggleFiltersExpand} // Pass toggle function down
      />
      <CarGrid filters={activeFilters} />
    </div>
  );
};

export default CarListPage;
