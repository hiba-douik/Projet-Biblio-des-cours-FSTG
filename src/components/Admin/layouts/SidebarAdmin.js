import React from 'react'
import { Link } from 'react-router-dom'

function SidebarAdmin() {
  return (
  
       <aside
    className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3   bg-gradient-dark"
    id="sidenav-main"
  >
     <link
    id="pagestyle"  
    href="template_admin/assets/css/material-dashboard.css?v=3.1.0"
    rel="stylesheet"
  />
    <div className="sidenav-header">
      <i
        className="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
        aria-hidden="true"
        id="iconSidenav"
      />
      <a
        className="navbar-brand m-0"
        href=" https://demos.creative-tim.com/material-dashboard/pages/dashboard "
        target="_blank"
      >
        <img
          src="logo.png"
          className="navbar-brand-img h-100"
          alt="main_logo"
        />
        <span className="ms-1 font-weight-bold text-white">
          Material Dashboard 2
        </span>
      </a>
    </div>
    <hr className="horizontal light mt-0 mb-2" />
    <div
      className="collapse navbar-collapse  w-auto "
      id="sidenav-collapse-main"
    >
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link
            className="nav-link text-white active bg-gradient-primary"
            to="/dashboard"
          >
            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i className="material-icons opacity-10">dashboard</i>
            </div>
            <span className="nav-link-text ms-1">Dashboard</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white " to="/listusers">
            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i className="material-icons opacity-10">person</i>
            </div>
            <span className="nav-link-text ms-1">
               Users </span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white " to="/bibliotheques">
            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i className="material-icons opacity-10">table_view</i>
            </div>
            <span className="nav-link-text ms-1">bibliothèque</span>
          </Link>
        </li>
      
        <li className="nav-item">
          <Link
            className="nav-link text-white "
             to="/documentList"
          >
            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i className="material-icons opacity-10">view_in_ar</i>
            </div>
            <span className="nav-link-text ms-1">documents </span>
          </Link>
        </li>
       
        <li className="nav-item mt-3">
          <h6 className="ps-4 ms-2 text-uppercase text-xs text-white font-weight-bolder opacity-8">
            Account pages
          </h6>
        </li>
        
      </ul>
    </div>
    <div className="sidenav-footer position-absolute w-100 bottom-0 ">
      <div className="mx-3">
        
        <a
          className="btn bg-gradient-primary w-100"
          href="https://www.creative-tim.com/product/material-dashboard-pro?ref=sidebarfree"
          type="button"
        >
          Logout
        </a>
      </div>
    </div>
    
  </aside>
  
 
  )
}

export default SidebarAdmin