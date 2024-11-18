import React, { useEffect, useState } from 'react';
import { Pencil, Trash2, Library, MapPin, Plus, BookOpen } from "lucide-react";
import SidebarAdmin from '../layouts/SidebarAdmin';
import Navbar from '../layouts/NavbarAdmin';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

import Modal from 'react-modal';

// Base Button Component
const Button = ({ children, className, variant = "primary", size = "", ...props }) => (
    <button 
        className={`btn ${size ? `btn-${size}` : ''} ${variant === "outline" ? 'btn-outline-secondary' : `btn-${variant}`} d-flex align-items-center gap-2 ${className}`} 
        {...props}
    >
        {children}
    </button>
);

// Card Components
const Card = ({ children, className }) => (
    <div className={`card border-0 shadow-sm ${className}`}>
        {children}
    </div>
);

const CardHeader = ({ children }) => (
    <div className="card-header bg-white border-bottom py-4">
        {children}
    </div>
);

const CardTitle = ({ children, className }) => (
    <h2 className={`card-title h4 mb-0 ${className}`}>
        {children}
    </h2>
);

const CardDescription = ({ children }) => (
    <p className="text-muted mb-0 mt-1">
        {children}
    </p>
);

const CardContent = ({ children }) => (
    <div className="card-body">
        {children}
    </div>
);

// Badge Component
const Badge = ({ children, className }) => (
    <span className={`badge bg-light text-dark d-inline-flex align-items-center gap-1 ${className}`}>
        {children}
    </span>
);

// Loading Component
const LoadingSpinner = () => (
    <div className="text-center">
        <div className="spinner-border" role="status">
            <span className="visually-hidden">Chargement...</span>
        </div>
    </div>
);

// Main Table Component
const LibrariesTable = ({ libraries, onUpdate, onDelete }) => (
    <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
            <thead>
                <tr>
                    <th scope="col">Nom</th>
                    <th scope="col">Emplacement</th>
                    <th scope="col">Documents</th>
                    <th scope="col" className="text-end">Actions</th>
                </tr>
            </thead>
            <tbody>
                {libraries.length > 0 ? (
                    libraries.map((library) => (
                        <tr key={library.id}>
                            <td>
                                <div className="d-flex align-items-center gap-2">
                                    <Library size={18} className="text-primary" />
                                    {library.nom}
                                </div>
                            </td>
                            <td>
                                <div className="d-flex align-items-center gap-2">
                                    <MapPin size={18} className="text-secondary" />
                                    {library.location}
                                </div>
                            </td>
                            <td>
                                <Badge>
                                    <BookOpen size={14} />
                                    {library.documentsCount}
                                </Badge>
                            </td>
                            <td>
                                <div className="d-flex gap-2 justify-content-end">
                                    <Button 
                                        variant="outline" 
                                        size="sm" 
                                        onClick={() => onUpdate(library)}
                                    >
                                        <Pencil size={16} />
                                        Modifier
                                    </Button>
                                    <Button 
                                        variant="outline" 
                                        size="sm" 
                                        className="text-danger" 
                                        onClick={() => onDelete(library.id)}
                                    >
                                        <Trash2 size={16} />
                                        Supprimer
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4" className="text-center">Aucune bibliothèque trouvée.</td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
);

// Main Component
export default function ListeBibliotheque() {
    const [libraries, setLibraries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLibrary, setSelectedLibrary] = useState({ nom: '', location: '' });

    useEffect(() => {
        fetchLibraries();
    }, []);

    const fetchLibraries = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}`+'/api/admin/bibliotique/all', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data && Array.isArray(response.data)) {
                const processedLibraries = response.data.map(lib => ({
                    id: lib.id,
                    nom: lib.nom,
                    location: lib.location,
                    documentsCount: lib.documents ? lib.documents.length : 0
                }));
                setLibraries(processedLibraries);
            } else {
                throw new Error('Invalid data format received from server');
            }
        } catch (error) {
            console.error('Error fetching libraries:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Fonction pour ouvrir la modale avec les données de la bibliothèque sélectionnée
    const handleUpdate = (library) => {
        setSelectedLibrary(library);
        
        Swal.fire({
            title: 'Modifier Bibliothèque',
            html: `
                <input id="swal-input1" class="swal2-input" placeholder="Nom" value="${library.nom}">
                <input id="swal-input2" class="swal2-input" placeholder="Location" value="${library.location}">
            `,
            showCancelButton: true,
            confirmButtonText: 'Enregistrer',
            preConfirm: () => {
                const nom = document.getElementById('swal-input1').value;
                const location = document.getElementById('swal-input2').value;
                if (!nom || !location) {
                    Swal.showValidationMessage('Tous les champs sont obligatoires');
                    return false;
                }
                return { nom, location };
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { nom, location } = result.value;
                await updateBibliotheque(library.id, nom, location); // Appel à la fonction pour mettre à jour
            }
        });
    };
    
    // Fonction de mise à jour via API
    const updateBibliotheque = async (id, nom, location) => {
        const token = localStorage.getItem('token');
        
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/admin/bibliotique/update/${id}`, 
            null, {
                params: { nom, location },
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
    
            if (response.status === 200) {
                Swal.fire('Succès', 'La bibliothèque a été mise à jour avec succès.', 'success');
                fetchLibraries(); // Rafraîchir la liste des bibliothèques
            }
        } catch (error) {
            Swal.fire('Erreur', 'Une erreur est survenue lors de la mise à jour.', 'error');
            console.error('Erreur lors de la mise à jour de la bibliothèque:', error);
        }
    };
    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Êtes-vous sûr ?',
            text: 'Voulez-vous vraiment supprimer cette bibliothèque ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, supprimer !',
            cancelButtonText: 'Annuler'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('Authentication token not found. Please login again.');
                    return;
                }
            
                try {
                    const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/admin/bibliotique/delete/${id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });
            
                    if (response.status === 204 || response.status === 200) {
                        // Successfully deleted
                        setLibraries(prevLibraries => prevLibraries.filter(lib => lib.id !== id));
                        Swal.fire('Supprimée !', 'La bibliothèque a été supprimée avec succès.', 'success');
                    }
                } catch (error) {
                    console.error('Error deleting library:', error);
                    Swal.fire('Erreur', 'Une erreur est survenue lors de la suppression.', 'error');
                }
            }
        });
    };

    if (loading) {
        return (
            <>
                <SidebarAdmin />
                <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
                    <Navbar />
                    <div className="container py-5">
                        <LoadingSpinner />
                    </div>
                </main>
            </>
        );
    }

    if (error) {
        return (
            <>
                <SidebarAdmin />
                <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
                    <Navbar />
                    <div className="container py-5">
                        <div className="alert alert-danger" role="alert">
                            Error: {error}
                        </div>
                    </div>
                </main>
            </>
        );
    }

    return (
        <>     
            <SidebarAdmin />
            <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
                <Navbar />
                <div className="container py-5">
                    <Card className="mx-auto">
                        <CardHeader>
                            <div className="d-flex justify-content-between align-items-center">
                                <CardTitle className="text-primary">Bibliothèques</CardTitle>
                                <Button >
                                   <Link to="/createBib">
                                   Ajouter
                                   </Link> 
                                </Button>
                            </div>
                            <CardDescription>Liste des bibliothèques et leurs documents associés.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <LibrariesTable libraries={libraries} onUpdate={handleUpdate} onDelete={handleDelete} />
                        </CardContent>
                    </Card>
                    
                </div>

              
            </main>

            
        </>
    );
}
