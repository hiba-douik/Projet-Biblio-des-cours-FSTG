import React, { useState } from 'react';
import Navbar from '../layouts/NavbarAdmin';
import SidebarAdmin from '../layouts/SidebarAdmin';

function CreateUsers() {
  // State to store user input, including the image
  const [userData, setUserData] = useState({
    nom: '',
    email: '',
    password: '',
    type: 'Etudient', // Default to 'Etudient'
    image: null,          // Add image to state
  });

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

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
      image: e.target.files[0], // Store the selected image file
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
  
    // Append all form data
    formData.append('nom', userData.nom);
    formData.append('email', userData.email);
    formData.append('password', userData.password);
    formData.append('type', userData.type);
    if (userData.image) {
      formData.append('image', userData.image); // Append the image file
    }
  
    const API_BASE_URL = 'http://localhost:9000';
    try {
      const response = await fetch(`${API_BASE_URL}/api/user/create`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('Token')}`,
        },
        body: formData, // Use FormData instead of JSON
      });
  
      // Check for response status
      if (!response.ok) {
        // Try to read the response as JSON, but handle cases where it isn't valid JSON
        let errorMessage = 'Failed to create user';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || 'Failed to create user';
        } catch (jsonError) {
          // If JSON parsing fails, fall back to a generic message
          console.error('Failed to parse error response:', jsonError);
        }
        throw new Error(errorMessage);
      }
  
      setSuccess('User created successfully');
      setError('');
    } catch (err) {
      setError(err.message || 'Error creating user');
      setSuccess('');
      console.error('Error:', err);
    }
  };

  return (
    <>
      <SidebarAdmin />
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        <Navbar />
        <div className="container mt-5">
          <h2>Create User</h2>
          {success && <div className="alert alert-success">{success}</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            {/* Name input */}
            <div className="mb-3">
              <label htmlFor="nom" className="form-label">Nom</label>
              <input
                type="text"
                className="form-control form-control bg-gray-400"
                id="nom"
                name="nom"
                value={userData.nom}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email input */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control form-control bg-gray-400"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password input */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control bg-gray-400"
                id="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* User Type selection (Etudient or Professor) */}
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
            <button type="submit" className="btn btn-primary">Create User</button>
          </form>
        </div>
      </main>
    </>
  );
}

export default CreateUsers;
