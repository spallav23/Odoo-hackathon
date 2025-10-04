import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showNotification } from '../../store/uiSlice';
import './RegisterPage.css';
import { loginSuccess } from '../../store/authSlice';
import apiClient from '../../utils/api'

const ProgressStep = ({ stepNumber, label, isActive }) => (
  <div className={`progress-step ${isActive ? 'active' : ''}`}>
    <div className="step-circle">{stepNumber}</div>
    <span>{label}</span>
  </div>
);

const RegisterPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: '',
    country: 'India', 
    currency: 'INR',
    adminName: '',
    adminEmail: '',
    password: '',
  });
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post('/api/create-company-admin/', {
        formData
      });

      const token = response.data.access; 

      if (token) {
        const email = formData.adminEmail
        dispatch(loginSuccess({ token,email }));
        dispatch(showNotification({ type: 'success', message: 'Register successful! Welcome.' }));
        navigate('/dashboard');
      }

    } catch (error) {
      console.error("Register failed:", error);
      dispatch(showNotification({ type: 'error', message: 'Register failed. Please Try again latter.' }));
    }
  };
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
    if (isLoading) {
      return <div className="loading-fullscreen">Loading...</div>;
    }
    if (isAuthenticated) {
      dispatch(showNotification({
        type: 'success',
        message: 'Alread Register in',
      }));
      
      return <Navigate to="/dashboard" replace />;
    }
  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-header">
          <h1>Set Up Your Company</h1>
          <p>Join thousands of businesses streamlining their expenses.</p>
        </div>
        <div className="progress-bar">
          <ProgressStep stepNumber={1} label="Company" isActive={currentStep >= 1} />
          <div className={`progress-line ${currentStep > 1 ? 'active' : ''}`}></div>
          <ProgressStep stepNumber={2} label="Admin" isActive={currentStep >= 2} />
           <div className={`progress-line ${currentStep > 2 ? 'active' : ''}`}></div>
          <ProgressStep stepNumber={3} label="Review" isActive={currentStep >= 3} />
        </div>
        <form onSubmit={handleSubmit}>
          <div className={`form-step ${currentStep === 1 ? 'active' : ''}`}>
            <h2>Company Details</h2>
            <div className="input-group">
              <label htmlFor="companyName">Company Name</label>
              <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleInputChange} placeholder="e.g., Innovate Inc." required />
            </div>
            <div className="input-group">
              <label htmlFor="country">Country</label>
              <select id="country" name="country" value={formData.country} onChange={handleInputChange}>
                {/* Add more countries as needed */}
                <option value="India">India (INR)</option>
                <option value="United States">United States (USD)</option>
                <option value="United Kingdom">United Kingdom (GBP)</option>
                 <option value="Germany">Germany (EUR)</option>
              </select>
            </div>
            <div className="button-group">
              <button type="button" className="next-button" onClick={nextStep}>Next: Create Admin</button>
            </div>
          </div>
          <div className={`form-step ${currentStep === 2 ? 'active' : ''}`}>
            <h2>Your Admin Account</h2>
             <div className="input-group">
              <label htmlFor="adminName">Full Name</label>
              <input type="text" id="adminName" name="adminName" value={formData.adminName} onChange={handleInputChange} placeholder="e.g., Priya Kumar" required />
            </div>
            <div className="input-group">
              <label htmlFor="adminEmail">Work Email</label>
              <input type="email" id="adminEmail" name="adminEmail" value={formData.adminEmail} onChange={handleInputChange} placeholder="you@company.com" required />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="Minimum 8 characters" required />
            </div>
             <div className="button-group space-between">
              <button type="button" className="prev-button" onClick={prevStep}>Back</button>
              <button type="button" className="next-button" onClick={nextStep}>Next: Review</button>
            </div>
          </div>
          <div className={`form-step ${currentStep === 3 ? 'active' : ''}`}>
             <h2>Review Your Details</h2>
             <div className="review-details">
                <p><strong>Company Name:</strong> {formData.companyName}</p>
                <p><strong>Country:</strong> {formData.country}</p>
                <p><strong>Admin Name:</strong> {formData.adminName}</p>
                <p><strong>Admin Email:</strong> {formData.adminEmail}</p>
             </div>
             <div className="button-group space-between">
                <button type="button" className="prev-button" onClick={prevStep}>Back</button>
                <button type="submit" className="submit-button">Create Company</button>
             </div>
          </div>
        </form>
         <div className="login-link">
            <p>Already have an account? <Link to="/login">Log In</Link></p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
