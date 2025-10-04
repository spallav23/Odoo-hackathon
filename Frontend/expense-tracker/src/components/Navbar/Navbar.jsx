import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-logo" onClick={closeMenu}>
          {/* SVG inspired by the first logo concept */}
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="#007BFF" strokeWidth="2"/>
            <path d="M7 14L9 12L12 15L17 10" stroke="#34D399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 16V12" stroke="#007BFF" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round"/>
            <path d="M12 16V10" stroke="#007BFF" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round"/>
            <path d="M17 16V14" stroke="#007BFF" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span>ExpenseFlow</span>
        </Link>

        <div className={`hamburger-menu ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <NavLink to="/dashboard" className="nav-link" onClick={closeMenu}>
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/expenses" className="nav-link" onClick={closeMenu}>
              Expenses
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/reports" className="nav-link" onClick={closeMenu}>
              Reports
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/settings" className="nav-link" onClick={closeMenu}>
              Settings
            </NavLink>
          </li>
           <li className="nav-item-mobile">
            <Link to="/logout" className="nav-link-button" onClick={closeMenu}>
              Logout
            </Link>
          </li>
        </ul>
        
        <Link to="/logout" className="nav-button-desktop" onClick={closeMenu}>
          Logout
        </Link>

      </div>
    </nav>
  );
};

export default Navbar;
