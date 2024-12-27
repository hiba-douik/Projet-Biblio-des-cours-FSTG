import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Search, ChevronRight, Filter, Book, User, ThumbsUp, ThumbsDown } from 'lucide-react';
import Footer from '../components/Users/layouts/Footer';
import Navbar from '../components/Users/layouts/Navbar';
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
  const [filieres] = useState(["Science", "Technologie", "Lettres", "Économie", "Droit"]);
  const [niveauxOptions] = useState(["Licence 1", "Licence 2", "Licence 3", "Master 1", "Master 2", "Doctorat"]);
  const [selectedFilieres, setSelectedFilieres] = useState([]);
  const [selectedNiveaux, setSelectedNiveaux] = useState([]);
  const [bibliotheques, setBibliotheques] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedBibliotheques, setSelectedBibliotheques] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  
  const fetchDocuments = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/document/search`, {
        params: {
          titre: searchTerm,
          bibliotheques: selectedBibliotheques.join(','),
          types: selectedTypes.join(','),
          filier: selectedFilieres.join(','),
          niveaux: selectedNiveaux.join(','),
          page: currentPage - 1,
          size: 9,
        }
      });
      setDocuments(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, selectedBibliotheques, selectedTypes, selectedFilieres, selectedNiveaux, currentPage]);

  const toggleFiliere = (filiere) => {
    setSelectedFilieres((prev) =>
      prev.includes(filiere) ? prev.filter((f) => f !== filiere) : [...prev, filiere]
    );
  };

  const toggleNiveau = (niveau) => {
    setSelectedNiveaux((prev) =>
      prev.includes(niveau) ? prev.filter((n) => n !== niveau) : [...prev, niveau]
    );
  };

  const fetchBibliotheques = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/bibliotique/all`);
      setBibliotheques(response.data);
    } catch (error) {
      console.error('Error fetching bibliothèques:', error);
    }
  };

  const fetchTypes = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/type/all`);
      setTypes(response.data);
    } catch (error) {
      console.error('Error fetching types:', error);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchDocuments();
    }, 300);
  
    return () => clearTimeout(debounceTimer);
  }, [fetchDocuments]);

  useEffect(() => {
    fetchBibliotheques();
    fetchTypes();
  }, []);
  
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
    setSelectedFilieres([]);
    setSelectedNiveaux([]);
    setSelectedBibliotheques([]);
    setSelectedTypes([]);
    fetchDocuments();
  };

  const handleCheckboxChange = (e, setFunction, selectedArray) => {
    const value = e.target.value;
    const checked = e.target.checked;
    if (checked) {
      setFunction([...selectedArray, value]);
    } else {
      setFunction(selectedArray.filter((item) => item !== value));
    }
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
       <div className="container-fluid">
        <div className="row">
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3 bg-light p-4">
            <h5>
              <Filter size={20} /> Filter Documents
            </h5>
            <hr />
            <div>
              <h5>Bibliothèques</h5>
              <ul className="list-unstyled">
                {bibliotheques.map((bibliotheque) => (
                  <li key={bibliotheque.id}>
                    <label>
                      <input
                        type="checkbox"
                        value={bibliotheque.id}
                        onChange={(e) =>
                          handleCheckboxChange(e, setSelectedBibliotheques, selectedBibliotheques)
                        }
                      />{' '}
                      {bibliotheque.nom}
                    </label>
                  </li>
                ))}
              </ul>

              <h5>Types de Documents</h5>
              <ul className="list-unstyled">
                {types.map((type) => (
                  <li key={type.id}>
                    <label>
                      <input
                        type="checkbox"
                        value={type.id}
                        onChange={(e) => handleCheckboxChange(e, setSelectedTypes, selectedTypes)}
                      />{' '}
                      {type.name}
                    </label>
                  </li>
                ))}
              </ul>

              <h6>Filieres</h6>
              {filieres.map((filiere) => (
                <div key={filiere} className="form-check">
                  <input
                    type="checkbox"
                    id={`filiere-${filiere}`}
                    className="form-check-input"
                    checked={selectedFilieres.includes(filiere)}
                    onChange={() => toggleFiliere(filiere)}
                  />
                  <label className="form-check-label" htmlFor={`filiere-${filiere}`}>
                    {filiere}
                  </label>
                </div>
              ))}

              <h6>Niveaux</h6>
              {niveauxOptions.map((niveau) => (
                <div key={niveau} className="form-check">
                  <input
                    type="checkbox"
                    id={`niveau-${niveau}`}
                    className="form-check-input"
                    checked={selectedNiveaux.includes(niveau)}
                    onChange={() => toggleNiveau(niveau)}
                  />
                  <label className="form-check-label" htmlFor={`niveau-${niveau}`}>
                    {niveau}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="col-md-9">
            <div className="my-4">
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
            {isLoading ? (
              <div className="d-flex justify-content-center align-items-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : documents.length === 0 ? (
              <div className="text-center py-5">
                <h3>No documents found</h3>
              </div>
            ) : (
              <div className="row g-4">
                {documents.map((doc) => (
                  <div className="col-md-4" key={doc.id}>
                    <div className="card h-100 shadow-sm border-0">
                      <div className="card-body d-flex flex-column position-relative">
            
                      {/* User image or default icon in the top-left corner */}
                        <img
                        src={doc.utilisateur.imagePath ? `data:image/jpeg;base64,${doc.utilisateur.imagePath}` : "images/book1.jpg"}                          alt={`${doc.utilisateur.nom}'s profile`}
                          className="position-absolute top-0 start-0 rounded-circle m-2"
                          style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                          onClick={() => (window.location.href = `/user/${doc.utilisateur.id}`)}
                        />
                     
            
                      {/* Titre du document */}
                      <div className="d-flex align-items-center mb-2">
                        <Book size={18} className="text-primary me-2" />
                        <h5 className="card-title text-primary fw-bold mb-0">{doc.titre}</h5>
                      </div>
                      {/* Nom du créateur */}
                      <div className="d-flex align-items-center mb-3" onClick={() => (window.location.href = `/user/${doc.utilisateur.id}`)}>
                        <User size={18} className="me-2 text-secondary" />
                        <span className="text-muted small">Créé par : {doc.utilisateur.nom}</span>
                      </div>
                      {/* Nom de la bibliothèque */}
                      <div className="d-flex align-items-center mb-2">
                        <Book size={18} className="me-2 text-secondary" />
                        <span className="text-muted small">{doc.bibliotheque.nom}</span>
                      </div>
            
                      
            
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        {/* Likes */}
                        <div className="d-flex align-items-center">
                          <ThumbsUp size={18} className="me-2 text-success" />
                          <span className="text-muted small">{doc.likes}</span>
                        </div>
            
                        {/* Dislikes */}
                        <div className="d-flex align-items-center">
                          <ThumbsDown size={18} className="me-2 text-danger" />
                          <span className="text-muted small">{doc.dislike}</span>
                        </div>
                      </div>
            
                      {/* Description */}
                      <p className="card-text text-truncate mb-4">
                      {doc.description.length > 15 ? doc.description.slice(0, 15) + '...' : doc.description}
                    </p>            
                      {/* Bouton View Details */}
                      <button
                        className="btn btn-primary w-100 mt-auto d-flex align-items-center justify-content-center"
                        onClick={() => navigate(`/document/${doc.id}`)}
                      >
                        Voir les détails <ChevronRight size={18} className="ms-2" />
                      </button>
                    </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
    </div>
    </div>
  );
}

export default Product;

