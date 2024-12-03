import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import { Library, MapPin, Save, X } from "lucide-react";
import SidebarAdmin from '../layouts/SidebarAdmin';
import Navbar from '../layouts/NavbarAdmin';

// Custom Bootstrap components
const Card = ({ children, className = '' }) => (
  <div className={`card border-0 shadow-sm ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="card-header bg-white border-bottom py-4">
    {children}
  </div>
);

const CardContent = ({ children }) => (
  <div className="card-body">
    {children}
  </div>
);

const CardFooter = ({ children }) => (
  <div className="card-footer bg-white py-4">
    {children}
  </div>
);

const Button = ({ children, variant = "primary", className = "", ...props }) => (
  <button 
    className={`btn ${variant === "outline" ? 'btn-outline-secondary' : `btn-${variant}`} d-flex align-items-center gap-2 ${className}`}
    {...props}
  >
    {children}
  </button>
);

// Custom confirmation dialog modal
const ConfirmDialog = ({ isOpen, onClose, onConfirm }) => (
  <>
    {isOpen && (
      <>
        <div 
          className="modal fade show d-block" 
          tabIndex="-1"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmer la mise à jour</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={onClose}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>Êtes-vous sûr de vouloir mettre à jour les informations de cette bibliothèque ?</p>
              </div>
              <div className="modal-footer">
                <Button variant="outline" onClick={onClose}>
                  Annuler
                </Button>
                <Button variant="success" onClick={onConfirm}>
                  Confirmer
                </Button>
              </div>
            </div>
          </div>
        </div>
      </>
    )}
  </>
);

// Sample data
const sampleLibrary = {
  id: 1,
  name: "Bibliothèque Centrale",
  location: "Centre-ville",
  books: 50000
};

export default function UpdateLibrary({ libraryId, onUpdate, onCancel }) {
  const [library, setLibrary] = useState(sampleLibrary);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  useEffect(() => {
    // Fetch the library details from the server if needed
    setLibrary(sampleLibrary); // Use sample data for illustration
  }, [libraryId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLibrary(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    // Send the updated library object to the server
    const token = localStorage.getItem('token'); // Get token from local storage

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}`+'/api/admin/bibliotique/save', library, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Include token in the headers
        }
      });

      const updatedLibrary = response.data;
      console.log('Updated library:', updatedLibrary);
      onUpdate(updatedLibrary); // Notify parent component of the update
    } catch (error) {
      console.error('Error updating library:', error);
    } finally {
      setShowConfirmDialog(false); // Close the confirmation dialog
    }
  };

  return (
    <>     
      <SidebarAdmin />
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        <Navbar />
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
              <Card>
                <CardHeader>
                  <div className="d-flex align-items-center gap-2">
                    <Library size={24} className="text-primary" />
                    <h4 className="mb-0">Modifier la Bibliothèque</h4>
                  </div>
                </CardHeader>

                <CardContent>
                  <form onSubmit={(e) => e.preventDefault()} className="row g-3">
                    <div className="col-12">
                      <label htmlFor="name" className="form-label d-flex align-items-center gap-2">
                        <Library size={18} className="text-primary" />
                        Nom de la bibliothèque
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={library.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="col-12">
                      <label htmlFor="location" className="form-label d-flex align-items-center gap-2">
                        <MapPin size={18} className="text-primary" />
                        Emplacement
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="location"
                        name="location"
                        value={library.location}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </form>
                </CardContent>

                <CardFooter>
                  <div className="d-flex justify-content-between gap-3">
                    <Button variant="outline" onClick={onCancel}>
                      <X size={18} />
                      Annuler
                    </Button>
                    <Button 
                      variant="success" 
                      onClick={() => setShowConfirmDialog(true)}
                    >
                      <Save size={18} />
                      Enregistrer
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>

          <ConfirmDialog
            isOpen={showConfirmDialog}
            onClose={() => setShowConfirmDialog(false)}
            onConfirm={handleSubmit}
          />

          <style jsx global>{`
            .modal {
              background-color: rgba(0, 0, 0, 0.5);
            }
            .form-control:focus {
              border-color: #0d6efd;
              box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
            }
          `}</style>
        </div>
      </main>
    </> 
  );
}
