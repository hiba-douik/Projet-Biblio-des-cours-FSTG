import React, { useState, useEffect } from 'react';
import Navbar from '../layouts/NavbarAdmin';
import Footer from '../layouts/FooterAdmin';
import SidebarAdmin from '../layouts/SidebarAdmin';
import { useParams } from 'react-router-dom';


function EditUser() {
  const { userId } = useParams();  // Récupérer le paramètre userId depuis l'URL

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '', 
    type: 'Etudient', // Default to 'Etudient'
    image: null,          
  });
  console.log(userId);
  
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const API_BASE_URL = `${process.env.REACT_APP_API_URL}`+'';

  // Fetch user data when component mounts
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/user/${userId}`,{
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch user data');
        return response.json();
      })
      .then((data) => {
        setUserData({
          name: data.nom,   // Assurez-vous que le champ correspond aux données de votre API (nom au lieu de name)
          email: data.email,
          type: data.type,
          image: null,
        });
      })
      .catch((error) => console.error('Error fetching user data:', error));
  }, [userId]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  // Handle file input (image upload)
  const handleImageChange = (e) => {
    setUserData({
      ...userData,
      image: e.target.files[0],
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    // Append all form data
    formData.append('name', userData.name);
    formData.append('email', userData.email);
    if (userData.password) {
      formData.append('password', userData.password);
    }
    formData.append('type', userData.type); // Assurez-vous que c'est 'userType' pour correspondre à l'API
    if (userData.image) {
      formData.append('image', userData.image);
    }
console.log([...formData]);
    try {
      const response = await fetch(`${API_BASE_URL}/api/user/update/${userId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Ensure you're sending the token if needed

        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update user');
      }

      const updatedUser = await response.json();
      setSuccess('User updated successfully');
      setError('');
      console.log('Updated User:', updatedUser);
      window.location.href = '/listusers'; // Redirect to user list

    } catch (err) {
      setError(err.message || 'Error updating user');
      setSuccess('');
      console.error('Error:', err);
    }
  };

  return (
    <>

      <SidebarAdmin />

      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
        <Navbar />
        <div className="container mt-5">
          <h2>Edit User</h2>
          {success && <div className="alert alert-success">{success}</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            {/* Name input */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control bg-gray-400"
                id="name"
                name="name"
                value={userData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email input */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control bg-gray-400"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password input */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password (Leave blank if unchanged)</label>
              <input
                type="password"
                className="form-control bg-gray-400"
                id="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                placeholder="Leave blank if not changing"
              />
            </div>

            {/* User Type selection */}
            <div className="mb-3">
              <label htmlFor="type" className="form-label">User Type</label>
              <select
                className="form-select form-control bg-gray-400"
                id="type"
                name="type"
                value={userData.type}
                onChange={handleChange}
                required
              >
                <option value="Etudient">Etudient (Student)</option>
                <option value="Professeur">Professeur (Professor)</option>
              </select>
            </div>

            {/* Image upload */}
            <div className="mb-3">
              <label htmlFor="image" className="form-label">Profile Image</label>
              <input
                type="file"
                className="form-control bg-gray-400"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            {/* Submit button */}
            <button type="submit" className="btn btn-primary">Update User</button>
          </form>
        </div>
      </main>
    </>
  );
}

export default EditUser;
