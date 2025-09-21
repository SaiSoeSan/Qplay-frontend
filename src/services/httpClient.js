import { clearAuth } from "@/stores/auth";

class HttpClient {
  constructor() {
    this.baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost/api";
    this.AUTH_TOKEN = import.meta.env.VITE_AUTH_TOKEN || "auth_token";
    this.EXPIRES_IN = "expires_in";
    this.USER = import.meta.env.VITE_USER;
  }

  // Get auth token from localStorage
  async getAuthToken() {
    const tokenType = "Bearer";
    const token = localStorage.getItem(this.AUTH_TOKEN);
    if (!token) return null;

    //check if token is expired
    if (this.isTokenExpired()) {
      try {
        //attempt to refresh token synchronously
        const response = await this.refreshToken();
        if (response && response.token) {
          localStorage.setItem(this.AUTH_TOKEN, response.token);
          localStorage.setItem(
            this.EXPIRES_IN,
            Date.now() + response.expires_in * 1000
          );
          return `${tokenType} ${response.token}`;
        } else {
          clearAuth();
          return null;
        }
      } catch (error) {
        clearAuth();
        return null;
      }
    }
    return token ? `${tokenType} ${token}` : null;
  }

  refreshToken = async () => {
    try {
      const currentToken = localStorage.getItem(this.AUTH_TOKEN);
      if (!currentToken) {
        throw new Error("No refresh token available");
      }
      // Use the current (expired) token for refresh request
      const response = await fetch(`${this.baseURL}/auth/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest",
          Authorization: `Bearer ${currentToken}`, // Use current token directly
        },
      });
      return await this.handleResponse(response);
    } catch (error) {
      throw error;
    }
  };

  isTokenExpired = () => {
    const expiry = localStorage.getItem(this.EXPIRES_IN);
    if (!expiry) return true;
    return Date.now() > parseInt(expiry, 10);
  };

  // Default headers
  async getHeaders(customHeaders = {}) {
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-Requested-With": "XMLHttpRequest",
      ...customHeaders,
    };

    const authToken = await this.getAuthToken();
    // authorization is token is promise and it cause unauthorized error
    if (authToken) {
      headers.Authorization = authToken;
    }

    return headers;
  }

  // Handle response
  async handleResponse(response) {
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw {
        status: response.status,
        message: data.message || "Request failed",
        data,
      };
    }
    return data;
  }

  // GET request
  async get(url, headers = {}) {
    try {
      const response = await fetch(`${this.baseURL}${url}`, {
        method: "GET",
        headers: await this.getHeaders(headers),
      });
      return await this.handleResponse(response);
    } catch (error) {
      throw error;
    }
  }

  // POST request
  async post(url, data = {}, headers = {}) {
    try {
      const response = await fetch(`${this.baseURL}${url}`, {
        method: "POST",
        headers: await this.getHeaders(headers),
        body: JSON.stringify(data),
      });
      return await this.handleResponse(response);
    } catch (error) {
      throw error;
    }
  }

  // PUT request
  async put(url, data = {}, headers = {}) {
    try {
      const response = await fetch(`${this.baseURL}${url}`, {
        method: "PUT",
        headers: await this.getHeaders(headers),
        body: JSON.stringify(data),
      });
      return await this.handleResponse(response);
    } catch (error) {
      throw error;
    }
  }

  // DELETE request
  async delete(url, headers = {}) {
    try {
      const response = await fetch(`${this.baseURL}${url}`, {
        method: "DELETE",
        headers: await this.getHeaders(headers),
      });
      return await this.handleResponse(response);
    } catch (error) {
      throw error;
    }
  }

  // PATCH request
  async patch(url, data = {}, headers = {}) {
    try {
      const response = await fetch(`${this.baseURL}${url}`, {
        method: "PATCH",
        headers: await this.getHeaders(headers),
        body: JSON.stringify(data),
      });
      return await this.handleResponse(response);
    } catch (error) {
      throw error;
    }
  }
}

export const httpClient = new HttpClient();
export const authAPI = {
  login: (credentials) => httpClient.post("/auth/login", credentials),
  register: (userData) => httpClient.post("/auth/register", userData),
  logout: () => httpClient.post("/auth/logout"),
  refresh: () => httpClient.post("/auth/refresh"),
  me: () => httpClient.get("/auth/me"),
};
