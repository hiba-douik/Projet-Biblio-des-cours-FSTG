import React from 'react';
import { Link } from 'react-router-dom';
import Home from '../../../pages/Home';

const token = localStorage.getItem('token'); // Retrieve token from local storage

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        {/* Navbar Brand */}
        <Link className="navbar-brand" to={Home}>
          <strong>
            <img style={{ maxWidth: 130 }} src="logo.png" className="img-fluid" alt="Logo" />
          </strong>
        </Link>

        {/* Navbar Toggler (Mobile) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Collapse */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Navbar Links */}
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                Story
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/product">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/faq">
                FAQs
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>
          </ul>

          {/* User Options */}
          <div className="d-flex">
            {token ? (
              <>
                <Link to="/profile" className="btn btn-outline-primary btn-sm me-2">
                  Profile
                </Link>
                <Link to="/logout" className="btn btn-outline-info btn-sm">
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link to="/register" className="btn btn-dark-blue btn-sm me-2">
                  Register
                </Link>
                <Link to="/login" className="btn btn-dark-blue btn-sm">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
