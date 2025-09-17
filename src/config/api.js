// config/api.js
const API_CONFIG = {
  // Base URL for your Laravel API
  BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost/api",

  // API Endpoints
  ENDPOINTS: {
    // Authentication
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    ME: "/auth/me",
  },
};

// Helper function to build full URL
export const buildApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Export individual endpoints
export const API_ENDPOINTS = {
  LOGIN: buildApiUrl(API_CONFIG.ENDPOINTS.LOGIN),
  REGISTER: buildApiUrl(API_CONFIG.ENDPOINTS.REGISTER),
  LOGOUT: buildApiUrl(API_CONFIG.ENDPOINTS.LOGOUT),
  REFRESH: buildApiUrl(API_CONFIG.ENDPOINTS.REFRESH),
  ME: buildApiUrl(API_CONFIG.ENDPOINTS.ME),
};

export default API_CONFIG;
