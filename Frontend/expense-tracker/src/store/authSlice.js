import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

// Helper function to get user data from a token (simulated)
// In a real app, you would decode a JWT here.
const getUserFromToken = (token) => {
    if (!token) return null;
    // This is a placeholder. In a real scenario, you'd decode the token
    // to get user details like name, email, role, etc.
    return {
        name: 'Priya Kumar',
        email: 'priya.kumar@innovateinc.com',
        role: 'Admin', // This could be 'Manager', 'Employee', etc.
    };
};

const initialState = {
  token: null,
  isAuthenticated: false,
  user: null,
  isLoading: true,
  role:null, // To show a loader while checking for the cookie
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action to handle successful login
    loginSuccess: (state, action) => {
      const { token } = action.payload;
      state.token = token;
      state.isAuthenticated = true;
      state.user = getUserFromToken(token);
      state.isLoading = false;
      state.role=getUserFromToken(token);
      // Set the cookie to expire in 7 days
      Cookies.set('authToken', token, { expires: 7, secure: true, sameSite: 'strict' });
    },
    // Action to handle logout
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
      state.role =null;
      Cookies.remove('authToken');
    },
    // Action to initialize authentication from cookie
    initializeAuth: (state) => {
        const token = Cookies.get('authToken');
        if (token) {
            state.token = token;
            state.isAuthenticated = true;
            state.user = getUserFromToken(token);
            state.role = getUserFromToken(token);
        }
        state.isLoading = false; // Finished checking
    }
  },
});

export const { loginSuccess, logout, initializeAuth } = authSlice.actions;

export default authSlice.reducer;




