import React, { useState, useEffect } from 'react';
import Navbar from '../layouts/Navbar';
import axios from 'axios';

const EditProfile = () => {
  const [user, setUser] = useState({
    id: '',
    nom: '',
    email: '',
    imagePath: '',
  });
  const [newImage, setNewImage] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('clientLogin'));
    if (userInfo) setUser(userInfo);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewImage(file);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('nom', user.nom);
      formData.append('email', user.email);
      if (newImage) {
        formData.append('image', newImage);
      }

      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/user/updateProfile/${user.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setMessage('Profile updated successfully!');
      const updatedUser = response.data;
      localStorage.setItem('clientLogin', JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Failed to update profile.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="card shadow">
          <div className="card-body">
            <h2>Edit Profile</h2>
            {message && <div className="alert alert-info">{message}</div>}
            <form onSubmit={handleFormSubmit}>
              <div className="mb-3">
                <label htmlFor="nom" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nom"
                  name="nom"
                  value={user.nom}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  Profile Image
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="image"
                  onChange={handleImageChange}
                />
               {user.imagePath && (
                  <div className="mt-2">
                    <img
                      src={`data:image/jpeg;base64,${user.imagePath}`}
                      alt="Profile"
                      style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                      className="rounded-circle"
                    />
                  </div>
                )}
              </div>
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
