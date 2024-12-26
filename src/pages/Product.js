import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, ChevronRight, Filter,  Book, User,ThumbsUp, ThumbsDown } from 'lucide-react';
import Footer from '../components/Users/layouts/Footer';
import Navbar from '../components/Users/layouts/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate  } from 'react-router-dom';

function Product() {
  const [documents, setDocuments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filieres, setFilieres] = useState(["Science", "Technologie", "Lettres", "Économie", "Droit"]);
  const [niveaux, setNiveaux] = useState(["Licence 1", "Licence 2", "Licence 3", "Master 1", "Master 2", "Doctorat"]);
  const [selectedFilieres, setSelectedFilieres] = useState([]);
  const [selectedNiveaux, setSelectedNiveaux] = useState([]);
  const [bibliotheques, setBibliotheques] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedBibliotheques, setSelectedBibliotheques] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [documentsPerPage] = useState(9);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   fetchDocuments();
  // }, [searchTerm, selectedFilieres, selectedNiveaux]);

  const fetchDocuments = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/document/search`, {
        params: {
          titre: searchTerm,
          bibliotheques: selectedBibliotheques.join(','), // Filter by selected bibliothèques
          types: selectedTypes.join(','),
          filier: selectedFilieres.join(','),
          niveaux: selectedNiveaux.join(',')
        }
      });
      setDocuments(response.data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
  // Fetch bibliothèques
  const fetchBibliotheques = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/bibliotique/all`);
      setBibliotheques(response.data);
    } catch (error) {
      console.error('Error fetching bibliothèques:', error);
    }
  };

  // Fetch types
  const fetchTypes = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/type/all`);
      setTypes(response.data);
    } catch (error) {
      console.error('Error fetching types:', error);
    }
  };
  useEffect(() => {
    fetchBibliotheques();
    fetchTypes();
    fetchDocuments();
  }, [searchTerm, selectedBibliotheques, selectedTypes, selectedFilieres, selectedNiveaux]);

  const indexOfLastDocument = currentPage * documentsPerPage;
  const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;
  const currentDocuments = documents.slice(indexOfFirstDocument, indexOfLastDocument);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
            </div>
            <div className="mt-3">
              <h6>Niveaux</h6>
              {niveaux.map((niveau) => (
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
                        src={doc.utilisateur.imagePath ? `data:image/jpeg;base64,${user.imagePath}` : "images/book1.jpg"}                          alt={`${doc.utilisateur.nom}'s profile`}
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
                      {doc.description.length > 25 ? doc.description.slice(0, 25) + '...' : doc.description}
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
  );
}

export default Product;
