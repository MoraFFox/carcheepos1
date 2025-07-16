/** @format */

// Utility functions for filtering and sorting cars

// Extract unique values from an array of cars for a given property
export const getUniqueValues = (cars, property) => {
  const values = new Set(
    cars
      .map((car) => {
        const value = property.split(".").reduce((obj, key) => obj?.[key], car);
        return value;
      })
      .filter(Boolean)
  );
  return Array.from(values).sort();
};

// Get min and max values from an array of cars for a given property
export const getMinMaxValues = (cars, property) => {
  const values = cars
    .map((car) => {
      const value = property.split(".").reduce((obj, key) => obj?.[key], car);
      return typeof value === "number" ? value : null;
    })
    .filter(Boolean);

  return {
    min: Math.min(...values),
    max: Math.max(...values),
  };
};

// Format price to locale string
export const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

// Format mileage with k/m suffix
export const formatMileage = (mileage) => {
  if (mileage >= 1000000) {
    return `${(mileage / 1000000).toFixed(1)}m`;
  }
  if (mileage >= 1000) {
    return `${(mileage / 1000).toFixed(0)}k`;
  }
  return mileage.toString();
};
const Exterior_Lighting = [
  "LED Headlights / Taillights",
  "Alloy Wheels",
  "Power Side Mirrors",
  "Daytime Running Lights (DRL)",
  "Roof Rails ",
  "Rear Spoiler ",
];
const Performance_Efficiency = [
  "Automatic Transmission",
  "Front-Wheel Drive (FWD)",
  "All-Wheel Drive (AWD)",
  "Fuel-Efficient Engine",
  "Selectable Drive Modes",
];
const Infotainment_Connectivity = [
  "Touchscreen Display",
  "Apple CarPlay / Android Auto",
  "Bluetooth Connectivity",
  "USB Ports",
  "Navigation System",
  "Voice Recognition",
  "Premium Audio System",
  "Wi-Fi Hotspot",
];
const Safety_Driver_Assistance = [
  "Anti-lock Braking System (ABS)",
  "Electronic Stability Control (ESC)",
  "Traction Control",
  "Airbags (Front, Side, Curtain)",
  "Rearview Camera",
  "Blind Spot Monitoring (BSM)",
  "Lane Departure Warning (LDW)",
  "Automatic Emergency Braking (AEB)",
  "Adaptive Cruise Control (ACC)",
  "Tire Pressure Monitoring System (TPMS)",
];
const comfort_convencience = [
  "Automatic Climate Control",
  "Power Windows & Locks",
  "Keyless Entry / Push-Button Start",
  "Heated Seats",
  "Power-Adjustable Driver's Seat",
  "Remote Engine Start",
  "Cupholders",
  "Ample Storage Compartments",
  "Wireless Phone Charging",
  "Steering Wheel Controls",
  "Cruise Control",
];
// Common car features
export const commonFeatures = [
  Exterior_Lighting,
  Performance_Efficiency,
  Infotainment_Connectivity,
  Safety_Driver_Assistance,
  comfort_convencience,
];

// Common body types
export const bodyTypes = [
  "Sedan",
  "SUV",
  "Coupe",
  "Truck",
  "Van",
  "Wagon",
  "Convertible",
  "Hatchback",
  "Crossover",
  "Minivan",
];

// Fuel types
export const fuelTypes = [
  "Gasoline",
  "Diesel",
  "Electric",
  "Hybrid",
  "petrol",
  "Hydrogen",
  "Natural Gas",
];

// Transmission types
export const transmissionTypes = [
  "Automatic",
  "Manual",
  "CVT",
  "DCT",
  "Semi-Automatic",
];

