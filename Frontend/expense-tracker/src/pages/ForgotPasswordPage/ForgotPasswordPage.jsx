import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showNotification } from '../../store/uiSlice';
import './ForgotPasswordPage.css';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sending reset link to:', email);
    dispatch(showNotification({ 
      type: 'success', 
      message: 'If an account exists for this email, a reset link has been sent.' 
    }));
    setIsSubmitted(true);
  };

  return (
    <div className="forgot-password-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1>Reset Your Password</h1>
          {!isSubmitted ? (
            <p>Enter your email below, and we'll send you instructions to reset your password.</p>
          ) : (
            <p className="success-message">Please check your inbox (and spam folder) for the password reset link.</p>
          )}
        </div>

        {!isSubmitted && (
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
              />
            </div>
            <button type="submit" className="auth-button">Send Reset Instructions</button>
          </form>
        )}

        <div className="auth-footer">
          <Link to="/login">← Back to Log In</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
