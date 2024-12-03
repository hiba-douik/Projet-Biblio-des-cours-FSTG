import React from "react";

const DownloadButton = ({ documentId, documentName }) => {
  const downloadFile = async (e) => {
    e.preventDefault(); // Empêche le comportement par défaut de l'ancre
    try {
      const token = localStorage.getItem("token"); // Récupérer le token
      if (!token) {
        alert("Token manquant. Veuillez vous connecter.");
        return;
      }

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/document/${documentId}/download`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors du téléchargement du fichier.");
      }

      const blob = await response.blob(); // Convertir la réponse en blob
      const url = window.URL.createObjectURL(blob); // Créer une URL Blob

      // Créer un élément <a> temporaire pour déclencher le téléchargement
      const link = document.createElement("a");
      link.href = url;
      link.download = `${documentName || "document"}`; // Définir le nom de fichier
      document.body.appendChild(link);
      link.click(); // Déclencher le téléchargement
      link.remove(); // Nettoyage du DOM
      window.URL.revokeObjectURL(url); // Libérer l'URL Blob
    } catch (error) {
      console.error("Erreur :", error);
      alert("Erreur lors du téléchargement du fichier.");
    }
  };

  return (
    <a href="#" className="btn btn-primary" onClick={downloadFile}>
      Télécharger le document
    </a>
  );
};

export default DownloadButton;
