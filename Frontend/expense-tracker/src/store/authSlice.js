import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';


const getUserFromToken = (token) => {
    if (!token) return null;
    
    return {
        name: 'Priya Kumar',
        email: 'priya.kumar@innovateinc.com',
        role: 'Admin', 
    };
};

const initialState = {
  token: null,
  isAuthenticated: false,
  user: null,
  isLoading: true,
  role:null, 
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { token } = action.payload;
      state.token = token;
      state.isAuthenticated = true;
      state.user = getUserFromToken(token);
      state.isLoading = false;
      state.role=getUserFromToken(token);
     
      Cookies.set('authToken', token, { expires: 7, secure: true, sameSite: 'strict' });
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
      state.role =null;
      Cookies.remove('authToken');
    },
    initializeAuth: (state) => {
        const token = Cookies.get('authToken');
        if (token) {
            state.token = token;
            state.isAuthenticated = true;
            state.user = getUserFromToken(token);
            state.role = getUserFromToken(token);
        }
        state.isLoading = false; 
    }
  },
});

export const { loginSuccess, logout, initializeAuth } = authSlice.actions;

export default authSlice.reducer;




