import React, { useState, useMemo } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import './ExpensesPage.css';

// --- Helper Icons (Unchanged) ---
const ArrowUpIcon = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 19V5M5 12l7-7 7 7"/></svg>;
const ArrowDownIcon = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>;

// --- Mock Data (Slightly adjusted for the library) ---
const COLORS = ['#4a90e2', '#50e3c2', '#f5a623', '#bd10e0', '#9013fe'];

const cfoData = {
    byCategory: [
        { name: 'Travel', value: 450000 },
        { name: 'Software', value: 280000 },
        { name: 'Client Meals', value: 320000 },
        { name: 'Hardware', value: 150000 },
        { name: 'Other', value: 95000 },
    ],
    byTeam: [
        { name: 'Sales', Expenses: 650000 },
        { name: 'Engineering', Expenses: 430000 },
        { name: 'Marketing', Expenses: 215000 },
    ],
    allExpenses: [ /* Unchanged */
        { id: 1, name: 'Rohan Sharma', team: 'Sales', date: '2025-10-03', category: 'Client Lunch', amount: 4500 },
        { id: 2, name: 'Anjali Desai', team: 'Engineering', date: '2025-10-02', category: 'Travel', amount: 6750 },
        { id: 3, name: 'Vikram Singh', team: 'Sales', date: '2025-09-28', category: 'Software', amount: 12000 },
        { id: 4, name: 'Priya Kumar', team: 'Engineering', date: '2025-09-27', category: 'Hardware', amount: 25000 },
    ],
};

const managerData = {
    byCategory: [
        { name: 'Travel', value: 75000 },
        { name: 'Client Meals', value: 42000 },
        { name: 'Software', value: 28000 },
        { name: 'Other', value: 15000 },
    ],
    byEmployee: [
        { name: 'Anjali D.', Expenses: 62000 },
        { name: 'Rohan S.', Expenses: 58000 },
        { name: 'Vikram S.', Expenses: 40000 },
    ],
    allExpenses: cfoData.allExpenses.slice(0,3),
};

// --- Main Expenses Page Component ---
const ExpensesPage = () => {
  const [userRole, setUserRole] = useState('cfo');
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'descending' });
  const data = userRole === 'cfo' ? cfoData : managerData;

  const sortedExpenses = useMemo(() => {
    // ... (sorting logic is unchanged)
    let sortableItems = [...data.allExpenses];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [data.allExpenses, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') direction = 'descending';
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'ascending' ? <ArrowUpIcon /> : <ArrowDownIcon />;
  };

  const chartData = userRole === 'cfo' ? data.byTeam : data.byEmployee;
  
  return (
    <div className="expenses-page-new">
      <div className="role-switcher">
        <strong>Demo View:</strong>
        <button onClick={() => setUserRole('cfo')} className={userRole === 'cfo' ? 'active' : ''}>CFO</button>
        <button onClick={() => setUserRole('manager')} className={userRole === 'manager' ? 'active' : ''}>Manager</button>
      </div>

      <header className="page-header"><h1>Expense Analytics</h1></header>
      
      <div className="charts-grid">
        <div className="chart-card glass-effect">
          <h3>Expenses by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={data.byCategory} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={5}>
                {data.byCategory.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-card glass-effect">
           <h3>{userRole === 'cfo' ? 'Expenses by Team' : 'Expenses by Employee'}</h3>
           <ResponsiveContainer width="100%" height={300}>
             <BarChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff22" />
                <XAxis dataKey="name" stroke="#ffffff" fontSize={12} />
                <YAxis stroke="#ffffff" fontSize={12} tickFormatter={(value) => `₹${value/1000}k`} />
                <Tooltip cursor={{fill: 'rgba(255, 255, 255, 0.1)'}} contentStyle={{ backgroundColor: '#0d253f', border: 'none', color: '#fff' }} />
                <Legend />
                <Bar dataKey="Expenses" fill="#50e3c2" radius={[4, 4, 0, 0]} />
            </BarChart>
           </ResponsiveContainer>
        </div>
      </div>

      <div className="table-section glass-effect">
        <h3>All Expense Transactions</h3>
        <div className="table-container">
            <table className="expenses-table">
                <thead>
                    <tr>
                        <th onClick={() => requestSort('name')}>Name {getSortIcon('name')}</th>
                        {userRole === 'cfo' && <th onClick={() => requestSort('team')}>Team {getSortIcon('team')}</th>}
                        <th onClick={() => requestSort('date')}>Date {getSortIcon('date')}</th>
                        <th onClick={() => requestSort('category')}>Category {getSortIcon('category')}</th>
                        <th onClick={() => requestSort('amount')}>Amount {getSortIcon('amount')}</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedExpenses.map(exp => (
                        <tr key={exp.id}>
                            <td>{exp.name}</td>
                            {userRole === 'cfo' && <td>{exp.team}</td>}
                            <td>{exp.date}</td>
                            <td>{exp.category}</td>
                            <td>₹{exp.amount.toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default ExpensesPage;

