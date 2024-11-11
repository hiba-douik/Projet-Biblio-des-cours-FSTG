import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../components/Users/layouts/Footer';
import Navbar from '../components/Users/layouts/Navbar';
import './Style.css';

function Product() {
  const [documents, setDocuments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [documentsPerPage, setDocumentsPerPage] = useState(9);

  // Function to fetch documents from the API
  const fetchDocuments = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from local storage
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/document/all`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to request headers
        },
      });
      console.log(response.data); // Log the response to check the data
      setDocuments(response.data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  useEffect(() => {
    fetchDocuments(); // Fetch documents on component mount
  }, []);

  const filteredDocuments = documents.filter(doc =>
    doc.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastDocument = currentPage * documentsPerPage;
  const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;
  const currentDocuments = filteredDocuments.slice(indexOfFirstDocument, indexOfLastDocument);

  // Change page handler
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Navbar />
      <section className="site-header section-padding">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="mb-5">
                See our <span>docs </span>
              </h2>
              <div className="search-container">
                <input 
                  type="text" 
                  className="search-input"
                  placeholder="Search documents..." 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)} 
                />
              </div>
              
            </div>
          </div>

          <div className="row">
            {currentDocuments.length === 0 ? (
              <div className="col-12">
                <p>No documents found.</p>
              </div>
            ) : (
              currentDocuments.map((document) => (
                <div className="col-lg-4 mb-4 col-12" key={document.id}>
                  <div className="team-thumb d-flex align-items-center">
                    <img
                      src="template_user/images/people/senior-man-wearing-white-face-mask-covid-19-campaign-with-design-space.jpeg"
                      className="img-fluid custom-circle-image team-image me-4"
                      alt=""
                    />
                    <div className="team-info">
                      <h5 className="mb-0">{document.titre}</h5>
                      <strong className="text-muted">
                        {document.description} - {document.type.name}
                      </strong>
                      {/* Button trigger modal */}
                      <button
                        type="button"
                        className="btn custom-modal-btn"
                        data-bs-toggle="modal"
                        data-bs-target="#don"
                      >
                        <i className="bi-plus-circle-fill" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          <div className="pagination-container">
            <ul className="pagination">
              {Array.from({ length: Math.ceil(filteredDocuments.length / documentsPerPage) }, (_, index) => (
                <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Product;
