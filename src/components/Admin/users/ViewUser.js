import React, { useEffect, useState } from 'react';
import Navbar from '../layouts/NavbarAdmin';
import Footer from '../layouts/FooterAdmin';
import SidebarAdmin from '../layouts/SidebarAdmin';
import { useParams } from 'react-router-dom';

function ViewUser() {
    const { userId } = useParams();  // Récupérer le paramètre userId depuis l'URL

  const [userData, setUserData] = useState(null);
  const API_BASE_URL = `${process.env.REACT_APP_API_URL}`+'';

  useEffect(() => {
    // Fetch user data when component mounts
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/admin/user/${userId}`,{
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          });
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  if (!userData) {
    return <div>Loading...</div>; // Display loading state
  }

  return (
    <>
      <SidebarAdmin />
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
        <Navbar />
        <div className="container mt-5">
          <h2 className="text-center">User Details</h2>
          <div className="card">
            <div className="card-body">
              <div className="text-center">
                <img
                  src={userData.image || 'default-avatar.png'} // Provide a default image if none exists
                  alt="User Avatar"
                  className="rounded-circle mb-3"
                  style={{ width: '150px', height: '150px' }}
                />
                <h3>{userData.name}</h3>
                <h5 className="text-muted">{userData.userType}</h5>
              </div>
              <hr />
              <div className="row">
                <div className="col-md-6">
                  <p><strong>Email:</strong> {userData.email}</p>
                  <p><strong>Password:</strong> **********</p> {/* Mask the password */}
                </div>
                <div className="col-md-6">
                  <p><strong>User Type:</strong> {userData.userType}</p>
                  <p><strong>Registered On:</strong> {new Date(userData.createdAt).toLocaleDateString()}</p> {/* Adjust according to your date format */}
                </div>
              </div>
              <div className="text-center">
                <button className="btn btn-primary" onClick={() => window.history.back()}>Back</button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}

export default ViewUser;
