/** @format */

import React, { useState, useEffect } from "react";
import "./AICarSuggestions.css";

const AICarSuggestions = ({ car }) => {
  const [suggestions, setSuggestions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [aiTab, setAiTab] = useState("similar"); // 'similar', 'viewed', 'price'

  // Simulate user's browsing history and liked cars in local storage
  useEffect(() => {
    // In a real app, this would be stored in a database or user profile
    const viewedCars = localStorage.getItem("viewedCars")
      ? JSON.parse(localStorage.getItem("viewedCars"))
      : [];

    // Add current car to viewed history if not already there
    if (!viewedCars.includes(car.id)) {
      const updatedViewedCars = [...viewedCars, car.id].slice(-10); // Keep last 10
      localStorage.setItem("viewedCars", JSON.stringify(updatedViewedCars));
    }
  }, [car]);

  // Get user's history data
  const getUserHistory = () => {
    const viewedCars = localStorage.getItem("viewedCars")
      ? JSON.parse(localStorage.getItem("viewedCars"))
      : [];
    const likedCars = localStorage.getItem("likedCars")
      ? JSON.parse(localStorage.getItem("likedCars"))
      : [];
    return { viewedCars, likedCars };
  };

  // AI suggestions based on user's history
  const generateSuggestions = (type) => {
    setLoading(true);

    // Simulate API call with setTimeout
    setTimeout(() => {
      let result;
      const { viewedCars, likedCars } = getUserHistory();

      switch (type) {
        case "similar":
          // Find cars similar to the one being viewed
          const similarCars = carData
            .filter((c) => c.id !== car.id) // Exclude current car
            .filter(
              (c) =>
                // Similar manifactures or models, or similar price range (±20%)
                c.manifacture === car.manifacture ||
                c.model.includes(car.model) ||
                (c.price_usd >= car.price_usd * 0.8 &&
                  c.price_usd <= car.price_usd * 1.2)
            )
            .slice(0, 3); // Limit to 3 suggestions

          result = {
            title: "Cars Similar To This One",
            items: similarCars.map((c) => ({
              id: c.id,
              manifacture: c.manifacture,
              model: c.model,
              year: c.year,
              price_usd: c.price_usd,
              reason: getSimilarityReason(car, c),
            })),
          };
          break;

        case "viewed":
          // Recommend based on other cars the user has viewed
          const viewedCarDetails = carData
            .filter((c) => viewedCars.includes(c.id) && c.id !== car.id)
            .slice(0, 3);

          result = {
            title: "Based On Cars You Viewed",
            items:
              viewedCarDetails.length > 0
                ? viewedCarDetails.map((c) => ({
                    id: c.id,
                    manifacture: c.manifacture,
                    model: c.model,
                    year: c.year,
                    price_usd: c.price_usd,
                    reason: "Based on your browsing history",
                  }))
                : getSampleRecommendations(
                    car,
                    "You have not viewed many cars yet"
                  ),
          };
          break;

        case "price":
          // Recommend cars in a similar price range
          const priceSimilarCars = carData
            .filter((c) => c.id !== car.id)
            .filter((c) => {
              // Cars within ±15% of current car's price
              const minPrice = car.price_usd * 0.85;
              const maxPrice = car.price_usd * 1.15;
              return c.price_usd >= minPrice && c.price_usd <= maxPrice;
            })
            .sort(
              (a, b) =>
                // Sort by closest price match
                Math.abs(a.price_usd - car.price_usd) -
                Math.abs(b.price_usd - car.price_usd)
            )
            .slice(0, 3);

          result = {
            title: "Cars In Similar Price Range",
            items: priceSimilarCars.map((c) => ({
              id: c.id,
              manifacture: c.manifacture,
              model: c.model,
              year: c.year,
              price_usd: c.price_usd,
              reason: getPriceComparisonReason(car, c),
            })),
          };
          break;

        default:
          result = { error: "Invalid analysis type" };
      }

      setSuggestions(result);
      setLoading(false);
    }, 1500); // Simulate API delay
  };

  const handleTabChange = (tab) => {
    setAiTab(tab);
    if (!suggestions || suggestions.title !== getTabTitle(tab)) {
      generateSuggestions(tab);
    }
  };

  // Helper functions for generating reasons
  const getSimilarityReason = (currentCar, recommendedCar) => {
    if (currentCar.manifacture === recommendedCar.manifacture) {
      return `Same manufacturer with similar specifications`;
    } else if (
      Math.abs(currentCar.price_usd - recommendedCar.price_usd) <
      currentCar.price_usd * 0.1
    ) {
      return `Very similar price point with comparable features`;
    } else if (currentCar.fuel_type === recommendedCar.fuel_type) {
      return `Same fuel type with similar performance characteristics`;
    } else {
      return `Similar class of vehicle that might interest you`;
    }
  };

  const getPriceComparisonReason = (currentCar, recommendedCar) => {
    const priceDiff = recommendedCar.price_usd - currentCar.price_usd;
    const percentDiff = (priceDiff / currentCar.price_usd) * 100;

    if (Math.abs(percentDiff) < 5) {
      return `Almost identical price point`;
    } else if (percentDiff < 0) {
      return `${Math.abs(percentDiff).toFixed(1)}% less expensive alternative`;
    } else {
      return `${percentDiff.toFixed(
        1
      )}% more but with potential added features`;
    }
  };

  const getSampleRecommendations = (currentCar, reason) => {
    // Default recommendations when user history is limited
    return carData
      .filter((c) => c.id !== currentCar.id)
      .filter(
        (c) =>
          c.price_usd >= currentCar.price_usd * 0.8 &&
          c.price_usd <= currentCar.price_usd * 1.2
      )
      .slice(0, 3)
      .map((c) => ({
        id: c.id,
        manifacture: c.manifacture,
        model: c.model,
        year: c.year,
        price_usd: c.price_usd,
        reason,
      }));
  };

  const getTabTitle = (tab) => {
    switch (tab) {
      case "similar":
        return "Cars Similar To This One";
      case "viewed":
        return "Based On Cars You Viewed";
      case "price":
        return "Cars In Similar Price Range";
      default:
        return "";
    }
  };

  return (
    <div className='ai-suggestions'>
      <h2 className='ai-suggestions-title'>AI-Powered Insights</h2>

      <div className='ai-tabs'>
        <button
          className={`ai-tab ${aiTab === "similar" ? "active" : ""}`}
          onClick={() => handleTabChange("similar")}
        >
          Similar Cars
        </button>
        <button
          className={`ai-tab ${aiTab === "viewed" ? "active" : ""}`}
          onClick={() => handleTabChange("viewed")}
        >
          Based On Your History
        </button>
        <button
          className={`ai-tab ${aiTab === "price" ? "active" : ""}`}
          onClick={() => handleTabChange("price")}
        >
          Price Range Matches
        </button>
      </div>

      <div className='ai-content'>
        {loading ? (
          <div className='ai-loading'>
            <div className='spinner'></div>
            <p>Analyzing your preferences and browsing history...</p>
          </div>
        ) : suggestions ? (
          <div className='ai-results'>
            {(aiTab === "similar" ||
              aiTab === "viewed" ||
              aiTab === "price") && (
              <div className='similar-cars'>
                {suggestions.items && suggestions.items.length > 0 ? (
                  suggestions.items.map((car, index) => (
                    <div key={index} className='similar-car-card'>
                      <h4>
                        {car.year} {car.manifacture} {car.model}
                      </h4>
                      <p className='similar-car-price'>
                        ${car.price_usd.toLocaleString()}
                      </p>
                      <p className='similar-car-reason'>{car.reason}</p>
                    </div>
                  ))
                ) : (
                  <div className='no-suggestions'>
                    <p>
                      No recommendations available yet. Browse more cars to
                      improve suggestions.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className='ai-start'>
            <p>
              Select an option above to get AI-powered insights about this
              vehicle
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AICarSuggestions;
