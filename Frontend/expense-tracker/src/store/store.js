import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './uiSlice'; 
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    auth:authReducer,
    ui: uiReducer,
  },
});
