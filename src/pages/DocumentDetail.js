import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {Trash2, Edit } from 'lucide-react';

const DocumentDetail = () => {
  const { id } = useParams();
  const [document, setDocument] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingComment, setEditingComment] = useState(null);

  // Fetch document details
  const fetchDocumentDetails = async () => {
    try {
      const docResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/document/${id}`);
      setDocument(docResponse.data);

      // Fetch comments for this document
      const commentsResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/comentaire/document/${id}`);
      setComments(commentsResponse.data);
    } catch (error) {
      console.error('Error fetching document details:', error);
    }
  };

  useEffect(() => {
    fetchDocumentDetails();
  }, [id]);

  // Add comment
  async function handleAddComment() {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/commentaire/create`,
        null,
        {
          params: {
            message: newComment,
            documentId: id,
            userId: userId
          }
        }
      );
      setComments([...comments, response.data]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  }

  // Edit comment
  const handleEditComment = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/commentaire/update/${editingComment.id}`, 
        null,
        {
          params: {
            message: newComment,
            documentId: id,
            userId: userId
          }
        }
      );
      
      // Update comments list
      setComments(comments.map(comment => 
        comment.id === editingComment.id ? response.data : comment
      ));
      
      // Reset editing state
      setEditingComment(null);
      setNewComment('');
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  // Delete comment
  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/commentaire/delete/${commentId}`);
      setComments(comments.filter(comment => comment.id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  // Prepare for editing
  const startEditing = (comment) => {
    setEditingComment(comment);
    setNewComment(comment.message);
  };

  if (!document) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      {/* Document Details */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold mb-4">{document.titre}</h1>
        <p className="text-gray-600 mb-4">{document.description}</p>
        
        <div className="flex space-x-2 mb-4">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
            {document.type?.name}
          </span>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
            {document.filier}
          </span>
        </div>

        {/* Download Button */}
        <a 
          href={`${process.env.REACT_APP_API_URL}/uploads/documents/${document.id}`} 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Télécharger le document
        </a>
      </div>

      {/* Comments Section */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Commentaires</h2>
        
        {/* Comment Input */}
        <div className="flex mb-6">
          <input 
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Ajouter un commentaire..."
            className="flex-grow p-2 border rounded-l-lg"
          />
          <button 
            onClick={editingComment ? handleEditComment : handleAddComment}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
          >
            {editingComment ? 'Modifier' : 'Envoyer'}
          </button>
        </div>

        {/* Comments List */}
        {comments.map(comment => (
          <div 
            key={comment.id} 
            className="border-b py-4 flex justify-between items-center"
          >
            <div>
              <p className="text-gray-800">{comment.message}</p>
              <p className="text-gray-500 text-sm">
                Par {comment.utilisateur?.nom} {comment.utilisateur?.prenom}
              </p>
            </div>
            
            <div className="flex space-x-2">
              <button 
                onClick={() => startEditing(comment)}
                className="text-blue-500 hover:text-blue-700"
              >
                <Edit size={20} />
              </button>
              <button 
                onClick={() => handleDeleteComment(comment.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}

        {comments.length === 0 && (
          <p className="text-gray-500 text-center">Aucun commentaire</p>
        )}
      </div>
    </div>
  );
};

export default DocumentDetail;