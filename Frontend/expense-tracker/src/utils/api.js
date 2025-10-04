import axios from 'axios';
import Cookies from 'js-cookie';

// 1. Get the base URL from the environment variables file (.env)
// Vite requires the VITE_ prefix for environment variables.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 2. Create a new Axios instance with a predefined configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// 3. Use an Axios interceptor to automatically add the authentication token
//    to the headers of every single outgoing request.
apiClient.interceptors.request.use(
  (config) => {
    // Get the token from the browser cookies
    const token = Cookies.get('authToken');
    
    // If the token exists, add it to the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    // Handle any errors that occur during the request setup
    return Promise.reject(error);
  }
);

export default apiClient;

/*
  --- HOW TO USE THIS FILE ---

  You can now import and use `apiClient` in any component to make
  authenticated requests without manually setting the URL or headers.

  EXAMPLE:

  import apiClient from '../utils/api';

  const loginUser = async (username, password) => {
    try {
      // The base URL is already set, just provide the endpoint
      const response = await apiClient.post('/token/', { username, password });
      
      // On success, you'll get the token in the response
      const token = response.data.access; 
      
      // You can then dispatch this token to your Redux store
      // dispatch(loginSuccess({ token }));

    } catch (error) {
      console.error("Login failed:", error);
    }
  }

*/

