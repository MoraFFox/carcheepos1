import React from "react";
import "./CompareTable.css";

const attributes = [
  { key: "manifacture", label: "Manufacturer" },
  { key: "model", label: "Model" },
  { key: "year", label: "Year" },
  { key: "price", label: "Price" },
  { key: "seats", label: "Seats" },
  { key: "transmission", label: "Transmission" },
  { key: "fuelType", label: "Fuel Type" },
  { key: "mileage_km", label: "Mileage (km)" },
];

function allEqual(arr) {
  return arr.every((val) => val === arr[0]);
}

const CompareTable = ({ cars }) => {
  if (!cars.length) return <div>No cars selected for comparison.</div>;
  return (
    <table className="compare-table">
      <thead>
        <tr>
          <th>Attribute</th>
          {cars.map((car) => (
            <th key={car._id}>{car.manifacture} {car.model}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {attributes.map(({ key, label }) => {
          const values = cars.map((car) => car[key] ?? "N/A");
          const matched = allEqual(values);
          return (
            <tr key={key} className={matched ? "matched" : "different"}>
              <td>{label}</td>
              {values.map((val, idx) => (
                <td key={idx}>{val}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default CompareTable;
