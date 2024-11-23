import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DocumentDetail = () => {
  const { id } = useParams();
  const [document, setDocument] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingComment, setEditingComment] = useState(null);
  const token = localStorage.getItem('token');

  const fetchDocumentDetails = async () => {
    try {
      const docResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/document/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDocument(docResponse.data.document);

      const commentsResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/comentaire/document/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments(commentsResponse.data);
    } catch (error) {
      console.error('Error fetching document details:', error);
    }
  };

  useEffect(() => {
    fetchDocumentDetails();
  }, [id]);

  const handleAddComment = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/commentaire/create`,
        { message: newComment, documentId: id, userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments([...comments, response.data]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleEditComment = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/comentaire/update/${editingComment.id}`,
        { message: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments(
        comments.map((comment) =>
          comment.id === editingComment.id ? response.data : comment
        )
      );
      setEditingComment(null);
      setNewComment('');
    } catch (error) {
      console.error('Error editing comment:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/commentaire/delete/${commentId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments(comments.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const startEditing = (comment) => {
    setEditingComment(comment);
    setNewComment(comment.message);
  };

  if (!document) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      {/* Document Details */}
      <div className="card mb-4">
        <div className="card-body">
          <h3 className="card-title">{document.titre}</h3>
          <p className="card-text">{document.description}</p>
          <iframe
  src={document.filePath}
  style={{ width: "100%", height: "500px", border: "none" }}
  title="PDF Viewer"
/>
          <div className="mb-3">
            <span className="badge bg-primary me-2">{document.type?.name}</span>
            <span className="badge bg-success">{document.filier}</span>
          </div>
          <a
            href={`${process.env.REACT_APP_API_URL}/uploads/documents/${document.id}`}
            className="btn btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Télécharger le document
          </a>
        </div>
      </div>

      {/* Comments Section */}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Commentaires</h5>

          {/* Comment Input */}
          <div className="input-group mb-3">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="form-control"
              placeholder="Ajouter un commentaire..."
            />
            <button
              className="btn btn-primary"
              onClick={editingComment ? handleEditComment : handleAddComment}
            >
              {editingComment ? 'Modifier' : 'Envoyer'}
            </button>
          </div>

          {/* Comments List */}
          {comments.length > 0 ? (
            <ul className="list-group">
              {comments.map((comment) => (
                <li
                  key={comment.id}
                  className="list-group-item d-flex justify-content-between align-items-start"
                >
                  <div>
                    <p className="mb-1">{comment.message}</p>
                    <small className="text-muted">
                      Par {comment.utilisateur?.nom} {comment.utilisateur?.prenom}
                    </small>
                  </div>
                  <div className="btn-group">
                    <button
                      className="btn btn-link text-primary"
                      onClick={() => startEditing(comment)}
                    >
                      Modifier
                    </button>
                    <button
                      className="btn btn-link text-danger"
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      Supprimer
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted text-center mt-3">Aucun commentaire</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentDetail;
