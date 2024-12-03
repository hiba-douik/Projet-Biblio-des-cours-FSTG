// Logout.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear all localStorage
    localStorage.clear();
    
    // Or clear specific items if you prefer:
    // localStorage.removeItem('jwt_token');
    // localStorage.removeItem('user_data');
    
    // Add any additional cleanup here (e.g., reset global state)
    
    // Redirect to login page
    navigate('/');
  }, [navigate]);

  // Optional: Show a loading message while logging out
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-700">Logging out...</h2>
        <p className="text-gray-500 mt-2">Please wait while we securely log you out.</p>
      </div>
    </div>
  );
};

export default Logout;