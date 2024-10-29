import React from 'react'
import { Link } from 'react-router-dom'
import Home from '../../../pages/Home'


function Navbar() {
  return (
    <nav
    className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
    id="navbarBlur"
    data-scroll="true"
  >
    <div className="container-fluid py-1 px-3">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
          <li className="breadcrumb-item text-sm">
            <a className="opacity-5 text-dark" href="javascript:;">
              Pages
            </a>
          </li>
          <li
            className="breadcrumb-item text-sm text-dark active"
            aria-current="page"
          >
            Tables
          </li>
        </ol>
        <h6 className="font-weight-bolder mb-0">Tables</h6>
      </nav>
      <div
        className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
        id="navbar"
      >
        <div className="ms-md-auto pe-md-3 d-flex align-items-center">
          <div className="input-group input-group-outline">
            <label className="form-label">Type here...</label>
            <input type="text" className="form-control" />
          </div>
        </div>
        <ul className="navbar-nav  justify-content-end">
          <li className="nav-item d-flex align-items-center">
            <Link
              className="btn btn-outline-primary btn-sm mb-0 me-3"
              target="_blank"
              to="/logout"
            >
              logout
            </Link>
          </li>
         
         
          
         
          <li className="nav-item d-flex align-items-center">
            <a
              
              className="nav-link text-body font-weight-bold px-0"
            >
              <i className="fa fa-user me-sm-1" />
              <span className="d-sm-inline d-none"> Admin </span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  

  )
}

export default Navbar