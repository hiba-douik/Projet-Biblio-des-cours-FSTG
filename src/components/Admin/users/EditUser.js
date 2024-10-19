import React, { useState, useEffect } from 'react';
import Navbar from '../layouts/NavbarAdmin';
import Footer from '../layouts/FooterAdmin';
import SidebarAdmin from '../layouts/SidebarAdmin';

function EditUser({ userId }) {
  // State to store user input, including the image
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '', 
    userType: 'Etudient', // Default to 'Student'
    image: null,          // Add image to state
  });

  // Fetch user data when component mounts
//   useEffect(() => {
//     // Fetch the current user data from the backend (you should replace the URL)
//     fetch(`https://your-api-url.com/users/${userId}`)
//       .then((response) => response.json())
//       .then((data) => {
//         setUserData({
//           name: data.name,
//           email: data.email,
//           userType: data.userType,
//           image: null,  // We don't set the image here, but it can be handled if needed
//         });
//       })
//       .catch((error) => console.error('Error fetching user data:', error));
//   }, [userId]);

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
    if (userData.password) {
      formData.append('password', userData.password); // Only append password if changed
    }
    formData.append('userType', userData.userType);
    if (userData.image) {
      formData.append('image', userData.image); // Append the image file if selected
    }

    console.log([...formData]);

    // Send the formData to the backend (you should replace the URL)
    /*
    fetch(`https://your-api-url.com/users/${userId}`, {
      method: 'PUT',  // Use PUT or PATCH to update
      body: formData,
    })
    .then(response => response.json())
    .then(data => console.log('User updated:', data))
    .catch(error => console.error('Error:', error));
    */
  };

  return (
    <>
      <SidebarAdmin />
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        <Navbar />
        <div className="container mt-5">
          <h2>Edit User</h2>
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
            <button type="submit" className="btn btn-primary">Update User</button>
          </form>
        </div>
      </main>
    </>
  );
}

export default EditUser;
