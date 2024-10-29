import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {
  const token = localStorage.getItem('token');
  const userInfo = JSON.parse(localStorage.getItem('clientLogin'));
  const adminInfo = JSON.parse(localStorage.getItem('AdminLogin'));


  // Check if user has token and is an admin
  if (!token || !adminInfo || adminInfo.type !== 'Admin') {
    return <Navigate to="/loginadmin" replace />;
  }else{
    if (!token || !userInfo ) {
      return <Navigate to="/login" replace />;
    }
  }
// Check if user has token and is an admin
  // if (!token) {
  //   return <Navigate to="/login" replace />;
  // }
  return <Outlet />; // Render child routes
};

export default ProtectedRoute;
