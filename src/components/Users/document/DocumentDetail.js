import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ThumbsUp, ThumbsDown, Send  } from "lucide-react";
import Navbar from '../layouts/Navbar';
import { GoogleGenerativeAI } from "@google/generative-ai";

const DocumentDetail = () => {
  const { id } = useParams();
  const [document, setDocument] = useState(null);
  const [documentFileURL, setDocumentFileURL] = useState('');
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingComment, setEditingComment] = useState(null);
  const [likes, setLikes] = useState();
  const [dislikes, setDislikes] = useState();
  const token = localStorage.getItem('token');
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [tokenCount, setTokenCount] = useState(100); // Token limit
  const apiKey = `${process.env.gemini}` // Replace with your Google Generative AI key
  const model = "models/text-bison-001"; // Replace with the correct model ID



  // Fetch document metadata
  const fetchDocumentMetadata = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/auth/document/${id}/metadata`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDocument(response.data);
      const commentsResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/auth/commentaire/document/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments(commentsResponse.data);
    } catch (error) {
      console.error('Error fetching document metadata:', error);
    }
  };

  // Fetch document file and create a URL for viewing in the frame
  const fetchDocumentFile = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/auth/document/${id}/file`,
        { headers: { Authorization: `Bearer ${token}` }, responseType: 'blob' }
      );

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      setDocumentFileURL(url);
    } catch (error) {
      console.error('Error fetching document file:', error);
    }
  };

  const handleLike = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/document/like/${document.document.id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLikes(response.data.likes);
    } catch (error) {
      console.error("Error liking the document:", error);
    }
  };

  const handleDislike = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/document/dislike/${document.document.id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDislikes(response.data.dislikes);
    } catch (error) {
      console.error("Error disliking the document:", error);
    }
  };

  const handleAddComment = async () => {
    try {
      const userInfo = localStorage.getItem('clientLogin');
      const userId = JSON.parse(userInfo).id;

      const formData = new FormData();
      formData.append('message', newComment);
      formData.append('documentId', id);
      formData.append('userId', userId);

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/commentaire/create`,
        formData,
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
        `${process.env.REACT_APP_API_URL}/api/auth/commentaire/update/${editingComment.id}`,
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

  const handleChatSubmit = async () => {
    if (!userMessage.trim() || tokenCount <= 0) return;
  
    const newMessage = { sender: "user", text: userMessage };
    setChatMessages((prev) => [...prev, newMessage]);
  
    const context = {
      title: document?.document?.titre || "Unknown Title",
      description: document.description || "",
    };
  
    try {
      // Example of direct API call using Axios
      const response = await axios.post('YOUR_GOOGLE_GENERATIVE_AI_API_ENDPOINT', {
        model,
        input: {
          text: `Title: ${context.title}\nDescription: ${context.description}\nQuestion: ${userMessage}`,
        },
        // Include any additional parameters needed for the request
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      });
  
      const aiResponse = response.data?.results?.[0]?.output || "Je ne peux pas répondre pour le moment.";
      const aiMessage = { sender: "ai", text: aiResponse };
  
      setChatMessages((prev) => [...prev, aiMessage]);
  
      // Calculate used tokens if applicable, adjust as needed based on API response
      const usedTokens = response.data?.usage?.totalTokens || 0;
      setTokenCount((prev) => Math.max(0, prev - usedTokens));
    } catch (error) {
      console.error("Error communicating with Google Generative AI:", error);
      const errorMessage = {
        sender: "ai",
        text: "Une erreur s'est produite. Veuillez réessayer plus tard.",
      };
      setChatMessages((prev) => [...prev, errorMessage]);
    }
  
    setUserMessage("");
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

  useEffect(() => {
    fetchDocumentMetadata();
    fetchDocumentFile();
  }, [id]);

  if (!document) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="card mb-4">
          <div className="card-body">
            <h3 className="card-title">{document.document.titre}</h3>
            <p className="card-text">{document.documentdescription}</p>

            <div className="mb-3">
              <span className="badge bg-primary me-2">{document.document.type?.name}</span>
              <span className="badge bg-success">{document.document.titre}</span>
            </div>

            {documentFileURL && (
              <div className="mb-4">
                <iframe
                  src={documentFileURL}
                  title="Document Viewer"
                  style={{ width: '100%', height: '500px', border: '1px solid #ccc' }}
                ></iframe>
              </div>
            )}

            <a
              href={documentFileURL}
              download={`${document.titre}.pdf`}
              className="btn btn-primary"
            >
              Download PDF
            </a>

            <div className="d-flex align-items-center mt-3">
              <button onClick={handleLike} className="btn btn-outline-success d-flex align-items-center">
                <ThumbsUp className="me-2" size={20} /> {likes || document.document.likes || 0}
              </button>
              <button onClick={handleDislike} className="btn btn-outline-danger d-flex align-items-center ms-3">
                <ThumbsDown className="me-2" size={20} /> {dislikes || document.document.dislike || 0}
              </button>
            </div>
          </div>
        </div>

       {/* Comments Section */}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Commentaires</h5>

          {/* Comment Input */}
          {token ? (
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
          ) : (
            <p>Connectez-vous pour ajouter un commentaire.</p>
          )}
        

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
                  {/* <div className="btn-group">
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
                  </div> */}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted text-center mt-3">Aucun commentaire</p>
          )}
        </div>
      </div>
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
        }}
      >
        <button
          className="btn btn-primary rounded-circle"
          style={{ width: "60px", height: "60px" }}
          onClick={() => setChatOpen(!chatOpen)}
        >
          💬
        </button>
      </div>
      {chatOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "80px",
            right: "20px",
            width: "300px",
            height: "400px",
            backgroundColor: "white",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            borderRadius: "8px",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              padding: "10px",
              backgroundColor: "#007bff",
              color: "white",
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
              textAlign: "center",
            }}
          >
            Chat avec Gemini
          </div>
          <div
            style={{
              flex: 1,
              padding: "10px",
              overflowY: "auto",
            }}
          >
            {chatMessages.map((message, index) => (
              <div
                key={index}
                style={{
                  marginBottom: "10px",
                  textAlign: message.sender === "user" ? "right" : "left",
                }}
              >
                <div
                  style={{
                    display: "inline-block",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    backgroundColor: message.sender === "user" ? "#007bff" : "#f1f1f1",
                    color: message.sender === "user" ? "white" : "black",
                  }}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              padding: "10px",
              borderTop: "1px solid #ccc",
            }}
          >
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Posez votre question..."
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
              />
              <button className="btn btn-primary" onClick={handleChatSubmit}>
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default DocumentDetail;
