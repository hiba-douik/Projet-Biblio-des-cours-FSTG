import React, { useState, useEffect } from 'react';
import { Trash2, Eye, Download } from 'lucide-react';
import SidebarAdmin from '../layouts/SidebarAdmin';
import Navbar from '../layouts/NavbarAdmin';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

const DocumentList = () => {
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Configure axios interceptor for global error handling
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      response => response,
      error => {
        console.error('Axios interceptor caught error:', error);
        return Promise.reject(error);
      }
    );

    // Cleanup interceptor
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  // Fetch all documents
  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/document/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDocuments(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching documents:', error);
      setError('Failed to load documents. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch document details by ID
  const fetchDocumentById = async (id) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/document/${id}/metadata`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSelectedDocument(response.data);
      setShowModal(true);
      setError(null);
    } catch (error) {
      console.error('Error fetching document details:', error);
      setError('Failed to load document details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Delete document function
  const deleteDocument = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/document/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchDocuments();
    } catch (error) {
      console.error('Error deleting document:', error);
      alert('Failed to delete document. Please try again.');
    }
  };

  // Enhanced download document function
  const downloadDocument = async (id, title) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/document/${id}/download`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob', // Expecting a binary response
      });
  
      // Validate response
      if (!response.data) {
        throw new Error('No document data received');
      }
  
      // Extract filename and content type from response headers
      const contentDisposition = response.headers['content-disposition'];
      const mimeType = response.headers['content-type'] || 'application/pdf';
      let filename = title + '.pdf'; // Default filename if not provided in headers
  
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="?([^"]+)"?/);
        if (match && match[1]) {
          filename = match[1];
        }
      }
  
      // Create blob and trigger download
      const blob = new Blob([response.data], { type: mimeType });
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
  
      // Cleanup
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
  
      setError(null);
    } catch (error) {
      console.error('Detailed download error:', error);
      
      // Handle different error scenarios
      if (error.response) {
        console.error('Server response error:', error.response.data);
        console.error('Status code:', error.response.status);
        setError(`Download failed: ${error.response.status} - ${error.response.statusText}`);
      } else if (error.request) {
        console.error('No response received:', error.request);
        setError('No response from server. Check your connection.');
      } else {
        console.error('Request setup error:', error.message);
        setError(`Download failed: ${error.message}`);
      }
  
      alert(`Download Error: ${error.message}. Please check your connection and try again.`);
    } finally {
      setLoading(false);
    }
  };
  

  // Fetch documents on component mount
  useEffect(() => {
    fetchDocuments();
  }, []);

  // Render loading state
  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  // Render error state
  if (error) {
    return (
      <div className="alert alert-danger text-center" role="alert">
        {error}
        <button onClick={fetchDocuments} className="btn btn-sm btn-outline-danger ml-2">
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <SidebarAdmin />
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
        <Navbar />
        <div className="container-fluid py-4 px-4">
          <div className="card border-0 shadow-sm">
            <div className="table-responsive">
              <table className="table table-hover">
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
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map((doc) => (
                    <tr key={doc.document.id}>
                      <td>{doc.document.titre}</td>
                      <td>{doc.document.description}</td>
                      <td>{doc.document.type.name}</td>
                      <td>{doc.document.filier}</td>
                      <td>{doc.document.niveaux}</td>
                      <td>{doc.document.likes}</td>
                      <td>{doc.document.dislike}</td>
                      <td>
                        <button 
                          className="btn btn-link text-info me-2" 
                          onClick={() => fetchDocumentById(doc.document.id)} 
                          title="View Document"
                        >
                          <Eye size={18} />
                        </button>
                        <button 
                          className="btn btn-link text-success me-2" 
                          onClick={() => downloadDocument(
                            doc.document.id, 
                            doc.document.titre, 
                            doc.document.fileType
                          )} 
                          title="Download Document"
                        >
                          <Download size={18} />
                        </button>
                        <button 
                          className="btn btn-link text-danger" 
                          onClick={() => deleteDocument(doc.document.id)} 
                          title="Delete Document"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Document Modal */}
        {showModal && selectedDocument && (
          <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1050 }}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{selectedDocument.document.titre}</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body">
                  <p><strong>Description:</strong> {selectedDocument.document.description}</p>
                  <p><strong>Uploaded By:</strong> {selectedDocument.document.uploadedBy}</p>
                  <p><strong>Uploaded On:</strong> {new Date(selectedDocument.document.uploadedAt).toLocaleDateString()}</p>
                  
                  <div className="mt-3 text-center">
                    <button 
                      className="btn btn-primary" 
                      onClick={() => downloadDocument(
                        selectedDocument.document.id, 
                        selectedDocument.document.titre, 
                        selectedDocument.document.fileType
                      )}
                    >
                      <Download size={18} className="me-2" /> Download Document
                    </button>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default DocumentList;