import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {
  const token = localStorage.getItem('token');
  const userInfo = JSON.parse(localStorage.getItem('clientLogin'));

  // Check if user has token and is an admin
  // if (!token || !userInfo || userInfo.type !== 'admin') {
  //   return <Navigate to="/login" replace />;
  // }
// Check if user has token and is an admin
  if (!token || !userInfo ) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />; // Render child routes
};

export default ProtectedRoute;
