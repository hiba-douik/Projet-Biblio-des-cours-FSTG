import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Footer from '../components/Users/layouts/Footer';
import Navbar from '../components/Users/layouts/Navbar';
import { Search, Filter, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Product() {
  const [documents, setDocuments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filier, setFilier] = useState('');
  const [niveaux, setNiveaux] = useState('');
  const [bibliothequeId, setBibliothequeId] = useState('');
  const [typeId, setTypeId] = useState('');
  const [minLikes, setMinLikes] = useState('');
  const [maxLikes, setMaxLikes] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [hasAttachments, setHasAttachments] = useState(false);
  const [tags, setTags] = useState([]);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('DESC');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  
  const fetchDocuments = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/document/search`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          searchTerm,
          filier,
          niveaux,
          bibliothequeId,
          typeId,
          minLikes,
          maxLikes,
          startDate,
          endDate,
          hasAttachments,
          tags: tags.join(','),
          sortBy,
          sortDirection,
          page: currentPage - 1,
          size: 9,
        },
      });
      setDocuments(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setIsLoading(false);
    }
  }, [
    searchTerm,
    filier,
    niveaux,
    bibliothequeId,
    typeId,
    minLikes,
    maxLikes,
    startDate,
    endDate,
    hasAttachments,
    tags,
    sortBy,
    sortDirection,
    currentPage,
  ]);
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchDocuments();
    }, 300);
  
    return () => clearTimeout(debounceTimer);
  }, [fetchDocuments]);
  
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchDocuments();
  };

  const handleReset = () => {
    setSearchTerm('');
    setFilier('');
    setNiveaux('');
    setBibliothequeId('');
    setTypeId('');
    setMinLikes('');
    setMaxLikes('');
    setStartDate('');
    setEndDate('');
    setHasAttachments(false);
    setTags([]);
    setSortBy('createdAt');
    setSortDirection('DESC');
    setCurrentPage(1);
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Navbar />

      {/* Hero Header */}
      <header className="bg-gradient text-white text-center py-5">
        <h1 className="display-4">Discover Our <span className="text-primary">Documents</span></h1>
      </header>

      {/* Search and Filter Form */}
      <div className="container my-4">
        <form onSubmit={handleSearch}>
          <div className="row g-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Search for documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Filier"
                value={filier}
                onChange={(e) => setFilier(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Niveaux"
                value={niveaux}
                onChange={(e) => setNiveaux(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <input
                type="number"
                className="form-control"
                placeholder="Bibliotheque ID"
                value={bibliothequeId}
                onChange={(e) => setBibliothequeId(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <input
                type="number"
                className="form-control"
                placeholder="Type ID"
                value={typeId}
                onChange={(e) => setTypeId(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <input
                type="number"
                className="form-control"
                placeholder="Min Likes"
                value={minLikes}
                onChange={(e) => setMinLikes(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <input
                type="number"
                className="form-control"
                placeholder="Max Likes"
                value={maxLikes}
                onChange={(e) => setMaxLikes(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <input
                type="date"
                className="form-control"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <input
                type="date"
                className="form-control"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <select
                className="form-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="createdAt">Created At</option>
                <option value="titre">Title</option>
                <option value="likes">Likes</option>
              </select>
            </div>
            <div className="col-md-3">
              <select
                className="form-select"
                value={sortDirection}
                onChange={(e) => setSortDirection(e.target.value)}
              >
                <option value="ASC">Ascending</option>
                <option value="DESC">Descending</option>
              </select>
            </div>
            <div className="col-md-12">
            </div>
            <div className="col-md-6">
              <button type="submit" className="btn btn-primary w-100">
                <Search className="me-2" size={18} />
                Search
              </button>
            </div>
            <div className="col-md-6">
              <button type="button" className="btn btn-secondary w-100" onClick={handleReset}>
                <Filter className="me-2" size={18} />
                Reset Filters
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Main Content */}
      <main className="container flex-grow-1">
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : documents.length === 0 ? (
          <div className="text-center py-5">
            <h3>No documents found</h3>
            <p>Try adjusting your search criteria.</p>
          </div>
        ) : (
          <div className="row g-4">
            {documents.map((document) => (
              <div className="col-md-4" key={document.id}>
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{document.titre}</h5>
                    <p className="card-text text-truncate">{document.description}</p>
                    <div className="mb-3">
                      {document.type?.name && (
                        <span className="badge bg-primary me-2">
                          {document.type.name}
                        </span>
                      )}
                      {document.filier && (
                        <span className="badge bg-secondary">
                          {document.filier}
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
        {totalPages > 1 && (
          <nav className="mt-4">
            <ul className="pagination justify-content-center">
              {Array.from({ length: totalPages }).map((_, index) => (
                <li className={`page-item ${currentPage === index + 1 ? 'active' : ''}`} key={index}>
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(index + 1)}
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

