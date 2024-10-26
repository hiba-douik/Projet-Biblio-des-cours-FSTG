import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Upload, X, File, Edit2 } from 'lucide-react';

const EditDocumentForm = ({ documentId, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    filier: '',
    niveaux: '',
    bibliothequeId: 1,
    typeId: 1,
    userId: 3,
    file: null
  });
  
  const [types, setTypes] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [fileError, setFileError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [currentFileName, setCurrentFileName] = useState('');
  
  const filieres = ["Science", "Technologie", "Lettres", "Économie", "Droit"];
  const niveaux = ["Licence 1", "Licence 2", "Licence 3", "Master 1", "Master 2", "Doctorat"];

  // Charger les données du document et les types au montage du composant
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Charger les types
        const typesResponse = await fetch('http://localhost:9000/api/type/all', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const typesData = await typesResponse.json();
        setTypes(typesData);

        // Charger les données du document
        const documentResponse = await fetch(`http://localhost:9000/api/document/${documentId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (!documentResponse.ok) throw new Error('Erreur lors du chargement du document');
        
        const documentData = await documentResponse.json();
        setFormData({
          titre: documentData.titre,
          description: documentData.description,
          filier: documentData.filier,
          niveaux: documentData.niveaux,
          bibliothequeId: documentData.bibliotheque.id,
          typeId: documentData.type.id,
          userId: documentData.utilisateur.id,
          file: null
        });
        setCurrentFileName(documentData.filePath.split('/').pop()); // Extraire le nom du fichier du chemin

      } catch (error) {
        console.error('Erreur:', error);
        setSubmitError('Erreur lors du chargement des données');
      }
    };

    fetchData();
  }, [documentId]);

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
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token d\'authentification manquant');
      }

      const formDataToSend = new FormData();
      formDataToSend.append('titre', formData.titre);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('filier', formData.filier);
      formDataToSend.append('niveaux', formData.niveaux);
      formDataToSend.append('bibliothequeId', formData.bibliothequeId);
      formDataToSend.append('typeId', formData.typeId);
      formDataToSend.append('userid', formData.userId);
      if (formData.file) {
        formDataToSend.append('file', formData.file);
      }

      const response = await fetch(`http://localhost:9000/api/document/${documentId}`, {
        method: 'PUT',
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
      
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      setSubmitError(error.message || 'Erreur lors de la mise à jour du document');
    }
  };

  return (
    <div className="container-fluid py-5 px-4 bg-light">
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white border-0 py-4 d-flex align-items-center">
          <Edit2 size={24} className="text-primary me-2" />
          <h5 className="mb-0 text-secondary">Modifier le Document</h5>
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
                      {currentFileName ? (
                        <div className="mb-3">
                          <File size={24} className="text-primary mb-2" />
                          <p>Fichier actuel: {currentFileName}</p>
                        </div>
                      ) : null}
                      <Upload size={48} className="text-primary mb-3" />
                      <h5>Glissez et déposez un nouveau fichier ici</h5>
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
                  >
                    Mettre à jour
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

export default EditDocumentForm;