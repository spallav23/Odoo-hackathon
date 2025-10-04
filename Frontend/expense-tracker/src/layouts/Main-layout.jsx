import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';


const MainLayout = () => {
  return (
    <div className="app-layout">
      <Navbar/>
      <main className="app-content">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;