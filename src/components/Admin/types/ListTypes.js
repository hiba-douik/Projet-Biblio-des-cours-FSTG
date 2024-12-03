import React, { useState, useEffect } from 'react';
import SidebarAdmin from '../layouts/SidebarAdmin';
import Navbar from '../layouts/NavbarAdmin';
import axios from 'axios';
import Swal from 'sweetalert2';

const TypeManagement = () => {
    const [types, setTypes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTypes();
    }, []);

    // Récupération des types depuis l'API
    const fetchTypes = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/type`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTypes(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des types:', error);
        } finally {
            setLoading(false);
        }
    };

    // Création d'un nouveau type
    const handleCreate = () => {
        Swal.fire({
            title: 'Créer un Type',
            html: `
                <input id="name" class="swal2-input" placeholder="Nom">
                <input id="subtitle" class="swal2-input" placeholder="Sous-titre">
                <textarea id="description" class="swal2-textarea" placeholder="Description"></textarea>
            `,
            showCancelButton: true,
            confirmButtonText: 'Créer',
            preConfirm: () => {
                const name = document.getElementById('name').value;
                const subtitle = document.getElementById('subtitle').value;
                const description = document.getElementById('description').value;

                if (!name || !subtitle || !description) {
                    Swal.showValidationMessage('Tous les champs sont obligatoires');
                }
                return { name, subtitle, description };
            },
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { name, subtitle, description } = result.value;
                try {
                    const token = localStorage.getItem('token');
                    const response = await axios.post(
                        `${process.env.REACT_APP_API_URL}/api/admin/type`,
                        { name, subtitle, description },
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
                    Swal.fire('Succès', 'Type créé avec succès', 'success');
                    setTypes([...types, response.data]);
                } catch (error) {
                    Swal.fire('Erreur', 'Une erreur est survenue lors de la création.', 'error');
                }
            }
        });
    };

    // Modification d'un type
    const handleUpdate = (type) => {
        Swal.fire({
            title: 'Modifier le Type',
            html: `
                <input id="name" class="swal2-input" placeholder="Nom" value="${type.name}">
                <input id="subtitle" class="swal2-input" placeholder="Sous-titre" value="${type.subtitle}">
                <textarea id="description" class="swal2-textarea" placeholder="Description">${type.description}</textarea>
            `,
            showCancelButton: true,
            confirmButtonText: 'Mettre à jour',
            preConfirm: () => {
                const name = document.getElementById('name').value;
                const subtitle = document.getElementById('subtitle').value;
                const description = document.getElementById('description').value;

                if (!name || !subtitle || !description) {
                    Swal.showValidationMessage('Tous les champs sont obligatoires');
                }
                return { name, subtitle, description };
            },
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { name, subtitle, description } = result.value;
                try {
                    const token = localStorage.getItem('token');
                    await axios.put(
                        `${process.env.REACT_APP_API_URL}/api/admin/type/${type.id}`,
                        { name, subtitle, description },
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
                    Swal.fire('Succès', 'Type mis à jour avec succès', 'success');
                    fetchTypes(); // Rafraîchir la liste
                } catch (error) {
                    Swal.fire('Erreur', 'Une erreur est survenue lors de la mise à jour.', 'error');
                }
            }
        });
    };

    // Suppression d'un type
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Êtes-vous sûr ?',
            text: 'Cette action est irréversible.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Oui, supprimer',
            cancelButtonText: 'Annuler',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const token = localStorage.getItem('token');
                    await axios.delete(`${process.env.REACT_APP_API_URL}/api/admin/type/${id}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    Swal.fire('Supprimé!', 'Le type a été supprimé.', 'success');
                    setTypes(types.filter((type) => type.id !== id));
                } catch (error) {
                    Swal.fire('Erreur', 'Une erreur est survenue lors de la suppression.', 'error');
                }
            }
        });
    };

    if (loading) {
        return <div>Chargement...</div>;
    }

    return (
        <>     
        <SidebarAdmin />
        <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
            <Navbar />
        <div className="container">
            <h1 className="mb-4">Gestion des Types</h1>
            <button className="btn btn-primary mb-3" onClick={handleCreate}>
                Ajouter un Type
            </button>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Sous-titre</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {types.map((type) => (
                        <tr key={type.id}>
                            <td>{type.name}</td>
                            <td>{type.subtitle}</td>
                            <td>{type.description}</td>
                            <td>
                                <button className="btn btn-warning me-2" onClick={() => handleUpdate(type)}>
                                    Modifier
                                </button>
                                <button className="btn btn-danger" onClick={() => handleDelete(type.id)}>
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </main>

            
</>
    );
};

export default TypeManagement;
