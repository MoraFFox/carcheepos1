import React from "react";
import "./StatsCard.css";

// Simple component to display a single statistic
// Props: label (string), value (string or number), icon (optional React element)
const StatsCard = ({ label, value, icon }) => {
  return (
    <div className="stats-card">
      {icon && <div className="stats-card-icon">{icon}</div>}
      <div className="stats-card-content">
        <div className="stats-card-value">{value}</div>
        <div className="stats-card-label">{label}</div>
      </div>
    </div>
  );
};

export default StatsCard;
