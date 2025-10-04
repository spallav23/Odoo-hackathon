import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import apiCliant from '../utils/api'


const getUserFromToken = async(token,email) => {
    if (!token) return null;
    try{
      const responce =apiCliant.get('/api/users/company_users/');
      console.log(responce);
      return  responce.data.find(u => u.email === email);
      
    }
    catch(e){
      console.log(e);
      return null;
      
    }

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
      console.log(action.payload);
      
      const { token } = action.payload;
      state.token = token;
      state.isAuthenticated = true;
      state.user = getUserFromToken(token,action.payload.email);
      state.isLoading = false;
      state.role=getUserFromToken(token,action.payload.email);
      state.email=action.payload.email
     
      Cookies.set('authToken', token, { expires: 7, secure: true, sameSite: 'strict' });
      Cookies.set('email', state.email, { expires: 7, secure: true, sameSite: 'strict' });
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
        const email = Cookies.get('email');
        if (token) {
            state.token = token;
            state.isAuthenticated = true;
            state.user = getUserFromToken(token,email);
            state.role = getUserFromToken(token,email);
        }
        state.isLoading = false; 
    }
  },
});

export const { loginSuccess, logout, initializeAuth } = authSlice.actions;

export default authSlice.reducer;




