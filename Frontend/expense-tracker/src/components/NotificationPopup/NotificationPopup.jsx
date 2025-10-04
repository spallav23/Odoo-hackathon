import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hideNotification } from '../../store/uiSlice'; // Import the new action
import './NotificationPopup.css'; // Make sure to use the new CSS file name

// A configuration object to easily manage styles and icons for each notification type
const NOTIFICATION_CONFIG = {
  success: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Success',
    colorClass: 'notification-popup--success',
  },
  warning: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
    title: 'Warning',
    colorClass: 'notification-popup--warning',
  },
  error: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9.303 3.376c-.866-1.5.217-3.374 1.948-3.374h-14.71c-1.73 0-2.813-1.874-1.948-3.374L10.051 3.378c.866-1.5 3.032-1.5 3.898 0l2.043 3.538" />
      </svg>
    ),
    title: 'An Error Occurred',
    colorClass: 'notification-popup--error',
  },
};


const NotificationPopup = () => {
  const notification = useSelector((state) => state.ui.notification);
  const dispatch = useDispatch();

  if (!notification) {
    return null;
  }

  const handleClose = () => {
    dispatch(hideNotification());
  };

  // Get the specific config for the current notification type, or default to 'error'
  const config = NOTIFICATION_CONFIG[notification.type] || NOTIFICATION_CONFIG.error;

  return (
    <div className="notification-backdrop" onClick={handleClose}>
      <div className={`notification-popup ${config.colorClass}`} onClick={(e) => e.stopPropagation()}>
        <div className="notification-icon">{config.icon}</div>
        <h2 className="notification-title">{config.title}</h2>
        <p className="notification-message">{String(notification.message)}</p>
        <button className="notification-close-btn" onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default NotificationPopup;
