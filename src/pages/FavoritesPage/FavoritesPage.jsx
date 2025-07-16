/** @format */

import React, { useState, useEffect } from "react";
import {
  FiGrid,
  FiList,
  FiBarChart2,
  FiHeart,
  FiTrash2,
  FiUser,
  FiSearch,
  FiBell,
  FiFolder,
} from "react-icons/fi";
import FavoriteCard from "../../components/FavoriteCard/FavoriteCard";
import CompareModal from "../../components/CompareModal/CompareModal";
import FiltersSidebar from "../../components/FiltersSidebar/FiltersSidebar";
import { useFavorites } from "../../context/FavoritesContext/FavoritesContext";
import { useCompare } from "../../context/CompareContext/CompareContext";
import CompareTable from "../../components/CompareTable/CompareTable";
import "./FavoritesPage.css";
import { MdOutlineFilterAltOff } from "react-icons/md";
import { MdOutlineFilterAlt } from "react-icons/md";
import BackDrop from "../../components/BackDrop/BackDrop";
const categories = [
  { id: "cars", label: "Cars", icon: FiUser },
  { id: "saved-searches", label: "Saved Searches", icon: FiSearch },
  { id: "collections", label: "Collections", icon: FiFolder },
  { id: "alerts", label: "Price Alerts", icon: FiBell },
];

