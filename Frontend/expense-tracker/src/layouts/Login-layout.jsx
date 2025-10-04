import React from 'react';
import { Outlet } from 'react-router-dom';


const LoginLayout = () => {
  return (

    <main className="login-layout">
      <Outlet />
    </main>
  );
};

export default LoginLayout;