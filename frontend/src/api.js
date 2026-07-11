import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000'
});

// Configure authorization token interceptor or defaults
// Using interceptors is cleaner because it dynamically updates when the token changes in localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // Set the Authorization header. Make sure the backend auth middleware supports whatever format we send (Bearer or token directly)
      config.headers['Authorization'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
