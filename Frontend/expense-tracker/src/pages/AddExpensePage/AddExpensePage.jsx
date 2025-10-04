import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showNotification } from '../../store/uiSlice';
import './AddExpensePage.css';

// --- Helper Icons (Inlined for simplicity) ---
const UploadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const AddExpensePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Set initial date to today in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    date: today,
    category: '',
    amount: '',
    currency: 'INR',
    description: '',
  });
  const [receiptFile, setReceiptFile] = useState(null);
  const [receiptPreview, setReceiptPreview] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setReceiptFile(file);
      setReceiptPreview(URL.createObjectURL(file));
    } else {
      setReceiptFile(null);
      setReceiptPreview('');
      if (file) { // if a file was selected but it wasn't an image
        dispatch(showNotification({ type: 'error', message: 'Please upload a valid image file.' }));
      }
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting Expense:", { ...formData, receipt: receiptFile });
    // In a real app, you would send this to your API
    
    dispatch(showNotification({ type: 'success', message: 'Expense submitted successfully!' }));
    navigate('/dashboard'); // Navigate back to the dashboard
  };

  return (
    <div className="add-expense-page">
      <header className="page-header">
        <h1>Add New Expense</h1>
        <p>Fill out the details below and upload your receipt.</p>
      </header>
      
      <div className="expense-form-container">
        <form onSubmit={handleSubmit} className="expense-form">
          {/* --- Form Fields --- */}
          <div className="form-grid">
            <div className="input-group">
              <label htmlFor="date">Date of Expense</label>
              <input type="date" id="date" name="date" value={formData.date} onChange={handleInputChange} required />
            </div>
            <div className="input-group">
              <label htmlFor="category">Category</label>
              <select id="category" name="category" value={formData.category} onChange={handleInputChange} required>
                <option value="" disabled>Select a category...</option>
                <option value="Travel">Travel</option>
                <option value="Client Lunch">Client Lunch</option>
                <option value="Software">Software</option>
                <option value="Office Supplies">Office Supplies</option>
                <option value="Team Dinner">Team Dinner</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="input-group amount-group">
              <label htmlFor="amount">Amount</label>
              <div className="amount-input">
                <input type="number" id="amount" name="amount" value={formData.amount} onChange={handleInputChange} placeholder="0.00" required step="0.01" />
                <select id="currency" name="currency" value={formData.currency} onChange={handleInputChange}>
                  <option>INR</option>
                  <option>USD</option>
                  <option>EUR</option>
                  <option>GBP</option>
                </select>
              </div>
            </div>
             <div className="input-group description-group">
                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} placeholder="e.g., Lunch with the team from Innovate Inc." rows="4" required></textarea>
            </div>
          </div>

          {/* --- Receipt Upload --- */}
          <div className="upload-section">
            <label>Receipt</label>
            <div className="drop-zone">
              <input type="file" id="receipt" name="receipt" onChange={handleFileChange} accept="image/*" className="file-input"/>
              {receiptPreview ? (
                <img src={receiptPreview} alt="Receipt Preview" className="receipt-preview" />
              ) : (
                <div className="upload-prompt">
                  <UploadIcon />
                  <span><strong>Click to upload</strong> or drag and drop</span>
                  <span className="upload-hint">PNG, JPG, or GIF</span>
                </div>
              )}
            </div>
          </div>

          {/* --- Action Buttons --- */}
          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={() => navigate('/dashboard')}>Cancel</button>
            <button type="submit" className="submit-button">Save Expense</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpensePage;
