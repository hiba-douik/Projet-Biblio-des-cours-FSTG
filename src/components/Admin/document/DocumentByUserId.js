import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Trash2, FileText, Edit2 } from 'lucide-react';

import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faFilePdf  } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../layouts/NavbarAdmin';
import SidebarAdmin from '../layouts/SidebarAdmin';


const DocumentByUserId = () => {
  const { userId } = useParams();  // Récupérer le paramètre userId depuis l'URL

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
  
 
  const API_BASE_URL = `${process.env.REACT_APP_API_URL}`+'';

  // Fetch user data when component mounts
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/user/${userId}`,{
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch user data');
        return response.json();
      })
      .then((data) => {
        setUser({
          nom: data.nom,   // Assurez-vous que le champ correspond aux données de votre API (nom au lieu de name)
          email: data.email,
          type: data.type,
          imagePath: data.imagePath,
          image: null,
        });
      })
      .catch((error) => console.error('Error fetching user data:', error));
  }, [userId]);

  // Function to fetch documents from the API
  const fetchDocuments = async () => {
    try {

      const token = localStorage.getItem('token'); // Retrieve token from local storage
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/document/user/${userId}`, {
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
  const formatFilePath = (fileName) => {
    // Implement any specific formatting logic if needed, or simply return the file name
    return fileName;
  };
  
  const handleDownload = async (document) => {
    const token = localStorage.getItem('token'); // Récupérer le token du stockage local
  
    if (!document.filePath) return;
  
    const filePath = formatFilePath(document.filePath.split('\\').pop());
    const url = `${process.env.REACT_APP_API_URL}/uploads/documents/${filePath}`; // Utilisez le chemin correct pour le fichier
  
    console.log("Download URL:", url);
    console.log("Token:", token);
  
    try {
      // Ouvrir le fichier PDF dans un nouvel onglet directement
      window.open(url);
    } catch (error) {
      console.error("Error opening PDF:", error); // Log l'erreur
      alert('Échec de l\'ouverture du fichier PDF.');
    }
  };

  return (
<>            <SidebarAdmin />

<main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
  <Navbar />

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

          {/* Main Content */} 

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
                  <th className="border-0 px-4">Actions</th>
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
                    <td className="px-4">{document.niveaux}</td>
                    <td className="px-4 text-center">
                      {/* Download PDF Button */}
                      {document.filePath && (
                        <button
                          onClick={() => handleDownload(document)} // Pass the document here
                          className="btn btn-link text-primary p-2"
                          title="Télécharger le PDF"
                        >
                          <FontAwesomeIcon icon={faFilePdf} size="lg" />
                        </button>
                      )}
                      
                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(document)}
                        className="btn btn-link text-danger p-2"
                        title="Supprimer"
                      >
                        <Trash2 size={18} />
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
    </main>

    </>
  );
};

export default DocumentByUserId;