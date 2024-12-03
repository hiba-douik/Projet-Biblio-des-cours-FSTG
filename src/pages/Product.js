import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../components/Users/layouts/Footer';
import Navbar from '../components/Users/layouts/Navbar';
import { Search, Clock, Tag, Book, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Product() {
  const [documents, setDocuments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [documentsPerPage] = useState(9);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const fetchDocuments = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/document/search`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          titre: searchTerm,
          description: searchTerm
        }
      });
      setDocuments(response.data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchDocuments();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  const indexOfLastDocument = currentPage * documentsPerPage;
  const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;
  const currentDocuments = documents.slice(indexOfFirstDocument, indexOfLastDocument);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Navbar />

      {/* Hero Header */}
      <header className="bg-gradient text-white text-center py-5">
        <h1 className="display-4">Discover Our <span className="text-primary">Documents</span></h1>
      </header>

      {/* Search Box */}
      <div className="container my-4">
        <div className="input-group">
          <span className="input-group-text bg-white">
            <Search className="text-secondary" size={24} />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search for documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="container flex-grow-1">
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : currentDocuments.length === 0 ? (
          <div className="text-center py-5">
            <h3>No documents found</h3>
            <p>Try adjusting your search criteria.</p>
          </div>
        ) : (
          <div className="row g-4">
            {currentDocuments.map((document) => (
              <div className="col-md-4" key={document.id}>
                <div className="card h-100 shadow-sm">
                  {/* <img
                    src="template_user/images/people/senior-man-wearing-white-face-mask-covid-19-campaign-with-design-space.jpeg"
                    className="card-img-top"
                    alt="Document Thumbnail"
                  /> */}
                  <div className="card-body">
                    <h5 className="card-title">{document.titre}</h5>
                    <p className="card-text text-truncate">{document.description}</p>
                    <div className="mb-3">
                      {document.type?.name && (
                        <span className="badge bg-primary me-2">
                          <Book size={16} /> {document.type.name}
                        </span>
                      )}
                      {document.filier && (
                        <span className="badge bg-secondary">
                          <Tag size={16} /> {document.filier}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => navigate(`/document/${document.id}`)}
                      className="btn btn-primary w-100 d-flex align-items-center justify-content-center"
                    >
                      View Details <ChevronRight className="ms-2" size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {documents.length > documentsPerPage && (
          <nav className="mt-4">
            <ul className="pagination justify-content-center">
              {Array.from({ length: Math.ceil(documents.length / documentsPerPage) }).map((_, index) => (
                <li className={`page-item ${currentPage === index + 1 ? 'active' : ''}`} key={index}>
                  <button
                    className="page-link"
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Product;