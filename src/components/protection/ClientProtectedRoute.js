import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function ClientProtectedRoute() {
  const token = localStorage.getItem('token');
  const userInfo = JSON.parse(localStorage.getItem('clientLogin'));

  // Check if user is a client and has a valid token
  if (token && userInfo && userInfo.type === 'Client') {
    return <Outlet />; // Client can access the route
  }

  // If not a client, redirect to the client login page
  return <Navigate to="/login" replace />;
}

export default ClientProtectedRoute;
