import React from 'react'

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
      <a className="navbar-brand" href="index.html">
        <strong>
          <span>Little</span> Fashion
        </strong>
      </a>
      <div className="d-lg-none">
        <a href="sign-in.html" className="bi-person custom-icon me-3" />
        <a href="product-detail.html" className="bi-bag custom-icon" />
      </div>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mx-auto">
          <li className="nav-item">
            <a className="nav-link active" href="index.html">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="about.html">
              Story
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="products.html">
              Products
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="faq.html">
              FAQs
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="contact.html">
              Contact
            </a>
          </li>
        </ul>
        <div className="d-none d-lg-block">
          <a href="sign-in.html" className="bi-person custom-icon me-3" />
          <a href="product-detail.html" className="bi-bag custom-icon" />
        </div>
      </div>
    </div>
  </nav>
  )
}

export default Navbar