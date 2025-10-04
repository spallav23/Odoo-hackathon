import React from 'react';
import { useError } from '../context/ErrorContext';
import './ErrorPopup.css';

const ErrorPopup = () => {
  const { error, hideError } = useError();

  // If there's no error, render nothing
  if (!error) {
    return null;
  }

  return (
    <div className="error-backdrop" onClick={hideError}>
      <div className="error-popup" onClick={(e) => e.stopPropagation()}>
        <div className="error-icon">
          {/* Simple inline SVG for an error icon */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
        </div>
        <h2 className="error-title">An Error Occurred</h2>
        <p className="error-message">{error}</p>
        <button className="error-close-btn" onClick={hideError}>
          Dismiss
        </button>
      </div>
    </div>
  );
};

export default ErrorPopup;
