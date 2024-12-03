// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Table, Button } from 'react-bootstrap';
// import SidebarAdmin from '../layouts/SidebarAdmin';
// import Navbar from '../layouts/NavbarAdmin';

// function ContactList() {
//   const [contacts, setContacts] = useState([]);

//   useEffect(() => {
//     loadContacts();
//   }, []);

//   const loadContacts = async () => {
//     try {
//       const response = await axios.get('http://localhost:9000/api/contacts');
//       setContacts(response.data);
//     } catch (error) {
//       console.error('Error loading contacts:', error);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) {
//       try {
//         await axios.delete(`http://localhost:9000/api/contacts/${id}`); // Mise à jour du port à 9000
//         loadContacts();
//       } catch (error) {
//         console.error('Error deleting contact:', error);
//       }
//     }
//   };

//   return (
//     <div className="admin-layout">
//       {/* Barre latérale */}
//       <div className="sidebar">
//         <SidebarAdmin />
//       </div>

//       {/* Contenu principal */}
//       <div className="main-content">
//         <Navbar />
//         <div className="content-container">
//           <h2>Liste des messages de contact</h2>
//           <Table striped bordered hover>
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Nom</th>
//                 <th>Email</th>
//                 <th>Sujet</th>
//                 <th>Message</th>
//                 <th>Date</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {contacts.map((contact) => (
//                 <tr key={contact.id}>
//                   <td>{contact.id}</td>
//                   <td>{contact.name}</td>
//                   <td>{contact.email}</td>
//                   <td>{contact.subject}</td>
//                   <td>{contact.message}</td>
//                   <td>{new Date(contact.dateCreated).toLocaleString()}</td>
//                   <td>
//                     <Button
//                       variant="danger"
//                       onClick={() => handleDelete(contact.id)}
//                     >
//                       Supprimer
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </div>
//       </div>

//       <style jsx>{`
//         .admin-layout {
//           display: flex;
//           min-height: 100vh;
//         }

//         .sidebar {
//           flex: 0 0 250px; /* Taille fixe pour la barre latérale */
//           background-color: #f8f9fa; /* Couleur de fond de la barre latérale */
//         }

//         .main-content {
//           flex: 1;
//           display: flex;
//           flex-direction: column;
//         }

//         .content-container {
//           padding: 20px;
//           overflow-y: auto; /* Pour gérer les longues listes */
//         }

//         h2 {
//           margin-bottom: 20px;
//         }

//         table {
//           background: white;
//         }
//       `}</style>
//     </div>
//   );
// }

// export default ContactList;
