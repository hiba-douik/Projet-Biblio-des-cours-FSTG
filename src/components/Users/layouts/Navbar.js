import React from 'react'
import { Link } from 'react-router-dom'
import Home from '../../../pages/Home'


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
          <span>Little</span> Fashion
        </strong>
      </Link>
      <div className="d-lg-none">
        <a href="sign-in.html" className="bi-person custom-icon me-3" />
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
          <Link to="/register" className="bi bi-person custom-icon me-3" />
          <Link to="/login" className="bi-bag custom-icon" />
        </div>
      </div>
    </div>
  </nav>
  )
}

export default Navbar