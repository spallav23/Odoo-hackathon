import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { showNotification } from '../store/uiSlice';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user, isLoading ,role} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // This effect is used to show notifications without causing render-loop issues.
  const showAccessDeniedNotification = () => {
    dispatch(showNotification({
      type: 'error',
      message: 'Access Denied: You do not have permission to view this page.',
    }));
  };

  const showLoginRequiredNotification = () => {
     dispatch(showNotification({
      type: 'warning',
      message: 'Access restricted. Please log in to continue.',
    }));
  };
  
  // 1. Wait while Redux initializes auth state from cookies
  if (isLoading) {
    // You can return a loading spinner here for a better UX
    return <div className="loading-fullscreen">Loading...</div>;
  }

  // 2. Check if the user is authenticated
  if (!isAuthenticated) {
    // Show notification only once when redirecting
    showLoginRequiredNotification();
    return <Navigate to="/login" replace />;
  }

  // 3. Check if the user's role is allowed
  if (allowedRoles && !allowedRoles.includes(role)) {
    // Show notification only once when redirecting
    showAccessDeniedNotification();
    return <Navigate to="/" replace />; // Redirect to login as requested
  }

  // 4. If all checks pass, render the protected page
  return children;
};

export default ProtectedRoute;