import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';


function AdminProtectedRoute() {
  const token = localStorage.getItem('token');
  const adminInfo = JSON.parse(localStorage.getItem('AdminLogin'));

  // Check if user is an admin and has a valid token
  if (token && adminInfo && adminInfo.type === 'Admin') {
    return <Outlet />; // Admin can access the route
  }

  // If not an admin, redirect to the admin login page
  return <Navigate to="/loginadmin" replace />;
}

export default AdminProtectedRoute;
