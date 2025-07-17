import React, { createContext, useState, useContext, useEffect } from 'react';
import {getCarById} from '../../utils/api';
const FavoritesContext = createContext();




export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [likedIds, setLikedIds] = useState(() => {
    const raw =  JSON.parse(localStorage.getItem('likedids')) || [];
    return Array.from(new Set(raw));
  });

  const fetchFavorites = async () => {
    try {
      const cars = await Promise.all(likedIds.map((id) => getCarById(id)));
      const unique = [];
      const seen = new Set();
      cars.forEach((car) => {
        if (!car) return;
        const key = car.id ?? car._id ?? car.vehicleId ?? null;
        if (key && !seen.has(key)) {
          seen.add(key);
          unique.push(car);
        }
      });
      setFavorites(unique);
    } catch (err) {
      console.error('Failed to fetch favorite cars', err);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [likedIds]);

  // Add a function to update likedIds and localStorage
  const updateLikedIds = (newIds) => {
    setLikedIds(newIds);
    localStorage.setItem('likedids', JSON.stringify(newIds));
  };

  return (
    <FavoritesContext.Provider value={{
      favorites,
      fetchFavorites,
      setFavorites,
      likedIds,
      setLikedIds: updateLikedIds,
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
