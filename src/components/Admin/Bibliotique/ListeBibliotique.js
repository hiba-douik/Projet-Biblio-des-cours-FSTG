import React, { useEffect, useState } from 'react';
import { Pencil, Trash2, Library, MapPin, Plus, BookOpen } from "lucide-react";
import SidebarAdmin from '../layouts/SidebarAdmin';
import Navbar from '../layouts/NavbarAdmin';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
                                        onClick={() => onUpdate(library.id)}
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

    useEffect(() => {
        fetchLibraries();
    }, []);

    const fetchLibraries = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://127.0.0.1:9000/api/admin/bibliotique/all', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log('Raw API Response:', response);
            console.log('Response data type:', typeof response.data);
            console.log('Is array:', Array.isArray(response.data));

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

    const handleUpdate = (id) => {
        console.log(`Update library with id: ${id}`);
        // Add your update logic here
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Authentication token not found. Please login again.');
            return;
        }
    
        try {
            const response = await axios.delete(`http://127.0.0.1:9000/api/admin/bibliotique/delete/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
    
            if (response.status === 204 || response.status === 200) {
                // Successfully deleted
                setLibraries(prevLibraries => prevLibraries.filter(lib => lib.id !== id));
                // Optional: Add success message
                alert('Bibliothèque supprimée avec succès');
            }
        } catch (error) {
            console.error('Error deleting library:', error);
            if (error.response) {
                switch (error.response.status) {
                    case 401:
                        setError('Session expirée. Veuillez vous reconnecter.');
                        // Optionally redirect to login
                        // window.location.href = '/login';
                        break;
                    case 403:
                        setError('Vous n\'avez pas les permissions nécessaires.');
                        break;
                    case 404:
                        setError('Bibliothèque non trouvée.');
                        break;
                    default:
                        setError('Une erreur est survenue lors de la suppression.');
                }
            } else {
                setError('Erreur de connexion au serveur.');
            }
        }
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
                                <div>
                                    <CardTitle>Liste des Bibliothèques</CardTitle>
                                    <CardDescription>Gérez vos bibliothèques et médiathèques</CardDescription>
                                </div>
                                <Link to="/createBib" className="text-decoration-none">
                                    <Button variant="success">
                                        <Plus size={18} />
                                        Ajouter une Bibliothèque
                                    </Button>
                                </Link>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <LibrariesTable 
                                libraries={libraries}
                                onUpdate={handleUpdate}
                                onDelete={handleDelete}
                            />
                        </CardContent>
                    </Card>
                </div>
            </main>
        </>
    );
}