/**
 * @format
 * Centralized API service for interacting with the car sales backend, using axios.
 */

import axios from "axios";

// Create a pre-configured axios instance
const apiClient = axios.create({
  baseURL: "http://localhost:7500/api/v1/cars", // All requests will be prefixed with this
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10-second timeout
  withCredentials: true, // send cookies for auth
});

// Attach token from localStorage (if present) on every request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add a response interceptor to handle data and errors consistently
apiClient.interceptors.response.use(
  (response) => {
    // Log the raw response for debugging

    // The backend returns data in a nested structure { data: ... }
    // If response.data.data exists, return it, otherwise return response.data
    return response.data.data || response.data;
  },
  (error) => {
    // On error, extract the message from the response if available, otherwise use the default
    const message = error.response?.data?.message || error.message;
    return Promise.reject(new Error(message));
  }
);


// --- Exported API Methods ---

/**
 * Fetches all cars.
 * GET /api/v1/cars
 */
export const getAllCars = () => apiClient.get("/");

/**
 * Fetches a specific car by its ID (id).
 * GET /api/v1/cars/:id
 * @param {string} id - The id of the car.
 */
export const getCarById = (id) => apiClient.get(`/${id}`);

/**
 * Creates a new car.
 * POST /api/v1/cars
 * @param {object} carData - The full car object to create.
 */
export const createCar = (carData) => apiClient.post("/", carData);


/**
 * Updates an existing car.
 * PATCH /api/v1/cars/:id
 * @param {string} id - The id of the car to update.
 * @param {object} updates - An object with the fields to update.
 */
export const updateCar = (id, updates) => apiClient.patch(`/${id}`, updates);

/**
 * Deletes a car.
 * DELETE /api/v1/cars/:id
 * @param {string} id - The id of the car to delete.
 */
export const deleteCar = (id) => apiClient.delete(`/${id}`);

/**
 * Fetches all cars.
 * GET /api/v1/cars
 */
export const getUserCars = () => apiClient.get("/");