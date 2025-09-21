import axios from 'axios';

// Ensure API_URL includes the full path with /api prefix
const API_URL = process.env.REACT_APP_API_URL + '/auth';

// Configure axios defaults for production
const axiosInstance = axios.create({
  timeout: 10000, // 10 second timeout
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add request interceptor for logging
axiosInstance.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const register = (name, email, password) =>
  axiosInstance.post(`${API_URL}/register`, { name, email, password });

export const login = (email, password) =>
  axiosInstance.post(`${API_URL}/login`, { email, password });





