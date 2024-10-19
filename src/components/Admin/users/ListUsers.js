import React from 'react'
import Navbar from '../layouts/NavbarAdmin'
import Footer from '../layouts/FooterAdmin'
import SidebarAdmin from '../layouts/SidebarAdmin'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

function ListUsers() {
    const userId =1;
    const handleDelete = (userId) => {
        // Afficher un pop-up de confirmation
        Swal.fire({
          title: 'Êtes-vous sûr ?',
          text: "Cette action est irréversible !",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Oui, supprimer!',
          cancelButtonText: 'Annuler'
        }).then((result) => {
        //   if (result.isConfirmed) {
        //     // Si confirmé, effectuer la suppression
        //     fetch(`https://your-api-url.com/users/${userId}`, {
        //       method: 'DELETE',
        //       headers: {
        //         'Content-Type': 'application/json',
        //       },
        //     })
        //       .then(response => response.json())
        //       .then(data => {
        //         Swal.fire(
        //           'Supprimé!',
        //           'L\'utilisateur a bien été supprimé.',
        //           'success'
        //         );
        //         // Rafraîchir la liste ou faire un autre traitement ici
        //       })
        //       .catch(error => {
        //         console.error('Erreur lors de la suppression :', error);
        //         Swal.fire(
        //           'Erreur',
        //           'Une erreur est survenue lors de la suppression.',
        //           'error'
        //         );
        //       });
        //   }
        });
      };


  return (
<>     <SidebarAdmin/>
  <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
    <Navbar/>
    <div className="container-fluid py-4">
    <div className="row">
      <div className="col-12">
        <div className="card my-4">
          <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
              <h6 className="text-white text-capitalize ps-3">Authors table</h6>
            </div>
          </div>
          
          <div className="card-body px-0 pb-2">
            <div className="table-responsive p-0">
            <Link
              className="btn btn-outline-primary btn-sm mb-0 me-3"
              target="_blank"
              to="/createUser"
            >
              create User
            </Link>
              <table className="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      Author
                    </th>
                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                      Function
                    </th>
                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      Status
                    </th>
                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      Employed
                    </th>
                    <th className="text-secondary opacity-7" />
                    <th style={{ columnSpan : 2}}> action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="d-flex px-2 py-1">
                        <div>
                          <img
                            src="../assets/img/team-2.jpg"
                            className="avatar avatar-sm me-3 border-radius-lg"
                            alt="user1"
                          />
                        </div>
                        <div className="d-flex flex-column justify-content-center">
                          <h6 className="mb-0 text-sm">John Michael</h6>
                          <p className="text-xs text-secondary mb-0">
                            john@creative-tim.com
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="text-xs font-weight-bold mb-0">Manager</p>
                      <p className="text-xs text-secondary mb-0">Organization</p>
                    </td>
                    <td className="align-middle text-center text-sm">
                      <span className="badge badge-sm bg-gradient-success">
                        Online
                      </span>
                    </td>
                    <td className="align-middle text-center">
                      <span className="text-secondary text-xs font-weight-bold">
                        23/04/18
                      </span>
                    </td>
                    <td className="align-middle">
                      <Link
                        // to="edit"
                        className="text-secondary font-weight-bold text-xs"
                        data-toggle="tooltip"
                        data-original-title="Edit user"
                      >
                        Edit
                      </Link>
                    </td>
                    <td className="align-middle">
                        <a
                            href="javascript:;"
                            className="text-secondary font-weight-bold text-xs"
                            data-toggle="tooltip"
                            data-original-title="Delete user"
                            onClick={() => handleDelete(userId)}  // Appeler la fonction handleDelete
                        >
                            supprimer
                        </a>
                        </td>
                  </tr>
                  
                  <tr>
                    <td>
                      <div className="d-flex px-2 py-1">
                        <div>
                          <img
                            src="../assets/img/team-4.jpg"
                            className="avatar avatar-sm me-3 border-radius-lg"
                            alt="user6"
                          />
                        </div>
                        <div className="d-flex flex-column justify-content-center">
                          <h6 className="mb-0 text-sm">Miriam Eric</h6>
                          <p className="text-xs text-secondary mb-0">
                            miriam@creative-tim.com
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="text-xs font-weight-bold mb-0">Programator</p>
                      <p className="text-xs text-secondary mb-0">Developer</p>
                    </td>
                    <td className="align-middle text-center text-sm">
                      <span className="badge badge-sm bg-gradient-secondary">
                        Offline
                      </span>
                    </td>
                    <td className="align-middle text-center">
                      <span className="text-secondary text-xs font-weight-bold">
                        14/09/20
                      </span>
                    </td>
                    <td className="align-middle">
                      <a
                        href="javascript:;"
                        className="text-secondary font-weight-bold text-xs"
                        data-toggle="tooltip"
                        data-original-title="Edit user"
                      >
                        Edit
                      </a>
                      
                    </td>
                    <td className="align-middle">
                      <a
                        href="javascript:;"
                        className="text-secondary font-weight-bold text-xs"
                        data-toggle="tooltip"
                        data-original-title="Edit user"
                      >
                        supprimer
                      </a>
                      
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <Footer/>

  </div>
  </main>
  </>
  )
}

export default ListUsers