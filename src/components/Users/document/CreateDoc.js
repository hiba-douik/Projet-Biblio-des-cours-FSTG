import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Upload, X, File, Plus } from 'lucide-react';

const AddDocumentForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    filier: '',
    niveaux: '',
    bibliothequeId: null, // Valeur par défaut ou à récupérer
    typeId: null,
    userId: null, // À récupérer depuis le contexte d'authentification
    file: null
  });
  const [types, setTypes] = useState([]);
  const [bibliotheques, setBibliotheques] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [fileError, setFileError] = useState('');
  const [submitError, setSubmitError] = useState('');

  // Fonction pour décoder le token JWT
  const decodeToken = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(window.atob(base64));
    } catch (error) {
      console.error('Erreur de décodage du token:', error);
      return null;
    }
  };

const fetchUserId = async (email) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:9000/api/users/${email}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Erreur lors de la récupération de l\'ID utilisateur');
      const userData = await response.json();

      return userData.id; // Assurez-vous que votre API renvoie l'ID dans cette structure
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  };

  // Effet pour récupérer l'ID utilisateur du token et les bibliothèques
  useEffect(() => {
    const fetchAndSetUserId = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = decodeToken(token);
        if (decodedToken?.sub) { // 'sub' contient généralement l'email dans le JWT
          try {
            const userId = await fetchUserId(decodedToken.sub);
            console.log(userId); // Pour vérifier l'ID utilisateur
            setFormData(prev => ({ ...prev, userId }));
          } catch (error) {
            console.error("Erreur lors de la récupération de l'ID utilisateur:", error);
          }
        }
      }
    };

    fetchAndSetUserId();

    // Charger les bibliothèques
    const fetchBibliotheques = async () => {
      try {
        const response = await fetch('http://localhost:9000/api/admin/bibliotique/all', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!response.ok) throw new Error('Erreur lors du chargement des bibliothèques');
        const data = await response.json();
        setBibliotheques(data);
      } catch (error) {
        console.error('Erreur:', error);
        setSubmitError('Erreur lors du chargement des bibliothèques');
      }
    };

    fetchBibliotheques();
  }, []);
 // Charger les types au montage du composant
 useEffect(() => {
  const fetchTypes = async () => {
    try {
      const response = await fetch('http://localhost:9000/api/type/all', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) throw new Error('Erreur lors du chargement des types');
      const data = await response.json();
      setTypes(data);
    } catch (error) {
      console.error('Erreur:', error);
      setSubmitError('Erreur lors du chargement des types');
    }
  };

  fetchTypes();
}, []);

  
  const filieres = ["Science", "Technologie", "Lettres", "Économie", "Droit"];
  const niveaux = ["Licence 1", "Licence 2", "Licence 3", "Master 1", "Master 2", "Doctorat"];

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFileSelect(e.dataTransfer.files[0]);
  };

  const handleFileSelect = (file) => {
    if (file && file.size <= 10 * 1024 * 1024) {
      setFileError('');
      setFormData(prev => ({
        ...prev,
        file: file
      }));
    } else {
      setFileError('Le fichier ne doit pas dépasser 10MB');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    
    if (!formData.userId) {
      setSubmitError('Utilisateur non authentifié');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token d\'authentification manquant');
      }

      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null) {
          formDataToSend.append(key, formData[key]);
        }
      });

      const response = await fetch('http://localhost:9000/api/document/save', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend,
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `Erreur ${response.status}`);
      }
      
      const data = await response.json();
      if (onSubmit) {
        onSubmit(data);
      }
      
      // Réinitialiser le formulaire...
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      setSubmitError(error.message || 'Erreur lors de l\'ajout du document');
    }
  };

  return (
    <div className="container-fluid py-5 px-4 bg-light">
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white border-0 py-4 d-flex align-items-center">
          <Plus size={24} className="text-primary me-2" />
          <h5 className="mb-0 text-secondary">Ajouter un Document</h5>
        </div>
        <div className="card-body p-4">
          {submitError && (
            <div className="alert alert-danger" role="alert">
              {submitError}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="row g-4">
              {/* Zone de dépôt de fichier */}
              <div className="col-12">
                <div
                  className={`border-2 border-dashed rounded-3 p-5 text-center ${
                    dragActive ? 'bg-light border-primary' : 'border-secondary'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  {!formData.file ? (
                    <div className="py-3">
                      <Upload size={48} className="text-primary mb-3" />
                      <h5>Glissez et déposez votre fichier ici</h5>
                      <p className="text-muted mb-2">ou</p>
                      <label className="btn btn-outline-primary mb-2">
                        Choisir un fichier
                        <input
                          type="file"
                          className="d-none"
                          onChange={(e) => handleFileSelect(e.target.files[0])}
                          accept=".pdf,.doc,.docx,.txt"
                        />
                      </label>
                      <p className="text-muted small mb-0">
                        Formats: PDF, DOC, DOCX, TXT (Max: 10MB)
                      </p>
                    </div>
                  ) : (
                    <div className="d-flex align-items-center justify-content-between bg-light rounded p-3">
                      <div className="d-flex align-items-center">
                        <File size={24} className="text-primary me-3" />
                        <div className="text-start">
                          <h6 className="mb-1">{formData.file.name}</h6>
                          <span className="text-muted small">
                            {(formData.file.size / (1024 * 1024)).toFixed(2)} MB
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn btn-link text-danger p-2"
                        onClick={() => setFormData(prev => ({ ...prev, file: null }))}
                      >
                        <X size={20} />
                      </button>
                    </div>
                  )}
                  {fileError && (
                    <div className="text-danger mt-2 small">{fileError}</div>
                  )}
                </div>
              </div>

              {/* Champs du formulaire */}
              <div className="col-md-6">
        <div className="form-floating">
          <select
            className="form-select"
            id="bibliothequeId"
            name="bibliothequeId"
            value={formData.bibliothequeId}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionner une bibliothèque</option>
            {bibliotheques.map(biblio => (
              <option key={biblio.id} value={biblio.id}>
                {biblio.location}
              </option>
            ))}
          </select>
          <label htmlFor="bibliothequeId">Bibliothèque</label>
        </div>
      </div>
              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="titre"
                    name="titre"
                    value={formData.titre}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="titre">Titre du document</label>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-floating">
                  <select
                    className="form-select"
                    id="typeId"
                    name="typeId"
                    value={formData.typeId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Sélectionner un type</option>
                    {types.map(type => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="typeId">Type de document</label>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-floating">
                  <select
                    className="form-select"
                    id="filier"
                    name="filier"
                    value={formData.filier}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Sélectionner une filière</option>
                    {filieres.map(filiere => (
                      <option key={filiere} value={filiere}>{filiere}</option>
                    ))}
                  </select>
                  <label htmlFor="filier">Filière</label>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-floating">
                  <select
                    className="form-select"
                    id="niveaux"
                    name="niveaux"
                    value={formData.niveaux}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Sélectionner un niveau</option>
                    {niveaux.map(niveau => (
                      <option key={niveau} value={niveau}>{niveau}</option>
                    ))}
                  </select>
                  <label htmlFor="niveaux">Niveau</label>
                </div>
              </div>

              <div className="col-12">
                <div className="form-floating">
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    style={{ height: '120px' }}
                    required
                  />
                  <label htmlFor="description">Description</label>
                </div>
              </div>

              <div className="col-12">
                <div className="d-flex justify-content-end gap-3">
                  <button
                    type="button"
                    className="btn btn-outline-secondary px-4"
                    onClick={onCancel}
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary px-4"
                    disabled={!formData.file || !!fileError}
                  >
                    Ajouter le document
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDocumentForm;