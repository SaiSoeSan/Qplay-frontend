import { ref, computed, watch, readonly } from "vue";
import { httpClient } from "@/services/httpClient";
import { ValidationService } from "@/services/validation";
import { AuthAPI } from "@/services/authAPI";

//use environment variables for keys

const AUTH_TOKEN = import.meta.env.VITE_AUTH_TOKEN || "auth_token";
const USER = import.meta.env.VITE_USER || "user";
const EXPIRES_IN = import.meta.env.VITE_EXPIRES_IN || "expires_in";

// Global reactive state
const user = ref(JSON.parse(localStorage.getItem(USER)) || null);
const authToken = ref(localStorage.getItem(AUTH_TOKEN) || null);
const tokenExpiry = ref(localStorage.getItem(EXPIRES_IN) || null);
const isLoading = ref(false);
const error = ref(null);

// Watch for changes and sync to localStorage
watch(
  user,
  (newUser) => {
    if (newUser) {
      localStorage.setItem(USER, JSON.stringify(newUser));
    } else {
      localStorage.removeItem(USER);
    }
  },
  { deep: true }
);

watch(authToken, (newToken) => {
  if (newToken) {
    localStorage.setItem(AUTH_TOKEN, newToken);
  } else {
    localStorage.removeItem(AUTH_TOKEN);
  }
});

watch(tokenExpiry, (newExpiry) => {
  if (newExpiry) {
    localStorage.setItem(EXPIRES_IN, newExpiry);
  } else {
    localStorage.removeItem(EXPIRES_IN);
  }
});

const isAuthenticated = computed(() => !!user.value && !!authToken.value);
const isTeacher = computed(() => user.value?.role === "teacher");
const isStudent = computed(() => user.value?.role === "student");
const userRole = computed(() => user.value?.role || null);
const userName = computed(
  () => user.value?.name || user.value?.email || "User"
);

// Actions
const login = async (credentials) => {
  isLoading.value = true;
  error.value = null;

  try {
    const validationError = ValidationService.validateLoginForm(credentials);
    if (validationError) {
      error.value = validationError;
      return errorResponse();
    }

    // Make API call to login endpoint
    const response = await AuthAPI.login(credentials);
    if (response && response.user && response.token) {
      error.value = "";

      // set state
      user.value = response.user;
      authToken.value = response.token;
      //store in milliseconds
      tokenExpiry.value = Date.now() + response.expires_in * 1000;
      return { success: true, user: response.user };
    } else {
      error.value = response?.message || "Login failed";
      return errorResponse();
    }
  } catch (err) {
    error.value = err.message;
    return errorResponse();
  } finally {
    isLoading.value = false;
  }
};

const errorResponse = () => {
  return { success: false, error: error.value };
};

const register = async (userData) => {
  isLoading.value = true;
  error.value = null;

  try {
    var validationError = ValidationService.validateRegistrationForm(userData);
    if (validationError) {
      error.value = validationError;
      return errorResponse();
    }
    const response = await AuthAPI.register(userData);

    if (response && response.user && response.token) {
      user.value = response.user;
      authToken.value = response.token;
      tokenExpiry.value = Date.now() + response.expires_in * 1000;
      error.value = "";
      return { success: true, user: response.user };
    } else {
      error.value = response?.message || "Registration failed";
      return errorResponse();
    }
  } catch (err) {
    error.value = err.message || "Registration failed";
    return { success: false, error: error.value };
  } finally {
    isLoading.value = false;
  }
};

const logout = () => {
  clearAuth();
};

export const clearAuth = () => {
  // Clear state
  user.value = null;
  authToken.value = null;
  error.value = null;
  isLoading.value = false;

  // Clear localStorage
  localStorage.removeItem(AUTH_TOKEN);
  localStorage.removeItem(USER);
  localStorage.removeItem(EXPIRES_IN);
};

const clearError = () => {
  error.value = null;
};

const initializeAuth = () => {
  user.value = JSON.parse(localStorage.getItem(USER)) || null;
  authToken.value = localStorage.getItem(AUTH_TOKEN) || null;
  tokenExpiry.value = localStorage.getItem(EXPIRES_IN) || null;

  if (
    authToken.value &&
    tokenExpiry.value &&
    Date.now() > parseInt(tokenExpiry.value)
  ) {
    clearAuth();
  }
};

export const useAuth = () => {
  return {
    user: readonly(user),
    authToken: readonly(authToken),
    isLoading: readonly(isLoading),
    error: readonly(error),

    // Computed
    isAuthenticated,
    isTeacher,
    isStudent,
    userRole,
    userName,

    // Actions
    login,
    register,
    logout,
    clearAuth,
    clearError,
    initializeAuth,
  };
};
