import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SidebarAdmin() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Toggle Button (Menu Icon) */}
      <button
        className="btn btn-primary d-lg-none position-fixed top-0 start-0 m-3"
        onClick={toggleSidebar}
        style={{ zIndex: 1050 }}
      >
        ☰
      </button>

      <aside
        className={`sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 bg-gradient-dark ${
          isSidebarOpen ? '' : 'd-none d-lg-block'
        }`}
        id="sidenav-main"
      >
        <div className="sidenav-header">
          {/* Close Button (X Icon) */}
          <button
            className="btn btn-link text-white position-absolute end-0 top-0 m-3 d-lg-none"
            onClick={toggleSidebar}
          >
            ✖
          </button>
          <a
            className="navbar-brand m-0"
            href="https://demos.creative-tim.com/material-dashboard/pages/dashboard"
            target="_blank"
            rel="noopener noreferrer"
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
        <div className="collapse navbar-collapse w-auto" id="sidenav-collapse-main">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link text-white active bg-gradient-primary" to="/dashboard">
                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                  <i className="material-icons opacity-10">dashboard</i>
                </div>
                <span className="nav-link-text ms-1">Dashboard</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/listusers">
                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                  <i className="material-icons opacity-10">person</i>
                </div>
                <span className="nav-link-text ms-1">Users</span>
              </Link>
            </li>
        
        <li className="nav-item">
          <Link className="nav-link text-white " to="/bibliotheques">
            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i className="material-icons opacity-10">table_view</i>
            </div>
            <span className="nav-link-text ms-1">Bibliothèque</span>
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
            <span className="nav-link-text ms-1">Documents </span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link text-white "
             to="/list_types"
          >
            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i className="material-icons opacity-10">view_in_ar</i>
            </div>
            <span className="nav-link-text ms-1">Type </span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white " to="/contacts">
            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i className="material-icons opacity-10">table_view</i>
            </div>
            <span className="nav-link-text ms-1">Contact</span>
          </Link>
        </li>
        <li className="nav-item mt-3">
          <h6 className="ps-4 ms-2 text-uppercase text-xs text-white font-weight-bolder opacity-8">
            Account pages
          </h6>
        </li>
        
        </ul>
        </div>
        <div className="sidenav-footer position-absolute w-100 bottom-0">
          <div className="mx-3">
            <Link className="btn bg-gradient-primary w-100" to="/logout" type="button">
              Logout
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}

export default SidebarAdmin;
