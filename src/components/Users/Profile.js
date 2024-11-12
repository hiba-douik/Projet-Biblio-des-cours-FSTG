import React from 'react';

const Profile = () => {
  // Données exemple pour l'utilisateur
  const user = {
    id: "USR-001",
    nom: "Jean Dupont",
    email: "jean.dupont@example.com",
    type: "client",
    dateInscription: "2024-01-15"
  };

  // Données exemple pour les documents
  const documents = [
    {
      id: 1,
      titre: "Rapport Annuel 2024",
      dateCreation: "2024-03-15",
      type: "PDF",
      taille: "2.5 MB",
      statut: "actif"
    },
    {
      id: 2,
      titre: "Présentation Projet Q1",
      dateCreation: "2024-02-28",
      type: "PPTX",
      taille: "5.1 MB",
      statut: "actif"
    },
    {
      id: 3,
      titre: "Budget 2024",
      dateCreation: "2024-01-10",
      type: "XLSX",
      taille: "1.8 MB",
      statut: "archivé"
    },
    {
      id: 4,
      titre: "Manuel Utilisateur",
      dateCreation: "2024-03-01",
      type: "PDF",
      taille: "3.2 MB",
      statut: "actif"
    }
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  return (
    <div className="container mt-4">
      {/* Profile Card */}
      <div className="card mb-4 shadow">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-md-2 text-center">
              <div 
                className="rounded-circle d-flex align-items-center justify-content-center mx-auto bg-primary text-white"
                style={{ width: '80px', height: '80px', fontSize: '2rem' }}
              >
                {user.nom.charAt(0)}
              </div>
            </div>
            <div className="col-md-10">
              <h2>{user.nom}</h2>
              <div className="badge bg-success me-2">{user.type}</div>
              <p className="text-muted mb-1">{user.email}</p>
              <small className="text-muted">
                ID: {user.id} | Membre depuis: {formatDate(user.dateInscription)}
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* Documents Table */}
      <div className="card shadow">
        <div className="card-header">
          <h3 className="mb-0">Mes Documents</h3>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Titre</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Taille</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc) => (
                  <tr key={doc.id}>
                    <td>{doc.titre}</td>
                    <td>
                      <span className="badge bg-info">{doc.type}</span>
                    </td>
                    <td>{formatDate(doc.dateCreation)}</td>
                    <td>{doc.taille}</td>
                    <td>
                      <span 
                        className={`badge ${
                          doc.statut === 'actif' ? 'bg-success' : 'bg-secondary'
                        }`}
                      >
                        {doc.statut}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary">
                        Télécharger
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;