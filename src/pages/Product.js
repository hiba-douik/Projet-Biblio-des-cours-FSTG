import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../components/Users/layouts/Footer';
import Navbar from '../components/Users/layouts/Navbar';
import { Search } from 'lucide-react';

const styles = {
  searchContainer: `
    max-w-2xl mx-auto mb-8
  `,
  searchInput: `
    w-full px-4 py-3 pl-10 
    bg-white border border-gray-300 rounded-lg 
    focus:outline-none focus:ring-2 focus:ring-blue-500
    transition-all duration-300
  `,
  documentCard: `
    bg-white rounded-lg shadow-sm hover:shadow-md 
    transition-all duration-200 p-4 h-full
    transform hover:-translate-y-1
  `,
  documentImage: `
    w-20 h-20 object-cover rounded-full mr-4
  `,
  documentInfo: `
    flex-grow-1
  `,
  documentTitle: `
    text-xl font-semibold mb-2 text-gray-900
  `,
  documentDescription: `
    text-gray-600 text-sm mb-2
  `,
  tagContainer: `
    flex flex-wrap gap-2 mb-3
  `,
  tag: `
    px-3 py-1 text-sm rounded-full
  `,
  typeTag: `
    bg-blue-100 text-blue-800
  `,
  filierTag: `
    bg-green-100 text-green-800
  `,
  viewMoreButton: `
    px-4 py-2 rounded-full bg-blue-600 text-white
    hover:bg-blue-700 transition-colors duration-200
    flex items-center gap-2
  `,
  paginationContainer: `
    flex justify-center mt-8
  `,
  paginationButton: `
    px-3 py-1 mx-1 rounded-md 
    border border-gray-300
    hover:bg-gray-50
    focus:outline-none focus:ring-2 focus:ring-blue-500
  `,
  activePaginationButton: `
    bg-blue-600 text-white
    border-blue-600
    hover:bg-blue-700
  `,
  emptyState: `
    text-center py-12
  `,
  emptyStateTitle: `
    text-xl font-medium text-gray-900 mb-2
  `,
  emptyStateText: `
    text-gray-500
  `
};

function Product() {
  const [documents, setDocuments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [documentsPerPage] = useState(9);

  const fetchDocuments = async () => {
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
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [searchTerm]);

  const indexOfLastDocument = currentPage * documentsPerPage;
  const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;
  const currentDocuments = documents.slice(indexOfFirstDocument, indexOfLastDocument);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Navbar />
      
      <section className="site-header section-padding">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="mb-5">
                See our <span>docs</span>
              </h2>
              
              {/* Search Container */}
              <div className={styles.searchContainer}>
                <div className="relative">
                  <input
                    type="text"
                    className={styles.searchInput}
                    placeholder="Rechercher des documents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>
              </div>

              {/* Documents Grid */}
              <div className="row">
                {currentDocuments.length === 0 ? (
                  <div className={styles.emptyState}>
                    <h3 className={styles.emptyStateTitle}>
                      Aucun document trouvé
                    </h3>
                    <p className={styles.emptyStateText}>
                      Essayez de modifier vos critères de recherche
                    </p>
                  </div>
                ) : (
                  currentDocuments.map((document) => (
                    <div className="col-lg-4 col-md-6 mb-4" key={document.id}>
                      <div className={styles.documentCard}>
                        <div className="team-thumb d-flex align-items-center">
                          <img
                            src="template_user/images/people/senior-man-wearing-white-face-mask-covid-19-campaign-with-design-space.jpeg"
                            className={styles.documentImage}
                            alt=""
                          />
                          <div className={styles.documentInfo}>
                            <h5 className={styles.documentTitle}>{document.titre}</h5>
                            <p className={styles.documentDescription}>{document.description}</p>
                            
                            <div className={styles.tagContainer}>
                              {document.type?.name && (
                                <span className={`${styles.tag} ${styles.typeTag}`}>
                                  {document.type.name}
                                </span>
                              )}
                              {document.filier && (
                                <span className={`${styles.tag} ${styles.filierTag}`}>
                                  {document.filier}
                                </span>
                              )}
                            </div>

                            <button
                              type="button"
                              className={styles.viewMoreButton}
                              data-bs-toggle="modal"
                              data-bs-target="#don"
                            >
                              <i className="bi-plus-circle-fill" />
                              Voir plus
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Pagination */}
              {documents.length > documentsPerPage && (
                <div className={styles.paginationContainer}>
                  {Array.from({ length: Math.ceil(documents.length / documentsPerPage) }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => paginate(index + 1)}
                      className={`
                        ${styles.paginationButton}
                        ${currentPage === index + 1 ? styles.activePaginationButton : ''}
                      `}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Product;