/** @format */

import React, { useState } from "react";
import { commonFeatures } from "../../utils/filterUtils";
import "./FeaturesFilter.css";

const categoryNames = [
  "Exterior Lighting",
  "Performance & Efficiency",
  "Infotainment & Connectivity",
  "Safety & Driver Assistance",
  "Comfort & Convenience",
];

const FeaturesFilter = ({ onFeaturesChange }) => {
  const [selectedFeatures, setSelectedFeatures] = useState({});

  const handleCheckboxChange = (category, feature) => {
    const newSelectedFeatures = { ...selectedFeatures };
    if (!newSelectedFeatures[category]) {
      newSelectedFeatures[category] = [];
    }
    const featureIndex = newSelectedFeatures[category].indexOf(feature);
    if (featureIndex > -1) {
      newSelectedFeatures[category].splice(featureIndex, 1);
    } else {
      newSelectedFeatures[category].push(feature);
    }
    setSelectedFeatures(newSelectedFeatures);
    if (onFeaturesChange) {
      onFeaturesChange(newSelectedFeatures);
    }
  };

  return (
    <div className='features-filter-container'>
      <h3 className='filter-title'>Features</h3>
      {commonFeatures.map((category, categoryIndex) => (
        <div key={categoryIndex} className='feature-category'>
          <h4 className='category-title'>{categoryNames[categoryIndex]}</h4>
          <div className='features-list'>
            {category.map((feature, featureIndex) => (
              <div key={featureIndex} className='feature-item'>
                <input
                  type='checkbox'
                  id={`${categoryIndex}-${featureIndex}`}
                  name={feature}
                  value={feature}
                  onChange={() =>
                    handleCheckboxChange(categoryNames[categoryIndex], feature)
                  }
                />
                <label htmlFor={`${categoryIndex}-${featureIndex}`}>
                  {feature}
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturesFilter;
