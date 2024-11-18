import React, { useState, useEffect } from 'react';
import SidebarAdmin from '../layouts/SidebarAdmin';
import Navbar from '../layouts/NavbarAdmin';
import Footer from '../layouts/FooterAdmin';
import Swal from 'sweetalert2';
import { Link } from 'lucide-react';

const API_BASE_URL = `${process.env.REACT_APP_API_URL}` + '';

const ListUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filterType, setFilterType] = useState('');
  const usersPerPage = 7;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/user/all`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError('Error loading users');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/admin/user/search?keyword=${searchKeyword}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error('Failed to search users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError('Error searching users');
      console.error('Error:', err);
    }
  };

  const handleFilter = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/admin/user/filter?type=${filterType}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error('Failed to filter users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError('Error filtering users');
      console.error('Error:', err);
    }
  };

  const handleSearchAndFilter = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/admin/user/search-filter?keyword=${searchKeyword}&type=${filterType}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error('Failed to search and filter users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError('Error searching and filtering users');
      console.error('Error:', err);
    }
  };

  const handleDelete = async (userId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `${API_BASE_URL}/api/admin/user/delete/${userId}`,
            {
              method: 'DELETE',
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
              },
            }
          );

          if (!response.ok) {
            throw new Error('Failed to delete user');
          }

          setUsers(users.filter((user) => user.id !== userId));
          Swal.fire(
            'Deleted!',
            'User has been deleted successfully.',
            'success'
          );
        } catch (err) {
          setError('Error deleting user');
          console.error('Error:', err);
          Swal.fire('Error!', 'Failed to delete the user.', 'error');
        }
      }
    });
  };

// Pagination logic
const indexOfLastUser = currentPage * usersPerPage;
const indexOfFirstUser = indexOfLastUser - usersPerPage;
const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

const totalPages = Math.ceil(users.length / usersPerPage);

const handlePageChange = (pageNumber) => {
  setCurrentPage(pageNumber);
};

return (
  <>
    <SidebarAdmin />
    <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
      <Navbar />
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-12">
            <div className="card my-4">
              <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                  <h6 className="text-white text-capitalize ps-3">Users List</h6>
                </div>
              </div>

              <div className="card-body px-0 pb-2">
                {error && (
                  <div className="alert alert-danger mx-3" role="alert">
                    {error}
                  </div>
                )}
                <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => window.location.href = '/create-user'}     
                          >
                          Create User
                        </button>
               
                
                <div className="table-responsive p-0">
                    <div className="px-3 pb-3">
                      <input
                        type="text"
                        placeholder="Search by name or email"
                        className="form-control mb-2 "
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                      />
                      <select
                        className="form-select mb-2"
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                      >
                        <option value="">Select Type</option>
                        <option value="admin">Admin</option>
                        <option value="User">User</option>
                      </select>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={handleSearch}
                        >
                          Search
                        </button>
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={handleFilter}
                        >
                          Filter
                        </button>
                        <button
                          className="btn btn-outline-success btn-sm"
                          onClick={handleSearchAndFilter}
                        >
                          Search and Filter
                        </button>
                      </div>
                    </div>
                  <table className="table align-items-center mb-0">
                    <thead>
                      <tr>
                        <th>User</th>
                        <th>Name</th>
                        <th className="text-center">Type</th>
                        <th colSpan="2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan="5" className="text-center">
                            Loading...
                          </td>
                        </tr>
                      ) : currentUsers.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="text-center">
                            No users found
                          </td>
                        </tr>
                      ) : (
                        currentUsers.map((user) => (
                          <tr key={user.id}>
                            <td>
                              <div className="d-flex px-2 py-1">
                                <div>
                                  <img
                                    src="images/book1.jpg"
                                    className="avatar avatar-sm me-3 border-radius-lg"
                                    alt={user.nom}
                                  />
                                </div>
                                <div className="d-flex flex-column justify-content-center">
                                  <h6 className="mb-0 text-sm">{user.nom}</h6>
                                  <p className="text-xs text-secondary mb-0">
                                    {user.email}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td>{user.nom}</td>
                            <td className="align-middle text-center">{user.type}</td>
                            <td>
                              <button
                                className="btn btn-link text-secondary"
                                onClick={() =>
                                  window.location.href = `/edit-user/${user.id}`
                                }
                              >
                                Edit
                              </button>
                            </td>
                            <td>
                              <button
                                className="btn btn-link text-danger"
                                onClick={() => handleDelete(user.id)}
                              >
                                Delete
                              </button>
                              <button
                                  className="text-danger font-weight-bold text-xs btn btn-link"
                                
                                  onClick={() => (window.location.href = `/document/user/${user.id}`)}
                                  >
                                    view
                                    </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="d-flex justify-content-center mt-3">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      className={`btn ${
                        currentPage === index + 1
                          ? 'btn-primary'
                          : 'btn-outline-primary'
                      } mx-1`}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                    
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </main>
  </>
);
};

export default ListUsers;