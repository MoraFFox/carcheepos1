import React, { createContext, useContext, useState, useEffect } from "react";

const CompareContext = createContext();

export const useCompare = () => useContext(CompareContext);

export const CompareProvider = ({ children }) => {
  const [compareList, setCompareList] = useState([]);
  const [compareVehicle, setCompareVehicle] = useState([]);
  const addToCompareVehicle = (car) => {
    setCompareVehicle((prev) => {
      const simpleCar = car.map((car) => {
        const {
          _id: id,
          price,
          mileage_km,
          manifacture,
          model,
          transmission,
          seats,
          engine: { fuelType, horsepower },
          type,
          features,
          color,
        } = car;
        return {
          id,
          price,
          mileage_km,
          manifacture,
          model,
          transmission,
          seats,
          fuelType,
          horsepower,
          type,
          features,
          color,
        };
      });
      setCompareVehicle(simpleCar);
    });
  };
  useEffect(() => {
    addToCompareVehicle(compareList);
  }, [compareList]);
  const addToCompare = (car) => {
    setCompareList((prev) =>
      prev.find((c) => c._id === car._id) ? prev : [...prev, car]
    );
  };
  const removeFromCompare = (carId) => {
    setCompareList((prev) => prev.filter((c) => c._id !== carId));
  };
  return (
    <CompareContext.Provider
      value={{
        compareList,
        addToCompare,
        removeFromCompare,
        compareVehicle,
        setCompareVehicle,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};
