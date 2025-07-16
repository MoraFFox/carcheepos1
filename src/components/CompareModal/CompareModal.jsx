/** @format */

import React, { useRef, useState } from "react";
import { FiX, FiTrash2 } from "react-icons/fi";
import "./CompareModal.css";
import { useEffect } from "react";
const CompareModal = ({ isOpen, onClose, vehicles, onRemoveVehicle }) => {
const attrRef = useRef(null);
  const [isDiff, setIsDiff] = useState(false);




  if (isOpen) return null;
    const feat = [Object.values(vehicles).map((feature) => Array(Object.values(feature.features)).flat())].flat(3);
  const compareAttributes = [
    {
      key: "price",
      label: "Price",
      format: (value) => `$${value.toLocaleString()}`,
    },
    {
      key: "mileage_km",
      label: "Mileage",
      format: (value) => `${value.toLocaleString()} miles`,
    },
    { key: "manifacture", label: "manifacture",
      format: value => value,
    },
    { key: "model", label: "Model" },
    { key: "transmission", label: "Transmission" },
    { key: "fuelType", label: "Fuel Type"},
    { key: "type", label: "Body Type" },
    { key: "horsepower", label: "HP"},
    {
      key: "features",
      label: "Features",
      format: (value) => feat,
    },
  ];



function allEqual(arr) {
    return arr.every((val) => val === arr[0]);
  }


  // Helper function to get display value for an attribute
  const getDisplayValue = (attr, value) => {

    if (value === undefined) {
      return "?";
    } else if (attr.format) {
      return attr.format(value);
    } else if (Array.isArray(value)) {
      return value.join(" , ");
    } else if ( typeof value === "object") {
      return value[attr.key];
    } else {
      return value;
    }
  };


  return (
    <div className="compare-modal">
      <div className="compare-modal__content">
        <div className="compare-modal__header">
          <h2>Compare Vehicles</h2>
          <button className="close-btn" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <div className="compare-modal__body">
          <div className="compare-table">
            <div className="compare-column attribute-column">
              <div className="image-cell">
                <span>Vehicle</span>
              </div>
              {compareAttributes.map((attr,id) => 
              (
                <div key={id} className={`attributes-cell ${id % 2 === 0 ? "cross-1" : "cross-2"} ${isDiff ? "different" : ""}`}>
                  {attr.label}
                </div>
              )
            )}
            </div>

            {vehicles.map((vehicle) => (
              <div key={vehicle.id} className="compare-column">
                <div className="image-cell">

                    <button
                      className="remove-vehicle-btn"
                      onClick={() => onRemoveVehicle(vehicle._id)}
                    >
                      <FiTrash2 />
                    </button>

                  <h3>
                    {vehicle.year} {vehicle.manifacture.toUpperCase()}
                  </h3>
                  <h4>{vehicle.model}</h4>
                </div>

                {compareAttributes.map((attr, id) => {
                  const value = vehicle[attr.key];
                  const values = vehicles.map((v) => v[attr.key]);
                  const highlightClass = !allEqual(values) ? "different" : "";
                  const displayValue = getDisplayValue(attr, value);

                  return (
                    <div
                      key={id}
                      className={`attribute-cell ${highlightClass} ${id % 2 === 0 ? "cross-1" : "cross-2"}`}
                      ref={attrRef}
                    >
                      {displayValue&& (Array.isArray(displayValue)?
                      displayValue.map((feature,index) => {
                        const VFeature =Object.values(value).flat()
                        if(VFeature.includes(feature)){
                          return <div key={index} className="included-feature">{feature}</div>
                        }
                        return <div key={index} className="included-feature not">{feature}</div>
                      })
                      :displayValue)}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareModal;
