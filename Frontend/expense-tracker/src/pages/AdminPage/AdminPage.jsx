import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { showNotification } from '../../store/uiSlice';
import './AdminPage.css';

// --- Helper Icons (Inlined for simplicity) ---
const SettingsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const TrashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>;
const EditIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>;


// --- Mock Data ---
const initialUsers = [
    { id: 1, name: 'Priya Kumar', email: 'priya.kumar@innovateinc.com', role: 'Admin' },
    { id: 2, name: 'Rohan Sharma', email: 'rohan.sharma@innovateinc.com', role: 'Manager' },
    { id: 3, name: 'Anjali Desai', email: 'anjali.desai@innovateinc.com', role: 'Employee' },
    { id: 4, name: 'Vikram Singh', email: 'vikram.singh@innovateinc.com', role: 'Employee' },
];

// --- Sub-Components for Admin Page ---

const SettingsView = () => {
    // In a real app, this state would be fetched and updated via an API
    const [settings, setSettings] = useState({
        companyName: 'Innovate Inc.',
        defaultCurrency: 'INR',
        approvalLevels: 2,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSettings(prev => ({ ...prev, [name]: value }));
    };
    
    return (
        <div className="admin-view settings-view">
            <h3>Company Settings</h3>
            <form className="settings-form">
                <div className="input-group">
                    <label htmlFor="companyName">Company Name</label>
                    <input type="text" id="companyName" name="companyName" value={settings.companyName} onChange={handleInputChange} />
                </div>
                <div className="input-group">
                    <label htmlFor="defaultCurrency">Default Currency</label>
                    <select id="defaultCurrency" name="defaultCurrency" value={settings.defaultCurrency} onChange={handleInputChange}>
                        <option>INR</option>
                        <option>USD</option>
                        <option>EUR</option>
                    </select>
                </div>
                <div className="input-group">
                    <label htmlFor="approvalLevels">Expense Approval Levels</label>
                    <input type="number" id="approvalLevels" name="approvalLevels" value={settings.approvalLevels} onChange={handleInputChange} min="1" max="5" />
                </div>
                <div className="form-actions">
                    <button type="submit" className="submit-button">Save Changes</button>
                </div>
            </form>
        </div>
    );
};

const UsersView = () => {
    const [users, setUsers] = useState(initialUsers);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null); // Used for editing
    const dispatch = useDispatch();

    const openModal = (user = null) => {
        setCurrentUser(user);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentUser(null);
    };

    const handleSaveUser = (user) => {
        if (user.id) { // Editing existing user
            setUsers(users.map(u => u.id === user.id ? user : u));
            dispatch(showNotification({ type: 'success', message: 'User updated successfully!' }));
        } else { // Adding new user
            const newUser = { ...user, id: Math.max(...users.map(u => u.id)) + 1 };
            setUsers([...users, newUser]);
            dispatch(showNotification({ type: 'success', message: 'User added successfully!' }));
        }
        closeModal();
    };
    
    const handleDeleteUser = (userId) => {
        // Here you would show a confirmation modal first
        setUsers(users.filter(u => u.id !== userId));
        dispatch(showNotification({ type: 'warning', message: 'User has been removed.' }));
    }

    return (
        <div className="admin-view users-view">
            <div className="view-header">
                <h3>Manage Users</h3>
                <button className="add-user-button" onClick={() => openModal()}>+ Add User</button>
            </div>
            <div className="user-table-container">
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td><span className={`role-badge role-${user.role.toLowerCase()}`}>{user.role}</span></td>
                                <td>
                                    <div className="action-buttons">
                                        <button className="edit-btn" onClick={() => openModal(user)}><EditIcon /></button>
                                        <button className="delete-btn" onClick={() => handleDeleteUser(user.id)}><TrashIcon /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isModalOpen && <UserModal user={currentUser} onSave={handleSaveUser} onClose={closeModal} />}
        </div>
    );
};

const UserModal = ({ user, onSave, onClose }) => {
    const [formData, setFormData] = useState(
        user || { name: '', email: '', role: 'Employee' }
    );

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h2>{user ? 'Edit User' : 'Add New User'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="name">Full Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="role">Role</label>
                        <select name="role" value={formData.role} onChange={handleInputChange}>
                            <option>Employee</option>
                            <option>Manager</option>
                            <option>Admin</option>
                        </select>
                    </div>
                    <div className="modal-actions">
                        <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
                        <button type="submit" className="submit-button">Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

// --- Main Admin Page Component ---
const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('users'); // Default to 'users'

  return (
    <div className="admin-page">
      <header className="page-header">
        <h1>Admin Control Panel</h1>
        <p>Manage your company's settings and user accounts.</p>
      </header>

      <div className="admin-container">
        <nav className="admin-nav">
          <button onClick={() => setActiveTab('users')} className={activeTab === 'users' ? 'active' : ''}>
            <UsersIcon /> Users
          </button>
          <button onClick={() => setActiveTab('settings')} className={activeTab === 'settings' ? 'active' : ''}>
            <SettingsIcon /> Settings
          </button>
        </nav>

        <main className="admin-content">
            {activeTab === 'settings' && <SettingsView />}
            {activeTab === 'users' && <UsersView />}
        </main>
      </div>
    </div>
  );
};

export default AdminPage;
