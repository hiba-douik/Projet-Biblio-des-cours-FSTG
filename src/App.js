import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import FAQs from './pages/FAQs';

import Contact from './pages/Contcat'
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import Login from './components/Users/auth/Login';
import Profile from './components/Users/auth/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Admin/pages/Dashboard';
import LoginAdmin from './components/Admin/auth/LoginAdmin';
import ListUsers from './components/Admin/users/ListUsers';
import CreateUsers from './components/Admin/users/CreateUser';
import CreateBib from './components/Admin/Bibliotique/createBib';
import UpdateBib from './components/Admin/Bibliotique/updateBib';
import ListeBibliotheque from './components/Admin/Bibliotique/ListeBibliotique';
import DocumentList from './components/Admin/document/DocumentList';
import CreateDoc from './components/Users/document/CreateDoc';
import UpdateDocumentForm from './components/Users/document/UpdateDoc';
import DocList from './components/Users/document/Document';
import Typemanagment from './components/Admin/types/ListTypes';
import EditUser from './components/Admin/users/EditUser';
import Logout from './components/Users/auth/Logout';
import ViewUser from './components/Admin/users/ViewUser';
import DocumentByUserId from './components/Admin/document/DocumentByUserId';
import Product from './pages/Product';
import DocumentDetail from './pages/DocumentDetail'

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/loginadmin" element={<LoginAdmin />} />
        <Route path="/product" element={<Product />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/document-detail" element={<DocumentDetail />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/listusers" element={<ListUsers />} />
          <Route path="/create-user" element={<CreateUsers />} />
          <Route path="/edit-user/:userId" element={<EditUser />} />
          <Route path="/view-user/:userId" element={<ViewUser />} />
          <Route path="/bibliotheques" element={<ListeBibliotheque />} />
          <Route path="/createBib" element={<CreateBib />} />
          <Route path="/updateBib/:Id" element={<UpdateBib />} />
          <Route path="/documentList" element={<DocumentList />} />
          <Route path="/document/user/:userId" element={<DocumentByUserId />} />
          <Route path="/createdocuments" element={<CreateDoc />} />
          <Route path="/updateDocuments/:documentId" element={<UpdateDocumentForm />} />
          <Route path="/documents" element={<DocList />} />
          <Route path="/list_types" element={<Typemanagment />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
