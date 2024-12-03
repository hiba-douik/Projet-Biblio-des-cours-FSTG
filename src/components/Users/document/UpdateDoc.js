import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Upload, X, File, Plus } from 'lucide-react';
import Navbar from '../layouts/Navbar';

const UpdateDoc = () => {
  const { documentId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    filier: '',
    niveaux: '',
    bibliothequeId: '',
    typeId: '',
    userId: '',
    file: null,
  });

  const [types, setTypes] = useState([]);
  const [bibliotheques, setBibliotheques] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [fileError, setFileError] = useState('');
  const [submitError, setSubmitError] = useState('');

  const filieres = ["Science", "Technologie", "Lettres", "Économie", "Droit"];
  const niveaux = ["Licence 1", "Licence 2", "Licence 3", "Master 1", "Master 2", "Doctorat"];

  const fetchBibliotheques = async (token) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/bibliotique/all`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Failed to fetch bibliotheques');
    const data = await response.json();
    setBibliotheques(data);
    return data;
  };

  const fetchTypes = async (token) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/type/all`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Failed to fetch types');
    const data = await response.json();
    setTypes(data);
    return data;
  };

  const fetchDocument = async (token) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/auth/document/${documentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    if (!response.ok) throw new Error('Failed to fetch document');
    const data = await response.json();
    return data.document;
  };

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      const token = localStorage.getItem('token');

      try {
        const [documentData, bibliothequesData, typesData] = await Promise.all([
          fetchDocument(token),
          fetchBibliotheques(token),
          fetchTypes(token),
        ]);

        setFormData({
          titre: documentData.titre || '',
          description: documentData.description || '',
          filier: documentData.filier || '',
          niveaux: documentData.niveaux || '',
          bibliothequeId: documentData.bibliotheque.id || '',
          typeId: documentData.type.id || '',
          userId: documentData.userId || '',
          file: null,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        setSubmitError('Erreur lors du chargement des données');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, [documentId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
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
      setFormData((prev) => ({ ...prev, file }));
    } else {
      setFileError('Le fichier ne doit pas dépasser 10MB');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    try {
      const token = localStorage.getItem('token');
      const formDataToSend = new FormData();

      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null && key !== 'file') {
          formDataToSend.append(key, formData[key]);
        }
      });

      if (formData.file) {
        formDataToSend.append('file', formData.file);
      }

      const url = `${process.env.REACT_APP_API_URL}/api/auth/document/${documentId}?userId=${formData.userId}`;

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la mise à jour');
      }

      navigate('/profile');
    } catch (error) {
      console.error('Error updating document:', error);
      setSubmitError(error.message || 'Erreur lors de la mise à jour du document');
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Chargement des données...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container-fluid py-5 px-4 bg-light">
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white border-0 py-4 d-flex align-items-center">
            <Plus size={24} className="text-primary me-2" />
            <h5 className="mb-0 text-secondary">Modifier le Document</h5>
          </div>
          <div className="card-body p-4">
            {submitError && (
              <div className="alert alert-danger" role="alert">
                {submitError}
              </div>
            )}
  
            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
              <div className="row g-4">
                {/* Zone de téléchargement du fichier */}
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
                          onClick={() => setFormData((prev) => ({ ...prev, file: null }))}
                        >
                          <X size={20} />
                        </button>
                      </div>
                    )}
                    {fileError && <div className="text-danger mt-2 small">{fileError}</div>}
                  </div>
                </div>
  
                {/* Champ Titre */}
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
  
                {/* Bibliothèque et Type */}
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
                      {/* {bibliotheques.map((biblio) => (
                        <option key={biblio.id} value={biblio.id}>
                          {biblio.name}
                        </option>
                      ))} */}

                        {bibliotheques.map((bib) => (
                        <option key={bib.id} value={bib.id}>
                          {bib.nom}
                        </option>
                      ))}
                    </select>
                    <label htmlFor="bibliothequeId">Bibliothèque</label>
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
                      {types.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.name}
                        </option>
                      ))}
                    </select>
                    <label htmlFor="typeId">Type de document</label>
                  </div>
                </div>
  
                {/* Filière et Niveau */}
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
                      {filieres.map((filiere) => (
                        <option key={filiere} value={filiere}>
                          {filiere}
                        </option>
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
                      {niveaux.map((niveau) => (
                        <option key={niveau} value={niveau}>
                          {niveau}
                        </option>
                      ))}
                    </select>
                    <label htmlFor="niveaux">Niveau</label>
                  </div>
                </div>
  
                {/* Champ Description */}
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
  
                {/* Boutons d'action */}
                <div className="col-12">
                  <div className="d-flex justify-content-end gap-3">
                    <button
                      type="button"
                      className="btn btn-outline-secondary px-4"
                      onClick={() => navigate('/profile')}
                    >
                      Annuler
                    </button>
                    <button type="submit" className="btn btn-primary px-4">
                      Mettre à jour le document
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
  
};

export default UpdateDoc;
