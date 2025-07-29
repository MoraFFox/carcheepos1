/** @format */

// Routing helpers for authentication
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext/AuthContext";

// Redirect based on auth status for landing/root
export const AuthRedirect = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
};

// Public-only routes (login, signup)
export const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
};

// Private routes that require auth
export const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return !isAuthenticated ? <Navigate to="/auth/login" replace /> : children;
};





