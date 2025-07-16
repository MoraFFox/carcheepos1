/** @format */
import instance from "../../api/API-URL-AXIOS.JS";
import { createContext, useEffect, useState } from "react";
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);



const refreshAccessToken = async () => {
  try {
    const refresh_token = localStorage.getItem("refreshToken");
    
    if (!refresh_token) {
      return;
    }

    const response = await instance.post("/api/v1/refresh-session", {
      refresh_token: refresh_token
    });

    const { jwtToken, userData } = response.data;
    
    // Update the access token in localStorage
    localStorage.setItem("token", jwtToken);
    setToken(jwtToken);
    
    // Optionally update user data if needed
    setUser(userData);
    
  } catch (error) {
    console.error("Failed to refresh access token:", error);
    // Optionally handle failed refresh (e.g., logout user)
  }
};
  useEffect(() => {
    // Check for saved token and user data on initial load
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    const savedRefreshToken = localStorage.getItem("refreshToken");

    if (savedToken && savedUser && savedRefreshToken) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
    refreshAccessToken();
   // Set up 15-minute interval for token refresh
   const refreshInterval = setInterval(() => {
    if (isAuthenticated) {
      refreshAccessToken();
    }
  }, 15 * 60 * 1000); // 15 minutes in milliseconds

  // Cleanup interval on unmount
  return () => {
    clearInterval(refreshInterval);
  };
 
  }, [isAuthenticated]);



  // --- login ---//
  const login = (newToken,refreshToken,userData) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("user", JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);
    setIsAuthenticated(true);
  };

  const updateProfile = (updates) => {
    setUser((prev) => {
      const updated = { ...prev, ...updates };
      localStorage.setItem("user", JSON.stringify(updated));
      return updated;
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("refreshToken");
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };
  return (
    <AuthContext.Provider
      value={{ auth, setAuth, login, logout, updateProfile, token, user, isAuthenticated, refreshAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
