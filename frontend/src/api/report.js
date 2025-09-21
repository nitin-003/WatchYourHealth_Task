import axios from 'axios';

// Ensure API_URL includes the full path with /api prefix
const API_URL = process.env.REACT_APP_API_URL + '/report';

// Configure axios defaults for production
const axiosInstance = axios.create({
  timeout: 30000, // 30 second timeout for report generation
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

export const generateReport = (session_id, token) =>
  axiosInstance.post(
    `${API_URL}/generate-report`,
    { session_id },
    { headers: { Authorization: `Bearer ${token}` } }
  );

export const downloadReport = (session_id, token) =>
  axiosInstance.get(`${API_URL}/download/${session_id}`, {
    headers: { Authorization: `Bearer ${token}` },
    responseType: 'blob',
    timeout: 60000 // 60 second timeout for downloads
  });



  