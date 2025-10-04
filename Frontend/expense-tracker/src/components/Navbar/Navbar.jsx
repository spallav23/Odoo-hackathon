import React, { useState } from 'react';
import { Link, NavLink ,useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';
import './Navbar.css'; 

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
   const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  }
  const handleLogout = () => {
    dispatch(logout());
    closeMenu();
    navigate('/');
  };

  // Helper to get user initial
  const userInitial = user?.name?.charAt(0) || 'U';
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
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
            <NavLink to="/admin" className="nav-link" onClick={closeMenu}>
              Admin
            </NavLink>
          </li>
           
          <li className="nav-item-mobile">
            {isAuthenticated ? (
              <button className="nav-link-button" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <div className="mobile-auth-buttons">
                <Link to="/login" className="nav-link-button login" onClick={closeMenu}>Login</Link>
                <Link to="/register" className="nav-link-button register" onClick={closeMenu}>Sign Up</Link>
              </div>
            )}
          </li>
        </ul>
        
        <div className="nav-auth-desktop">
          {isAuthenticated ? (
            <div className="user-menu-desktop">
              <div className="user-avatar">{userInitial}</div>
              <div className="dropdown-container">
                <button className="dropdown-button">Hi, {user?.name?.split(' ')[0]}</button>
                <div className="dropdown-content">
                  <button onClick={handleLogout}>Logout</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="desktop-auth-buttons">
              <Link to="/login" className="nav-button-desktop login">Login</Link>
              <Link to="/register" className="nav-button-desktop register">Get Started</Link>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
