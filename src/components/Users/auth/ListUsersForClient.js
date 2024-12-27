import React, { useState, useEffect } from 'react';
import Navbar from '../layouts/Navbar';
import Swal from 'sweetalert2';

const API_BASE_URL = `${process.env.REACT_APP_API_URL}`;

const ListUsersForClient = () => {
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
      // Filter out admin users
      setUsers(data.filter(user => user.type !== 'Admin'));
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
      // Filter out admin users
      setUsers(data.filter(user => user.type !== 'Admin'));
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
      // Filter out admin users
      setUsers(data.filter(user => user.type !== 'Admin'));
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
      // Filter out admin users
      setUsers(data.filter(user => user.type !== 'Admin'));
    } catch (err) {
      setError('Error searching and filtering users');
      console.error('Error:', err);
    }
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
                              <td onClick={() => (window.location.href = `/user/${user.id}`)}>
                                <div className="d-flex px-2 py-1">
                                  <div>
                                  <img
                                    src={user.imagePath ? `data:image/jpeg;base64,${user.imagePath}` : "images/book1.jpg"} 
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
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  <nav className="d-flex justify-content-end">
                    <ul className="pagination">
                      {Array.from({ length: totalPages }).map((_, index) => (
                        <li
                          key={index}
                          className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                        >
                          <button
                            className="page-link"
                            onClick={() => handlePageChange(index + 1)}
                          >
                            {index + 1}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ListUsersForClient;