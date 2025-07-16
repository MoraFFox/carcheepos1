import React, { useState, useEffect, useCallback } from "react";
import "./SearchBar.css";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"; // Using outline icons

const SearchBar = ({
  placeholder = "Search for cars (e.g., Toyota Camry, SUV...)",
  onSearch, // Callback function to be called with the search term
  debounceDelay = 300, // Default debounce delay of 300ms
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Debounced search function
  const debouncedSearch = useCallback(
    (term) => {
      if (onSearch) {
        onSearch(term);
      }
    },
    [onSearch]
  );

  useEffect(() => {
    if (searchTerm === "") {
      // If search term is empty, call onSearch immediately or handle as needed
      // For now, let's assume we want to clear results or show all if term is empty
      if (onSearch) onSearch("");
      return; // No need to set a timer
    }

    const timerId = setTimeout(() => {
      debouncedSearch(searchTerm);
    }, debounceDelay);

    return () => {
      clearTimeout(timerId); // Cleanup the timer if the component unmounts or searchTerm changes
    };
  }, [searchTerm, debounceDelay, debouncedSearch, onSearch]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="search-bar-container">
      <MagnifyingGlassIcon className="search-icon" />
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        aria-label="Search cars"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button
        className="search-button"
        onClick={() => debouncedSearch(searchTerm)}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
