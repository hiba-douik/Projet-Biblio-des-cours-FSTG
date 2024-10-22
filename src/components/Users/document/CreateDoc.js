import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Upload, X, File, Plus } from 'lucide-react';

const AddDocumentForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    type: '',
    filier: '',
    niveaux: '',
    file: null
  });
  const [dragActive, setDragActive] = useState(false);
  const [fileError, setFileError] = useState('');
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
        file: file,
        type: file.name.split('.').pop().toUpperCase()
      }));
    } else {
      setFileError('Le fichier ne doit pas dépasser 10MB');
    }
  };

  const handleFileInput = (e) => handleFileSelect(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('token'); // Retrieve token from local storage
    const formDataToSend = new FormData();

    // Append form data
    formDataToSend.append('titre', formData.titre);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('filier', formData.filier);
    formDataToSend.append('niveaux', formData.niveaux);
    formDataToSend.append('file', formData.file);
    
    try {
      const response = await fetch('http://localhost:9000/api/document/save', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Include token in headers
        },
        body: formDataToSend,
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de l\'ajout du document');
      }
      
      const data = await response.json();
      if (onSubmit) onSubmit(data);
    } catch (error) {
      console.error(error);
      // Handle error (e.g., show an error message)
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
          <form onSubmit={handleSubmit}>
            <div className="row g-4">
              {/* Drag-and-Drop File Upload */}
              <div className="col-12">
                <div
                  className={`border-2 border-dashed rounded-3 p-5 text-center ${dragActive ? 'bg-light border-primary' : 'border-secondary'}`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  aria-label="Drag and Drop File Upload"
                >
                  {!formData.file ? (
                    <div className="py-3">
                      <Upload size={48} className="text-primary mb-3" />
                      <h5>Glissez et déposez votre fichier ici</h5>
                      <p className="text-muted mb-2">ou</p>
                      <label className="btn btn-outline-primary mb-2">
                        Choisir un fichier
                        <input type="file" className="d-none" onChange={handleFileInput} accept=".pdf,.doc,.docx,.txt" />
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
                      <button type="button" className="btn btn-link text-danger p-2" onClick={() => setFormData(prev => ({ ...prev, file: null }))}>
                        <X size={20} />
                      </button>
                    </div>
                  )}
                  {fileError && <div className="text-danger mt-2 small">{fileError}</div>}
                </div>
              </div>

              {/* Form Fields */}
              <div className="col-md-6">
                <div className="form-floating">
                  <input type="text" className="form-control" id="titre" name="titre" placeholder="Titre du document" value={formData.titre} onChange={handleChange} required />
                  <label htmlFor="titre">Titre du document</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating">
                  <select className="form-select" id="filier" name="filier" value={formData.filier} onChange={handleChange} required>
                    <option value="">Sélectionner une filière</option>
                    {filieres.map(filiere => <option key={filiere} value={filiere}>{filiere}</option>)}
                  </select>
                  <label htmlFor="filier">Filière</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating">
                  <select className="form-select" id="niveux" name="niveux" value={formData.niveux} onChange={handleChange} required>
                    <option value="">Sélectionner un niveau</option>
                    {niveaux.map(niveau => <option key={niveau} value={niveau}>{niveau}</option>)}
                  </select>
                  <label htmlFor="niveux">Niveau</label>
                </div>
              </div>
              <div className="col-12">
                <div className="form-floating">
                  <textarea className="form-control" id="description" name="description" placeholder="Description" value={formData.description} onChange={handleChange} style={{ height: '120px' }} required />
                  <label htmlFor="description">Description</label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="col-12">
                <div className="d-flex justify-content-end gap-3">
                  <button type="button" className="btn btn-outline-secondary px-4" onClick={onCancel}>Annuler</button>
                  <button type="submit" className="btn btn-primary px-4" disabled={!formData.file || fileError}>Ajouter le document</button>
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
