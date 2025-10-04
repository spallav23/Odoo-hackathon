import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './DashboardPage.css';
import apiClient from '../../utils/api';
import { useDispatch } from 'react-redux';
import { showNotification } from '../../store/uiSlice';
import { useSelector } from 'react-redux';

const StatCard = ({ title, value, icon, color }) => (
  <div className="stat-card" style={{ '--accent-color': color }}>
    <div className="stat-card-icon">{icon}</div>
    <div className="stat-card-info">
      <span className="stat-card-title">{title}</span>
      <span className="stat-card-value">{value}</span>
    </div>
  </div>
);

const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>;
const XIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>;


const userStats = {
  total: '₹89,450.00',
  approved: '₹75,200.00',
  pending: '₹11,250.00',
  rejected: '₹3,000.00'
};



const DashboardPage = () => {
  const [userRole, setUserRole] = useState('manager'); 
  const [pendingApprovals, setpendingApprovals] = useState([])
  const [recentExpenses, setrecentExpenses] = useState([])
   const { isLoading ,user,role} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const loaddata =async()=>{
    try {
    const response = await apiClient.get('/api/expenses/');
    // setpendingApprovals(response.data);
    // setrecentExpenses(response.data);
  } catch (error) {
    console.error("Failed to submit expense:", error);
    const errorMessage = error.response?.data?.detail || 'An unexpected error occurred.';
    
    dispatch(showNotification({ type: 'error', message: `Failed to Load Data: ${errorMessage}` }));
  }
  }
  useEffect(() => {
    setUserRole(role);
    loaddata();
  }, [isLoading])
  
  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div className="header-text">
          <h1>Welcome Back, {user.name}!</h1>
          <p>Here's your expense summary and tasks for today.</p>
        </div>
        <Link to="/add-expense" className="add-expense-button">
          + Add New Expense
        </Link>
      </header>
      <section className="stats-grid">
        <StatCard title="Total Submitted" value={userStats.total} color="#4a90e2" icon={'Σ'} />
        <StatCard title="Approved" value={userStats.approved} color="#50e3c2" icon={'✓'} />
        <StatCard title="Pending" value={userStats.pending} color="#f5a623" icon={'...'} />
        <StatCard title="Rejected" value={userStats.rejected} color="#d0021b" icon={'✕'} />
      </section>
      {userRole === 'manager' && (
        <section className="dashboard-section">
          <h2>Pending Approvals</h2>
          <div className="approval-list">
            {pendingApprovals.map(item => (
              <div key={item.id} className="approval-card card">
                <div className="card-main-info">
                  <span className="employee-name">{item.employeeName}</span>
                  <span className="expense-category">{item.category} ({item.date})</span>
                </div>
                <div className="card-details">
                  <span className="expense-amount">{item.currency}{item.amount.toLocaleString()}</span>
                   <div className="action-buttons">
                    <button className="reject-button"><XIcon/></button>
                    <button className="approve-button"><CheckIcon/></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
      <section className="dashboard-section">
        <h2>Your Recent Expenses</h2>
        <div className="expense-list">
           {recentExpenses.map(item => (
              <div key={item.id} className="expense-item card">
                <div className="card-main-info">
                   <span className="expense-category">{item.category}</span>
                   <span className="expense-date">{item.date}</span>
                </div>
                <div className="card-details">
                   <span className="expense-amount">₹{item.amount.toLocaleString()}</span>
                   <span className={`status-badge status-${item.status.toLowerCase()}`}>{item.status}</span>
                </div>
              </div>
           ))}
        </div>
      </section>

    </div>
  );
};

export default DashboardPage;

