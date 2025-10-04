import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css';
const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <svg
          className="not-found-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="80"
          height="80"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          <line x1="11" y1="8" x2="11" y2="11"></line>
          <line x1="11" y1="14" x2="11.01" y2="14"></line>
        </svg>
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Page Not Found</h2>
        <p className="not-found-text">
          Sorry, we couldn't find the page you were looking for. It might have been moved, deleted, or you may have mistyped the address.
        </p>
        <Link to="/" className="not-found-button">
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
