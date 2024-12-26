import React, { useState, useEffect } from 'react';
import Navbar from '../layouts/Navbar';
import { Link } from 'react-router-dom';
import { Trash2, FileText, Edit2 } from 'lucide-react';

import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';


const Profile = () => {
  // Données exemple pour l'utilisateur
  const [documents, setDocuments] = useState([]);
  const [user1, setUser] = useState([]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('clientLogin')); 
    if (userInfo) setUser(userInfo);
  }, []);
  
 
  // Function to fetch documents from the API
  const fetchDocuments = async () => {
    try {
        const userInfo = JSON.parse(localStorage.getItem('clientLogin')); // Récupère les infos utilisateur depuis le localStorage

      const token = localStorage.getItem('token'); // Retrieve token from local storage
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/document/user/${userInfo.id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to request headers
        },
      });
      console.log(response.data); // Log the response to check the data
      setDocuments(response.data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };
  

  useEffect(() => {
    fetchDocuments(); // Fetch documents on component mount
  }, []);

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from local storage
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/document/delete/${documentToDelete.id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to request headers
          'Content-Type': 'application/json'

        },
      });

      // Remove the deleted document from the state
      setDocuments(documents.filter(doc => doc.id !== documentToDelete.id));

      // Close the modal and reset the document to delete
      setShowDeleteModal(false);
      setDocumentToDelete(null);

      console.log('Document deleted successfully');
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };


  const handleDelete = (document) => {
    setDocumentToDelete(document);
    setShowDeleteModal(true);
  };

  const user = {
    id: "USR-001",
    nom: user1.nom,
    email: user1.email,
    imagePath: user1.imagePath,
    type: "client",
    dateInscription: "2024-01-15"
  };
  const filteredDocuments = documents.filter(doc =>
    doc.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // Données exemple pour les documents
//   const documents = [
//     {
//       id: 1,
//       titre: "Rapport Annuel 2024",
//       dateCreation: "2024-03-15",
//       type: "PDF",
//       taille: "2.5 MB",
//       statut: "actif"
//     },
//     {
//       id: 2,
//       titre: "Présentation Projet Q1",
//       dateCreation: "2024-02-28",
//       type: "PPTX",
//       taille: "5.1 MB",
//       statut: "actif"
//     },
//     {
//       id: 3,
//       titre: "Budget 2024",
//       dateCreation: "2024-01-10",
//       type: "XLSX",
//       taille: "1.8 MB",
//       statut: "archivé"
//     },
//     {
//       id: 4,
//       titre: "Manuel Utilisateur",
//       dateCreation: "2024-03-01",
//       type: "PDF",
//       taille: "3.2 MB",
//       statut: "actif"
//     }
//   ];
const getTypeColor = (type) => {
    const colors = {
      'PDF': 'danger',
      'DOCX': 'primary',
      'TXT': 'success',
      'default': 'secondary'
    };
    return colors[type] || colors.default;
  };
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  return (
<>        <Navbar/>

    <div className="container mt-4">
      {/* Profile Card */}
      <div className="card mb-4 shadow">
  <div className="card-body">
    <div className="row align-items-center">
      <div className="col-md-2 text-center">
        <img
          src={user.imagePath ? `data:image/jpeg;base64,${user.imagePath}` : "images/default-avatar.jpg"} 
          className="rounded-circle mx-auto d-block"
          alt={user.nom}
          style={{ width: '80px', height: '80px', objectFit: 'cover' }}
        />
      </div>
      <div className="col-md-10">
        <h2>{user.nom}</h2>
        <div className="badge bg-success me-2">{user.type}</div>
        <p className="text-muted mb-1">{user.email}</p>
        <small className="text-muted">
          ID: {user.id} | Membre depuis: {user.nom}
        </small>
      </div>
    </div>
  </div>
</div>
<Link to="/edit-profile" className="btn btn-outline-primary">
  Edit Profile
</Link>



      {/* Documents Table */}
      <div className="container-fluid py-4 px-4" style={{ backgroundColor: '#f8f9fa' }}>
          {/* Header Section */}
          <div className="row mb-4">
            <div className="col-md-6">
              <h2 className="fw-bold text-primary mb-0">
                <FileText className="me-2 d-inline-block" size={28} />
                Gestion des Documents
              </h2>
              <p className="text-muted mt-1">Gérez vos documents académiques</p>
            </div>
          </div>

          {/* Main Content */} <button className="btn btn-sm btn-outline-primary"                            onClick={() => window.location.href = `/createDocuments`}>
                        create document
                      </button>

          <div className="card border-0 shadow-sm">
            
            <div className="card-body p-0">
                
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th className="border-0 px-4 py-3">Titre</th>
                      <th className="border-0 px-4">Description</th>
                      <th className="border-0 px-4">Type</th>
                      <th className="border-0 px-4">Filière</th>
                      <th className="border-0 px-4">Niveau</th>
                      <th className="border-0 px-4">
                        <FontAwesomeIcon icon={faThumbsUp} size="lg" className="text-success" /> Like
                      </th>
                      <th className="border-0 px-4">
                        <FontAwesomeIcon icon={faThumbsDown} size="lg" className="text-danger" /> Dislike
                      </th>
                      <th className="border-0 px-4">Date</th>
                      <th className="border-0 px-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDocuments.map((document) => (
                      <tr key={document.id}>
                        <td className="px-4 py-3">
                          <div className="fw-semibold text-dark">{document.titre}</div>
                        </td>
                        <td className="px-4">
                          <div className="text-muted">{document.description}</div>
                        </td>
                        <td className="px-4">
                          <span className={`badge bg-${getTypeColor(document.type?.typeName)} bg-opacity-75`}>
                            {document.type?.typeName}
                          </span>
                        </td>
                        <td className="px-4">{document.filier}</td>
                        <td className="px-4">
                          <span className="badge bg-info bg-opacity-75">{document.user}</span>
                        </td>
                        <td className="px-4">
                          <span className="badge bg-info bg-opacity-75">{document.likes}</span>
                        </td>
                        <td className="px-4">
                          <span className="badge bg-info bg-opacity-75">{document.dislike}</span>
                        </td>
                        <td className="px-4">
                          <small className="text-muted">
                            {new Date(document.date).toLocaleDateString()}
                          </small>
                        </td>
                        <td className="px-4 text-center">
                          <button
                            onClick={() => handleDelete(document)}
                            className="btn btn-link text-danger p-2"
                            title="Supprimer"
                          >
                            <Trash2 size={18} />
                          </button>
                          <button
                           onClick={() => window.location.href = `/updateDocuments/${document.id}`}
                            className="btn btn-link text-danger p-2"
                            title="Supprimer"
                          >
                            <Edit2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredDocuments.length === 0 && (
                <div className="text-center py-5">
                  <FileText size={48} className="text-muted mb-3" />
                  <h5 className="text-muted">Aucun document trouvé</h5>
                  <p className="text-muted mb-0">Ajoutez des documents ou modifiez vos critères de recherche</p>
                </div>
              )}
            </div>
          </div>

          {/* Delete Modal */}
          {showDeleteModal && (
            <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content border-0 shadow">
                  <div className="modal-header border-0">
                    <h5 className="modal-title">Confirmer la suppression</h5>
                    <button 
                      type="button" 
                      className="btn-close" 
                      onClick={() => setShowDeleteModal(false)}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="text-center mb-4">
                      <div className="rounded-circle bg-danger bg-opacity-10 p-3 d-inline-block mb-3">
                        <Trash2 size={32} className="text-danger" />
                      </div>
                      <h5>Êtes-vous sûr ?</h5>
                      <p className="text-muted mb-0">
                        Vous êtes sur le point de supprimer "{documentToDelete?.titre}". 
                        Cette action est irréversible.
                      </p>
                    </div>
                  </div>
                  <div className="modal-footer border-0">
                    <button 
                      type="button" 
                      className="btn btn-light px-4"
                      onClick={() => setShowDeleteModal(false)}
                    >
                      Annuler
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-danger px-4" 
                      onClick={confirmDelete}
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
    </div>
    </>
  );
};

export default Profile;