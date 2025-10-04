import { createSlice } from '@reduxjs/toolkit';

// The initial state now holds a 'notification' object, which is null by default.
const initialState = {
  notification: null, // Will hold an object like { type: 'success', message: '...' }
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    /**
     * Replaces showError. Expects a payload object with 'type' and 'message'.
     * Example: dispatch(showNotification({ type: 'success', message: 'Logged in!' }))
     */
    showNotification: (state, action) => {
      state.notification = {
        type: action.payload.type || 'info', // Default to 'info' if no type is provided
        message: action.payload.message,
      };
    },
    // Replaces hideError. This action simply clears the notification.
    hideNotification: (state) => {
      state.notification = null;
    },
  },
});

// Export the new action creators
export const { showNotification, hideNotification } = uiSlice.actions;

// Export the reducer
export default uiSlice.reducer;

