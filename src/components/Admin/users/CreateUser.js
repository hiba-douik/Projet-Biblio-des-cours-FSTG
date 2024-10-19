import React, { useState } from 'react';
import Navbar from '../layouts/NavbarAdmin';
import Footer from '../layouts/FooterAdmin';
import SidebarAdmin from '../layouts/SidebarAdmin';

function CreateUsers() {
  // State to store user input, including the image
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    userType: 'Etudient', // Default to 'Student'
    image: null,          // Add image to state
  });

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
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    // Append all form data
    formData.append('name', userData.name);
    formData.append('email', userData.email);
    formData.append('password', userData.password);
    formData.append('userType', userData.userType);
    if (userData.image) {
      formData.append('image', userData.image); // Append the image file
    }

    console.log([...formData]);

    // You can send the formData to the backend or API here, for example using fetch or axios
    /*
    fetch('https://your-api-url.com/users', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
    */
  };
  
  return (
    <>
      <SidebarAdmin />
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        <Navbar />
        <div className="container mt-5">
          <h2>Create User</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            {/* Name input */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control form-control bg-gray-400"
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
              <label htmlFor="userType" className="form-label">User Type</label>
              <select
                className="form-select form-control bg-gray-400"
                id="userType"
                name="userType"
                value={userData.userType}
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