const FavoritesPage = () => {
  const { favorites } = useFavorites();
  const { compareList, compareVehicle } = useCompare();
  const [viewMode, setViewMode] = useState("grid");
  const [compareMode, setCompareMode] = useState(false);
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState("cars");
  const [sortBy, setSortBy] = useState("dateAdded");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedTags, setSelectedTags] = useState([]);
  const [filteredFavorites, setFilteredFavorites] = useState([]);

  const [filters, setFilters] = useState({
    priceRange: { min: "", max: "" },
    model: { min: "", max: "" },
    mileage_km: { min: "", max: "" },
    manifacture: [],
    type: [],
    transmission: [],
    engine: { fuelType: [] },
    features: [],
  });

  // Apply filters and sorting to favorites
  useEffect(() => {
    let filtered = [...favorites];
    console.log(filtered);
    // Filter by tags if any are selected
    if (selectedTags.length > 0) {
      filtered = filtered.filter((car) => {
        if (!car) return false;

        // Check if car has any of the selected tags
        return selectedTags.some((tag) => {
          try {
            const manifacture = (car.manifacture || "").toLowerCase();
            const type = (car.type || "").toLowerCase();
            const features = Array.isArray(car.features) ? car.features : [];
            const price = Number(car.price) || 0;
            const model = Number(car.model) || 0;
            const currentYear = new Date().getFullYear();
            const horsepower = Number(car.horsepower) || 0;
            const fuelEfficiency = Number(car.fuelEfficiency) || 0;
            const category = (car.category || "").toLowerCase();

            switch (tag) {
              // Price-based tags
              case "luxury":
                return (
                  price >= 80000 ||
                  manifacture.includes("luxury") ||
                  ["rolls-royce", "bentley", "ferrari", "lamborghini"].includes(
                    manifacture
                  )
                );

              case "premium":
                return (
                  (price >= 50000 && price < 80000) ||
                  ["bmw", "mercedes", "audi", "lexus", "porsche"].includes(
                    manifacture
                  )
                );

              case "economy":
                return (
                  price <= 30000 ||
                  fuelEfficiency >= 30 ||
                  category === "economy" ||
                  manifacture === "toyota"
                );

              case "budget":
                return (
                  price <= 20000 ||
                  ["kia", "hyundai", "chevrolet", "nissan"].includes(
                    manifacture
                  )
                );

              // Performance tags
              case "sports":
                return (
                  category === "sports" ||
                  horsepower >= 300 ||
                  manifacture.includes("sport") ||
                  type === "coupe"
                );

              case "performance":
                return (
                  horsepower >= 400 ||
                  category === "performance" ||
                  features.some((f) => f.toLowerCase().includes("sport mode"))
                );

              case "supercar":
                return (
                  horsepower >= 600 ||
                  ["ferrari", "lamborghini", "mclaren", "bugatti"].includes(
                    manifacture
                  )
                );

              case "muscle":
                return (
                  category === "muscle" ||
                  (horsepower >= 450 &&
                    ["dodge", "chevrolet", "ford"].includes(manifacture))
                );

              // Usage tags
              case "family":
                return (
                  ["suv", "minivan", "wagon"].includes(type) ||
                  features.some((f) => f.toLowerCase().includes("family"))
                );

              case "commuter":
                return (
                  fuelEfficiency >= 25 ||
                  type === "sedan" ||
                  features.some((f) => f.toLowerCase().includes("commute"))
                );

              case "business":
                return (
                  (price >= 40000 && type === "sedan") ||
                  features.some((f) => f.toLowerCase().includes("executive"))
                );

              case "weekend":
                return (
                  type === "convertible" ||
                  category === "sports" ||
                  features.some((f) => f.toLowerCase().includes("recreational"))
                );

              // Style tags
              case "classic":
                return model > 0 && currentYear - model >= 25;

              case "modern":
                return model > 0 && currentYear - model <= 5;

              case "idtage":
                return model > 0 && currentYear - model >= 40;

              case "retro":
                return (
                  features.some((f) => f.toLowerCase().includes("retro")) ||
                  category === "retro"
                );

              // Feature tags
              case "tech":
                return features.some((f) => {
                  const fLower = f.toLowerCase();
                  return (
                    fLower.includes("smart") ||
                    fLower.includes("digital") ||
                    fLower.includes("tech") ||
                    fLower.includes("autonomous")
                  );
                });

              case "safety":
                return features.some((f) => {
                  const fLower = f.toLowerCase();
                  return (
                    fLower.includes("safety") ||
                    fLower.includes("assist") ||
                    fLower.includes("airbag") ||
                    fLower.includes("brake")
                  );
                });

              case "comfort":
                return features.some((f) => {
                  const fLower = f.toLowerCase();
                  return (
                    fLower.includes("comfort") ||
                    fLower.includes("climate") ||
                    fLower.includes("massage") ||
                    fLower.includes("ventilated")
                  );
                });

              case "leather":
                return features.some((f) =>
                  f.toLowerCase().includes("leather")
                );

              // Capability tags
              case "offroad":
                return (
                  type === "suv" ||
                  features.some((f) => {
                    const fLower = f.toLowerCase();
                    return (
                      fLower.includes("4wd") ||
                      fLower.includes("awd") ||
                      fLower.includes("off-road") ||
                      fLower.includes("terrain")
                    );
                  })
                );

              case "allweather":
                return features.some((f) => {
                  const fLower = f.toLowerCase();
                  return (
                    fLower.includes("awd") ||
                    fLower.includes("all-weather") ||
                    fLower.includes("weather") ||
                    fLower.includes("winter")
                  );
                });

              case "towing":
                return (
                  features.some((f) => f.toLowerCase().includes("tow")) ||
                  type === "truck"
                );

              case "cargo":
                return (
                  ["suv", "van", "wagon", "truck"].includes(type) ||
                  features.some((f) => f.toLowerCase().includes("cargo"))
                );

              // Efficiency tags
              case "efficient":
                return fuelEfficiency >= 35 || category === "economy";

              case "hybrid":
                return features.some((f) => f.toLowerCase().includes("hybrid"));

              case "electric":
                return (
                  features.some((f) => f.toLowerCase().includes("electric")) ||
                  category === "electric"
                );

              case "eco":
                return (
                  fuelEfficiency >= 40 ||
                  features.some((f) => f.toLowerCase().includes("eco"))
                );

              // Brand quality tags
              case "reliable":
                return (
                  ["toyota", "honda", "lexus", "subaru", "mazda"].includes(
                    manifacture
                  ) ||
                  features.some((f) => f.toLowerCase().includes("warranty"))
                );

              case "imported":
                return [
                  "toyota",
                  "honda",
                  "bmw",
                  "mercedes",
                  "audi",
                  "lexus",
                  "porsche",
                  "volvo",
                  "hyundai",
                  "kia",
                ].includes(manifacture);

              case "domestic":
                return [
                  "ford",
                  "chevrolet",
                  "dodge",
                  "chrysler",
                  "jeep",
                  "cadillac",
                  "buick",
                  "gmc",
                ].includes(manifacture);

              case "limited":
                return features.some((f) => {
                  const fLower = f.toLowerCase();
                  return (
                    fLower.includes("limited") ||
                    fLower.includes("special") ||
                    fLower.includes("edition")
                  );
                });

              default:
                return false;
            }
          } catch (error) {
            console.error("Error filtering by tag:", error);
            return false;
          }
        });
      });
    }

    // Apply filters based on current filter state
    if (filters.priceRange.min) {
      filtered = filtered.filter(
        (car) => car.price >= parseInt(filters.priceRange.min)
      );
    }
    if (filters.priceRange.max) {
      filtered = filtered.filter(
        (car) => car.price <= parseInt(filters.priceRange.max)
      );
    }
    if (filters.model.min) {
      filtered = filtered.filter(
        (car) => car.model >= parseInt(filters.model.min)
      );
    }
    if (filters.model.max) {
      filtered = filtered.filter(
        (car) => car.model <= parseInt(filters.model.max)
      );
    }
    if (filters.mileage_km.min) {
      filtered = filtered.filter(
        (car) => car.mileage >= parseInt(filters.mileage_km.min)
      );
    }
    if (filters.mileage_km.max) {
      filtered = filtered.filter(
        (car) => car.mileage <= parseInt(filters.mileage_km.max)
      );
    }
    if (filters.manifacture.length > 0) {
      filtered = filtered.filter((car) =>
        filters.manifacture.includes(car.manifacture)
      );
    }
    if (filters.type.length > 0) {
      filtered = filtered.filter((car) => filters.type.includes(car.type));
    }
    if (filters.transmission.length > 0) {
      filtered = filtered.filter((car) =>
        filters.transmission.includes(car.transmission)
      );
    }
    if (filters.engine.fuelType.length > 0) {
      filtered = filtered.filter((car) =>
        filters.engine.fuelType.includes(car.engine.fuelType)
      );
    }
    if (filters.features.length > 0) {
      filtered = filtered.filter((car) =>
        filters.features.every((feature) => car.features?.includes(feature))
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case "price":
          comparison = a.price - b.price;
          break;
        case "model":
          comparison = a.model - b.model;
          break;
        case "mileage":
          comparison = a.mileage - b.mileage;
          break;
        case "dateAdded":
        default:
          comparison = new Date(b.dateAdded) - new Date(a.dateAdded);
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

    setFilteredFavorites(filtered);
  }, [favorites, filters, sortBy, sortOrder, selectedTags]);

  const handleRemoveFavorite = (vehicleId) => {
    removeFavorite(vehicleId);
    setSelectedVehicles((prev) => prev.filter((id) => id !== vehicleId));
  };
  const [FilterOpen, setFilterOpen] = useState(false);

  const handleApplyFilters = () => {
    setFilterOpen(!FilterOpen);
    BackDrop(true);
    console.log(FilterOpen);
  };
  const classToggle = `filters-sidebar ` + (FilterOpen ? "close" : "open");
  return (
    <div className="favorites-page">
      <BackDrop backDrop={FilterOpen} setBackDrop={setFilterOpen} />
      <div className="favorites-content">
        <div className="favorites-header">
          <h1>Favorites</h1>
          <div className="view-options">
            <button
              className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
              onClick={() => setViewMode("grid")}
            >
              <FiGrid /> Grid
            </button>
            <button
              className={`view-btn ${viewMode === "list" ? "active" : ""}`}
              onClick={() => setViewMode("list")}
            >
              <FiList /> List
            </button>
            <button
              className={`view-btn ${compareMode ? "active" : ""}`}
              onClick={() => {
                setCompareMode(!compareMode);
                if (!compareMode) {
                  setSelectedVehicles([]);
                }
              }}
            >
              <FiBarChart2 /> Compare
            </button>
          </div>
        </div>
        {compareMode ? (
          <CompareModal
            isOpen={showCompareModal}
            onClose={() => {
              setShowCompareModal(false);
              if (compareMode) {
                setSelectedVehicles([]);
                console.log(selectedVehicles);
                setCompareMode(false);
              }
            }}
            vehicles={compareVehicle}
            onRemoveVehicle={(id) => {
              setSelectedVehicles((prev) =>
                prev.filter((itemId) => itemId !== id)
              );
              if (selectedVehicles.length <= 1) {
                console.log(selectedVehicles);
                setShowCompareModal(false);
                setCompareMode(false);
              }
            }}
          />
        ) : (
          <div className="favorites-main">
            <aside className="favorites-sidebar">
              <nav className="category-nav">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={`category-btn ${
                      activeCategory === category.id ? "active" : ""
                    }`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    <category.icon />
                    <span>{category.label}</span>
                  </button>
                ))}
              </nav>
              <button className="apply-filters" onClick={handleApplyFilters}>
                {FilterOpen ? (
                  <MdOutlineFilterAlt />
                ) : (
                  <MdOutlineFilterAltOff />
                )}
              </button>

              <FiltersSidebar
                classControlFilterSidebar={classToggle}
                favorites={favorites}
                filters={filters}
                setFilters={setFilters}
                sortBy={sortBy}
                setSortBy={setSortBy}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
              />
            </aside>
            <main className={`favorites-grid ${viewMode}`}>
              {filteredFavorites.map((item) => (
                <FavoriteCard
                  key={
                    item.id ??
                    item._id ??
                    item.vehicleId ??
                    `${item.manifacture}-${item.model}`
                  }
                  item={item}
                  viewMode={viewMode}
                  compareMode={compareMode}
                  selectedVehicles={selectedVehicles}
                  setSelectedVehicles={setSelectedVehicles}
                  setShowCompareModal={setShowCompareModal}
                />
              ))}
              {/* {compareList.length >= 2 && (
                <div style={{ width: "100%", margin: "2rem 0" }}>
                  <h2>Comparison Table</h2>
                  <CompareTable cars={compareList} />
                </div>
              )} */}
              {compareMode && selectedVehicles.length > 0 && (
                <div className="compare-footer">
                  <span>{selectedVehicles.length} vehicles selected</span>
                  <button
                    className="compare-button"
                    onClick={() => {
                      if (selectedVehicles.length >= 2) {
                        setShowCompareModal(true);
                      } else {
                        alert("Please select at least 2 vehicles to compare");
                      }
                    }}
                  >
                    Compare Selected ({selectedVehicles.length})
                  </button>
                </div>
              )}
            </main>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
