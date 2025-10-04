import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import apiCliant from '../utils/api';

// ✅ Async Thunk to login & fetch user data
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ token, email }) => {
    // Store token & email in cookies
    Cookies.set('authToken', token, { expires: 7, secure: true, sameSite: 'strict' });
    Cookies.set('email', email, { expires: 7, secure: true, sameSite: 'strict' });

    // Fetch users
    const response = await apiCliant.get('/api/users/company_users/');

    // Find matching user by email
    const user = response.data.find(u => u.email === email);

    return { token, user };
  }
);

// ✅ Initialize from Cookies on reload
export const initializeAuth = createAsyncThunk(
  'auth/initializeAuth',
  async () => {
    const token = Cookies.get('authToken');
    const email = Cookies.get('email');

    if (!token || !email) return { token: null, user: null };

    const response = await apiCliant.get('/api/users/company_users/');
    const user = response.data.find(u => u.email === email);
    return { token, user };
  }
);

// ✅ Slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    isAuthenticated: false,
    user: null,
    isLoading: false,
    role: null,
    email: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
      state.role = null;
      Cookies.remove('authToken');
      Cookies.remove('email');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.role = action.payload.user?.role;
        state.email = action.payload.user?.email;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.role = action.payload.user?.role;
        state.email = action.payload.user?.email;
        state.isAuthenticated = !!action.payload.token;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
