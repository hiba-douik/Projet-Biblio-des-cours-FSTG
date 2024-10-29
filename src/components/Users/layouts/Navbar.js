import React from 'react'
import { Link } from 'react-router-dom'
import Home from '../../../pages/Home'
const token = localStorage.getItem('token'); // Retrieve token from local storage

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg">
    <div className="container">
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      
      <Link className="navbar-brand" to={Home}  >
        <strong>
          {/* <span>Little</span> Fashion */}
          <img style={{ maxWidth : 130}} src="logo.png" className="img-fluid" alt="" />
        </strong>
      </Link>
      <div className="d-lg-none">
        <Link to="/register" className="bi bi-person custom-icon me-3" />
        <a href="product-detail.html" className="bi-bag custom-icon" />
      </div>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mx-auto">
          <li className="nav-item">
            <Link className="nav-link active" to='/'>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">
              Story
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">
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
        <div className="d-none d-lg-block">
  {token ? (
        <>
    <Link to="/profile" className="bi-person btn btn-sm btn-outline-primary m-lg-1" > Profile </Link>
    <Link to="/logout" className="btn btn-sm btn-outline-info m-lg-1"> logout </Link>
    </>
  ) : (
    // If the token does not exist, show Register and Login links
    <>
      <Link to="/register" className="bi-person btn btn-dark-blue  m-lg-1"> Register </Link>
      <Link to="/login" className="bi-lock-fill btn btn-dark-blue  m-lg-1"> Login </Link>
    </>
  )}
</div>

      </div>
    </div>
  </nav>
  )
}

export default Navbar
