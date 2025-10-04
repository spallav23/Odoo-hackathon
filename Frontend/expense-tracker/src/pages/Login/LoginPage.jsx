import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showNotification } from '../../store/uiSlice';
import { loginUser } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../utils/api';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (isLoading) {
    return <div className="loading-fullscreen">Loading...</div>;
  }
  if (isAuthenticated) {
      dispatch(showNotification({
        type: 'success',
        message: 'Alread Loged in',
      }));
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post('/api/token/', {
        username:"Pallav", 
        password, 
      });

      const token = response.data.access; 

      if (token) {
        dispatch(loginUser({ token,email }));
        dispatch(showNotification({ type: 'success', message: 'Login successful! Welcome.' }));
        navigate('/dashboard');
      }

    } catch (error) {
      console.error("Login failed:", error);
      dispatch(showNotification({ type: 'error', message: 'Login failed. Please check your credentials.' }));
    }
    console.log('Logging in with:', email, password);
  };

  return (
    <div className="login-page">
      {/* --- Branding Panel (Visible on Desktop) --- */}
      <div className="branding-panel">
        <div className="branding-content">
          <svg className="logo" width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="#50E3C2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 7L12 12" stroke="#50E3C2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 22V12" stroke="#50E3C2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 7L12 12" stroke="#50E3C2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M17 4.5L7 9.5" stroke="#50E3C2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h2>Welcome Back</h2>
          <p>Log in to manage your team's expenses and streamline your workflow.</p>
        </div>
      </div>

      {/* --- Login Form Panel --- */}
      <div className="login-panel">
        <div className="login-form-container">
          <h1>Log In to Your Account</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  <input
                    type="email"
                    id="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
               <div className="input-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                  <input
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
              </div>
            </div>
            <button type="submit" className="login-button">
              Log In
            </button>
          </form>
          <div className="extra-links">
            <Link to="reset">Forgot password?</Link>
            <Link to="mailto:abc.admin@company.com">Contact Admin</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

