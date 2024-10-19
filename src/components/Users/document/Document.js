import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Trash2, FileText, Search, Filter, Edit } from 'lucide-react';

const DocumentList = () => {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      titre: "Mathematics Course",
      description: "Advanced calculus materials",
      type: "PDF",
      filier: "Science",
      niveux: "Bachelor",
      date: "2024-03-15"
    },
    {
      id: 2,
      titre: "Physics Labs",
      description: "Laboratory experiments guide",
      type: "DOCX",
      filier: "Science",
      niveux: "Master",
      date: "2024-03-14"
    }
  ]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState(null);
  const [documentToEdit, setDocumentToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleDelete = (document) => {
    setDocumentToDelete(document);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setDocuments(documents.filter(doc => doc.id !== documentToDelete.id));
    setShowDeleteModal(false);
    setDocumentToDelete(null);
  };

  const handleEdit = (document) => {
    setDocumentToEdit(document);
    setShowEditModal(true);
  };

  const confirmEdit = () => {
    setDocuments(documents.map(doc => 
      doc.id === documentToEdit.id ? documentToEdit : doc
    ));
    setShowEditModal(false);
    setDocumentToEdit(null);
  };

  const getTypeColor = (type) => {
    const colors = {
      'PDF': 'danger',
      'DOCX': 'primary',
      'TXT': 'success',
      'default': 'secondary'
    };
    return colors[type] || colors.default;
  };

  const filteredDocuments = documents.filter(doc =>
    doc.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container-fluid py-4 px-4" style={{ backgroundColor: '#f8f9fa' }}>
      {/* Header Section */}
      <div className="row mb-4">
        <div className="col-md-6">
          <h2 className="fw-bold text-primary mb-0">
            <FileText className="me-2 d-inline-block" size={28} />
            Gestion de mes Documents
          </h2>
          <p className="text-muted mt-1">Gérez Mon documents académiques</p>
        </div>
        <div className="col-md-6 text-end">
          <button className="btn btn-success me-2" onClick={() => handleEdit({})}>
            Ajouter un document
          </button>
        
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
                      <span className={`badge bg-${getTypeColor(document.type)} bg-opacity-75`}>
                        {document.type}
                      </span>
                    </td>
                    <td className="px-4">{document.filier}</td>
                    <td className="px-4">
                      <span className="badge bg-info bg-opacity-75">{document.niveux}</span>
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
                        onClick={() => handleEdit(document)}
                        className="btn btn-link text-warning p-2"
                        title="Modifier"
                      >
                        <Edit size={18} />
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

      {/* Edit Modal */}
      {showEditModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow">
              <div className="modal-header border-0">
                <h5 className="modal-title">Modifier le Document</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowEditModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Titre</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={documentToEdit?.titre || ''} 
                    onChange={(e) => setDocumentToEdit({ ...documentToEdit, titre: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea 
                    className="form-control" 
                    value={documentToEdit?.description || ''} 
                    onChange={(e) => setDocumentToEdit({ ...documentToEdit, description: e.target.value })}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Type</label>
                  <select 
                    className="form-select" 
                    value={documentToEdit?.type || ''} 
                    onChange={(e) => setDocumentToEdit({ ...documentToEdit, type: e.target.value })}
                  >
                    <option value="">Choisir un type</option>
                    <option value="PDF">PDF</option>
                    <option value="DOCX">DOCX</option>
                    <option value="TXT">TXT</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Filière</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={documentToEdit?.filier || ''} 
                    onChange={(e) => setDocumentToEdit({ ...documentToEdit, filier: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Niveau</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={documentToEdit?.niveux || ''} 
                    onChange={(e) => setDocumentToEdit({ ...documentToEdit, niveux: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Date</label>
                  <input 
                    type="date" 
                    className="form-control" 
                    value={documentToEdit?.date || ''} 
                    onChange={(e) => setDocumentToEdit({ ...documentToEdit, date: e.target.value })}
                  />
                </div>
              </div>
              <div className="modal-footer border-0">
                <button 
                  type="button" 
                  className="btn btn-light px-4"
                  onClick={() => setShowEditModal(false)}
                >
                  Annuler
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary px-4" 
                  onClick={confirmEdit}
                >
                  Sauvegarder
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentList;
