import React, { useState, useEffect } from 'react';
import Footer from '../layouts/FooterAdmin';
import SidebarAdmin from '../layouts/SidebarAdmin';
import Navbar from '../layouts/NavbarAdmin';
import { dashboardService } from './dashboardService';
import axios from 'axios';




function Dashboard() {
  const [userCount, setUserCount] = useState([]);
  const [documentCount, setDocumentCount] = useState([]);
  const [bibliothequeCount, setBibliothequeCount] = useState([]);
  const [typeCount, setTypeCount] = useState([]);
  const [projects, setProjects] = useState([]);
  const [orders, setOrders] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('token');

  useEffect(() => {
    // Fetch projects data
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/admin/bibliotique/all`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    // Fetch orders data
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/admin/document/all`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchProjects();
    fetchOrders();
  }, []);

  // Icons mapping for timeline
  const libraryLogos = [
    "/template_admin/assets/img/small-logos/logo-xd.svg",
    "/template_admin/assets/img/small-logos/logo-atlassian.svg",
    "/template_admin/assets/img/small-logos/logo-slack.svg",
    "/template_admin/assets/img/small-logos/logo-spotify.svg",
    "/template_admin/assets/img/small-logos/logo-jira.svg",
    "/template_admin/assets/img/small-logos/logo-invision.svg"
  ];

  // Team member images
  const teamImages = [
    "/template_admin/assets/img/team-1.jpg",
    "/template_admin/assets/img/team-2.jpg",
    "/template_admin/assets/img/team-3.jpg",
    "/template_admin/assets/img/team-4.jpg"
  ];
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const users = await dashboardService.getUserCount();
        const documents = await dashboardService.getDocumentCount();
        const bibliotheques = await dashboardService.getBibliothequeCount();
        const types = await dashboardService.getTypeCount();

        setUserCount(users);
        setDocumentCount(documents);
        setBibliothequeCount(bibliotheques);
        setTypeCount(types);
      } catch (error) {
        console.error('Error fetching dashboard data', error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div>
      <>
        <SidebarAdmin />
        <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
          <Navbar />
          <div className="container-fluid py-4">
            <div className="row">
              <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                <div className="card">
                  <div className="card-header p-3 pt-2">
                    <div className="icon icon-lg icon-shape bg-gradient-dark shadow-dark text-center border-radius-xl mt-n4 position-absolute">
                      <i className="material-icons opacity-10">person</i>
                    </div>
                    <div className="text-end pt-1">
                      <p className="text-sm mb-0 text-capitalize">Total Users</p>
                      <h4 className="mb-0">{userCount.length}</h4>
                    </div>
                  </div>
                  <hr className="dark horizontal my-0" />
                  <div className="card-footer p-3">
                    <p className="mb-0">
                      <span className="text-success text-sm font-weight-bolder">
                        +{Math.round((userCount.length / 10) * 100)}%{" "}
                      </span>
                      than last week
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                <div className="card">
                  <div className="card-header p-3 pt-2">
                    <div className="icon icon-lg icon-shape bg-gradient-primary shadow-primary text-center border-radius-xl mt-n4 position-absolute">
                      <i className="material-icons opacity-10">article</i>
                    </div>
                    <div className="text-end pt-1">
                      <p className="text-sm mb-0 text-capitalize">Total Documents</p>
                      <h4 className="mb-0">{documentCount.length}</h4>
                    </div>
                  </div>
                  <hr className="dark horizontal my-0" />
                  <div className="card-footer p-3">
                    <p className="mb-0">
                      <span className="text-success text-sm font-weight-bolder">
                        +{Math.round((documentCount.length / 20) * 100)}%{" "}
                      </span>
                      than last month
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                <div className="card">
                  <div className="card-header p-3 pt-2">
                    <div className="icon icon-lg icon-shape bg-gradient-success shadow-success text-center border-radius-xl mt-n4 position-absolute">
                      <i className="material-icons opacity-10">library_books</i>
                    </div>
                    <div className="text-end pt-1">
                      <p className="text-sm mb-0 text-capitalize">Total Bibliothèques</p>
                      <h4 className="mb-0">{bibliothequeCount.length}</h4>
                    </div>
                  </div>
                  <hr className="dark horizontal my-0" />
                  <div className="card-footer p-3">
                    <p className="mb-0">
                      <span className="text-success text-sm font-weight-bolder">
                        +{Math.round((bibliothequeCount.length / 5) * 100)}%{" "}
                      </span>
                      than last month
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6">
                <div className="card">
                  <div className="card-header p-3 pt-2">
                    <div className="icon icon-lg icon-shape bg-gradient-info shadow-info text-center border-radius-xl mt-n4 position-absolute">
                      <i className="material-icons opacity-10">category</i>
                    </div>
                    <div className="text-end pt-1">
                      <p className="text-sm mb-0 text-capitalize">Total Types</p>
                      <h4 className="mb-0">{typeCount.length}</h4>
                    </div>
                  </div>
                  <hr className="dark horizontal my-0" />
                  <div className="card-footer p-3">
                    <p className="mb-0">
                      <span className="text-success text-sm font-weight-bolder">
                        +{Math.round((typeCount.length / 3) * 100)}%{" "}
                      </span>
                      than last month
                    </p>
                  </div>
                </div>
              </div>
            </div>
    
    
            <div className="row mb-4">
      {/* Projects Column */}
      <div className="col-lg-8 col-md-6 mb-md-0 mb-4">
        <div className="card">
          <div className="card-header pb-0">
            <div className="row">
              <div className="col-lg-6 col-7">
                <h6>Projects</h6>
                <p className="text-sm mb-0">
                  <i className="fa fa-check text-info" aria-hidden="true" />
                  <span className="font-weight-bold ms-1">{projects.length} done</span> this month
                </p>
              </div>
              <div className="col-lg-6 col-5 my-auto text-end">
                <div className="dropdown float-lg-end pe-4">
                  <a
                    className="cursor-pointer"
                    id="dropdownTable"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fa fa-ellipsis-v text-secondary" />
                  </a>
                  <ul
                    className="dropdown-menu px-2 py-3 ms-sm-n4 ms-n5"
                    aria-labelledby="dropdownTable"
                  >
                    <li>
                      <a className="dropdown-item border-radius-md" href="javascript:;">
                        Action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item border-radius-md" href="javascript:;">
                        Another action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item border-radius-md" href="javascript:;">
                        Something else here
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="card-body px-0 pb-2">
            <div className="table-responsive">
              <table className="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      Libraries
                    </th>
                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                      Members
                    </th>
                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      Budget
                    </th>
                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      Completion
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bibliothequeCount.map((project, index) => (
                    <tr key={project.id}>
                      <td>
                        <div className="d-flex px-2 py-1">
                          <div>
                            <img
                              src={libraryLogos[index % libraryLogos.length]}
                              className="avatar avatar-sm me-3"
                              alt={project.nom}
                            />
                          </div>
                          <div className="d-flex flex-column justify-content-center">
                            <h6 className="mb-0 text-sm">{project.nom}</h6>
                            <p className="text-xs text-secondary mb-0">{project.location}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="avatar-group mt-2">
                          {teamImages.slice(0, Math.min(4, project.documentsCount)).map((img, idx) => (
                            <a
                              key={idx}
                              href="javascript:;"
                              className="avatar avatar-xs rounded-circle"
                              data-bs-toggle="tooltip"
                              data-bs-placement="bottom"
                              title={`Member ${idx + 1}`}
                            >
                              <img src={img} alt={`team${idx + 1}`} />
                            </a>
                          ))}
                        </div>
                      </td>
                      <td className="align-middle text-center text-sm">
                        <span className="text-xs font-weight-bold">
                          ${(project.documentsCount * 1000).toLocaleString()}
                        </span>
                      </td>
                      <td className="align-middle">
                        <div className="progress-wrapper w-75 mx-auto">
                          <div className="progress-info">
                            <div className="progress-percentage">
                              <span className="text-xs font-weight-bold">
                                {Math.min(100, project.documentsCount * 20)}%
                              </span>
                            </div>
                          </div>
                          <div className="progress">
                            <div
                              className={`progress-bar bg-gradient-${['info', 'success', 'warning'][index % 3]} w-${Math.min(100, project.documentsCount * 20)}`}
                              role="progressbar"
                              aria-valuenow={Math.min(100, project.documentsCount * 20)}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Overview Column */}
      <div className="col-lg-4 col-md-6">
        <div className="card h-100">
          <div className="card-header pb-0">
            <h6>Orders Overview</h6>
            <p className="text-sm">
              <i className="fa fa-arrow-up text-success" aria-hidden="true" />
              <span className="font-weight-bold ms-1">24%</span> this month
            </p>
          </div>
          <div className="card-body p-3">
            <div className="timeline timeline-one-side">
              {documentCount.slice(0, 6).map((order, index) => (
                <div key={order.id} className="timeline-block mb-3">
                  <span className="timeline-step">
                    <i className={`material-icons text-${['success', 'danger', 'info', 'warning', 'primary', 'dark'][index % 6]} text-gradient`}>
                      {['notifications', 'code', 'shopping_cart', 'credit_card', 'key', 'payments'][index % 6]}
                    </i>
                  </span>
                  <div className="timeline-content">
                    <h6 className="text-dark text-sm font-weight-bold mb-0">
                      {order.titre || 'New Order'}
                    </h6>
                    <p className="text-secondary font-weight-bold text-xs mt-1 mb-0">
                      {new Date(order.dateAjout).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
     <Footer/>
    </div>
  </main>
</>



  </div>
  )
}

export default Dashboard