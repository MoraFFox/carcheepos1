/** @format */
import "./FavoriteCard.css";
import React from "react";
import { FiBarChart2, FiTrash2 } from "react-icons/fi";
import { useCompare } from "../../context/CompareContext/CompareContext";

const getId = (car) => car._id || car.id;

const FavoriteCard = ({ item, viewMode = "grid", compareMode = false, selectedVehicles, setSelectedVehicles, setShowCompareModal }) => {
  const { compareList, addToCompare, removeFromCompare } = useCompare();
  const isCompared = compareList.some((c) => getId(c) === getId(item));

  const handleCompare = () => {
    if (isCompared) {
      removeFromCompare(getId(item));
    } else {
      addToCompare(item);
      console.log("Compare:", item);
    }
  };

  const handleRemove = () => {
    // Add remove functionality
    console.log("Remove:", item.id);
  };

  const handleToggleFavorite = () => {
    // Add toggle favorite functionality
    console.log("Toggle favorite:", item.id);
  };

  const statusColors = {
    available: "#4caf50",
    pending: "#ff9800",
    sold: "#f44336",
  };

  const statusColorGradients = {
    available:
      "linear-gradient(90deg, rgba(76, 202, 80, 1) 0%, rgb(175, 199, 87) 100%)",
    pending:
      "linear-gradient(90deg, rgba(255, 152, 0, 1) 25%, rgba(255, 0, 89, 1) 100%)",
    sold: "linear-gradient(90deg, rgba(247, 70, 57, 1) 0%, rgba(87, 136, 199, 1) 100%)",
  };

  return (
    <div className={`favorite-card ${viewMode}`}>
      <div className='favorite-card__image'>
        <img
          src={item.image}
          alt={`${item.year} ${item.manifacture} ${item.model}`}
        />
        <span
          className='status-badge'
          style={{ background: statusColorGradients[item.status] }}
        >
          {item.status}
        </span>

      </div>
      <div className='favorite-card__content'>
        <div className='favorite-card__header'>
          <h3>
            {item.year} {item.manifacture} {item.model}
          </h3>
          <p className='price'>${item.price.toLocaleString()}</p>
        </div>

        <div className='favorite-card__details'>
          {item.mileage && (
            <span className='detail-item'>
              {item.mileage.toLocaleString()} miles
            </span>
          )}
          {item.transmission && (
            <span className='detail-item'>{item.transmission}</span>
          )}
          {item.engine_type && (
            <span className='detail-item'>{item.engine_type}</span>
          )}
        </div>
{/* 
        <div className='tags'>
          {item.tags.map((tag) => (
            <span key={tag} className='tag'>
              {tag}
            </span>
          ))}
        </div> */}

        <div className='date-added'>
          Added {new Date(item.createdAt).toLocaleDateString()}
        </div>

        <div className='actions'>
          <button className={`action-btn compare${isCompared ? " active" : ""}`} onClick={handleCompare}>
            <FiBarChart2 />
            <span>{isCompared ? "Remove from Compare" : "Compare"}</span>
          </button>
          <button className='action-btn remove' onClick={handleRemove}>
            <FiTrash2 />
            <span>Remove</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavoriteCard;
