import React from 'react';
import { Pencil, Trash2, Library, MapPin, Plus, BookOpen } from "lucide-react";

// Composants Bootstrap personnalisés
const Button = ({ children, className, variant = "primary", size = "", ...props }) => (
    <button 
        className={`btn ${size ? `btn-${size}` : ''} ${variant === "outline" ? 'btn-outline-secondary' : `btn-${variant}`} d-flex align-items-center gap-2 ${className}`} 
        {...props}
    >
        {children}
    </button>
);

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

const Badge = ({ children, className }) => (
    <span className={`badge bg-light text-dark d-inline-flex align-items-center gap-1 ${className}`}>
        {children}
    </span>
);

// Données d'exemple
const sampleLibraries = [
    { id: 1, name: "Bibliothèque Centrale", location: "Centre-ville", books: 50000 },
    { id: 2, name: "Bibliothèque Municipale", location: "Quartier Est", books: 30000 },
    { id: 3, name: "Médiathèque du Sud", location: "Quartier Sud", books: 40000 },
];

export default function ListeBibliotheque() {
    const handleUpdate = (id) => {
        console.log(`Update library with id: ${id}`);
    };

    const handleDelete = (id) => {
        console.log(`Delete library with id: ${id}`);
    };

    return (
        <div className="container py-5">
            <Card className="mx-auto">
                <CardHeader>
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <CardTitle>Liste des Bibliothèques</CardTitle>
                            <CardDescription>Gérez vos bibliothèques et médiathèques</CardDescription>
                        </div>
                        <Button variant="success">
                            <Plus size={18} />
                            Ajouter une Bibliothèque
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead>
                                <tr>
                                    <th scope="col">Nom</th>
                                    <th scope="col">Emplacement</th>
                                    <th scope="col">Livres</th>
                                    <th scope="col" className="text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sampleLibraries.map((library) => (
                                    <tr key={library.id}>
                                        <td>
                                            <div className="d-flex align-items-center gap-2">
                                                <Library 
                                                    size={18} 
                                                    className="text-primary" 
                                                />
                                                {library.name}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="d-flex align-items-center gap-2">
                                                <MapPin 
                                                    size={18} 
                                                    className="text-secondary" 
                                                />
                                                {library.location}
                                            </div>
                                        </td>
                                        <td>
                                            <Badge>
                                                <BookOpen size={14} />
                                                {library.books.toLocaleString()}
                                            </Badge>
                                        </td>
                                        <td>
                                            <div className="d-flex gap-2 justify-content-end">
                                                <Button 
                                                    variant="outline" 
                                                    size="sm"
                                                    onClick={() => handleUpdate(library.id)}
                                                >
                                                    <Pencil size={16} />
                                                    Modifier
                                                </Button>
                                                <Button 
                                                    variant="outline" 
                                                    size="sm"
                                                    className="text-danger"
                                                    onClick={() => handleDelete(library.id)}
                                                >
                                                    <Trash2 size={16} />
                                                    Supprimer
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            <style jsx>{`
                .btn-outline-secondary:hover .lucide-pencil {
                    color: #fff;
                }
                .text-danger:hover {
                    background-color: #dc3545 !important;
                    border-color: #dc3545 !important;
                    color: #fff !important;
                }
                .text-danger:hover .lucide-trash-2 {
                    color: #fff !important;
                }
            `}</style>
        </div>
    );
}