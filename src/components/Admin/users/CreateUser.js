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
    image: null, // Add image to state
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle form field changes (text inputs)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle image input change
  const handleImageChange = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      image: e.target.files[0], // Store the image file
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare FormData to include text and image data
    const formData = new FormData();
    formData.append('nom', userData.nom);
    formData.append('email', userData.email);
    formData.append('password', userData.password);
    formData.append('type', userData.type);
    if (userData.image) {
      formData.append('image', userData.image); // Append image only if selected
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}`+'/api/user/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,

          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        setSuccess('User created successfully!');
        setError('');
        setUserData({
          nom: '',
          email: '',
          password: '',
          type: 'user',
          image: null,
        });
        window.location.href = '/listusers'; // Redirect to user list
      } else {
        const errorMessage = await response.text();
        setError(errorMessage || 'Registration failed. Please try again.');
        setSuccess('');
      }
    } catch (error) {
      setError('Registration failed. Please try again.');
      setSuccess('');
    }
  };

  return (
    <>
      <SidebarAdmin />
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
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
                className="form-control bg-gray-400"
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
                <option value="User">Users (Student | Professor)</option>
                <option value="Admin">Admin</option>
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
