import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateDoc = () => {
  const { documentId } = useParams();  // Récupérer le paramètre userId depuis l'URL

    const [titre, setTitre] = useState('');
    const [description, setDescription] = useState('');
    const [filier, setFilier] = useState('');
    const [niveaux, setNiveaux] = useState('');
    const [bibliothequeId, setBibliothequeId] = useState('');
    const [typeId, setTypeId] = useState('');
    const [file, setFile] = useState(null);
    const [userId, setUserId] = useState('');
    const [submitError, setSubmitError] = useState('');
    const [bibliotheques, setBibliotheques] = useState([]);
    const [types, setTypes] = useState([]);
    const token = localStorage.getItem('token'); // Retrieve token from local storage
   

    useEffect(() => {
        // Charger les informations du document existant
        axios.get(`${process.env.REACT_APP_API_URL}/api/document/${documentId}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            const data = response.data;
            setTitre(data.titre);
            setDescription(data.description);
            setFilier(data.filier);
            setNiveaux(data.niveaux);
            setBibliothequeId(data.bibliothequeId);
            setTypeId(data.typeId);
            setUserId(data.userId);
        })
        .catch(error => {
            console.error("Erreur lors du chargement du document :", error);
        });

        // Charger les listes de bibliothèques et types pour les options de sélection
        axios.get(`${process.env.REACT_APP_API_URL}`+'/api/admin/bibliotique/all', { headers: { Authorization: `Bearer ${token}` } })
            .then(response => setBibliotheques(response.data))
            .catch(error => console.error("Erreur lors du chargement des bibliothèques :", error));

        axios.get(`${process.env.REACT_APP_API_URL}`+'/api/type/all', { headers: { Authorization: `Bearer ${token}` } })
            .then(response => setTypes(response.data))
            .catch(error => console.error("Erreur lors du chargement des types :", error));
    }, [documentId, token]);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
 const clientLogin = localStorage.getItem('clientLogin');
        const formData = new FormData();
        formData.append('titre', titre);
        formData.append('description', description);
        formData.append('filier', filier);
        formData.append('niveaux', niveaux);
        formData.append('bibliothequeId', bibliothequeId);
        formData.append('typeId', typeId);
        formData.append('userid', 1);
        if (file) formData.append('file', file);

        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/api/document/${documentId}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert("Document mis à jour avec succès !");
        } catch (error) {
            console.error("Erreur lors de la mise à jour du document :", error);
            setSubmitError("Erreur lors de la mise à jour du document. Veuillez réessayer.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Modifier Document</h3>
            <div>
                <label>Titre :</label>
                <input type="text" value={titre} onChange={(e) => setTitre(e.target.value)}  />
            </div>
            <div>
                <label>Description :</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)}  />
            </div>
            <div>
                <label>Filière :</label>
                <input type="text" value={filier} onChange={(e) => setFilier(e.target.value)}  />
            </div>
            <div>
                <label>Niveaux :</label>
                <input type="text" value={niveaux} onChange={(e) => setNiveaux(e.target.value)}  />
            </div>
            <div>
                <label>Bibliothèque :</label>
                <select value={bibliothequeId} onChange={(e) => setBibliothequeId(e.target.value)} >
                    <option value="">Sélectionner une bibliothèque</option>
                    {bibliotheques.map(bib => (
                        <option key={bib.id} value={bib.id}>{bib.nom}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Type :</label>
                <select value={typeId} onChange={(e) => setTypeId(e.target.value)} required>
                    <option value="">Sélectionner un type</option>
                    {types.map(type => (
                        <option key={type.id} value={type.id}>{type.nom}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Fichier :</label>
                <input type="file" onChange={handleFileChange} />
            </div>
            <div >
                <label>ID Utilisateur :</label>
                <input type="number" value={userId} onChange={(e) => setUserId(e.target.value)}  />
            </div>
            <button type="submit">Mettre à jour</button>
            {submitError && <p className="error">{submitError}</p>}
        </form>
    );
};

export default UpdateDoc;
