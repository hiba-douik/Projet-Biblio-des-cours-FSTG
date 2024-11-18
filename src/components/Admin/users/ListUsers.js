import React, { useState, useEffect } from 'react';
import SidebarAdmin from '../layouts/SidebarAdmin';
import Navbar from '../layouts/NavbarAdmin';
import Footer from '../layouts/FooterAdmin';
import Swal from 'sweetalert2';
import { Link } from 'lucide-react';


const API_BASE_URL = `${process.env.REACT_APP_API_URL}`+'';

const ListUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/user/all`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
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

  const handleDelete = async (userId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`${API_BASE_URL}/api/admin/user/delete/${userId}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
            }
          });
  
          if (!response.ok) {
            throw new Error('Failed to delete user');
          }
  
          setUsers(users.filter(user => user.id !== userId));
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

  return (
    <>
      <SidebarAdmin/>
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
        <Navbar/>
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
                      <button
                        className="btn btn-outline-primary btn-sm mb-0"
                        onClick={() => window.location.href = '/create-user'}
                      >
                        Create User
                      </button>
                    </div>

                    <table className="table align-items-center mb-0">
                      <thead>
                        <tr>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            User
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                            name
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            email
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            type
                          </th>
                          <th className="text-secondary opacity-7" colSpan="2">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading ? (
                          <tr>
                            <td colSpan="5" className="text-center">Loading...</td>
                          </tr>
                        ) : users.length === 0 ? (
                          <tr>
                            <td colSpan="5" className="text-center">No users found</td>
                          </tr>
                        ) : (
                          users.map((user) => (
                            <tr key={user.id}>
                              <td>
                                <div className="d-flex px-2 py-1">
                                  <div>
                                   
                                    <img
                                      src="/api/placeholder/40/40"
                                      className="avatar avatar-sm me-3 border-radius-lg"
                                      alt={user.nom}
                                    />
                                     
                                  </div>
                                  <div className="d-flex flex-column justify-content-center">
                                    <h6 className="mb-0 text-sm">{user.nom} </h6>
                                    <p className="text-xs text-secondary mb-0">
                                      {user.email}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <p className="text-xs font-weight-bold mb-0">{user.nom}</p>
                              </td>
                              <td className="align-middle text-center text-sm">
                                <span className={`badge badge-sm bg-gradient-${user.active ? 'success' : 'secondary'}`}>
                                  {user.active ? 'Active' : 'Inactive'}
                                </span>
                              </td>
                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">
                                  {new Date(user.type).toLocaleDateString()}
                                </span>
                              </td>
                              <td className="align-middle">
                                <button
                                  className="text-secondary font-weight-bold text-xs btn btn-link"
                                  onClick={() => window.location.href = `/edit-user/${user.id}`}
                                >
                                  Edit
                                </button>
                              </td>
                              <td className="align-middle">
                                <button
                                  className="text-danger font-weight-bold text-xs btn btn-link"
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