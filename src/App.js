import './App.css';
import Home from './pages/Home';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import About from './pages/About';
import FAQs from './pages/FAQs';
import Contcat from './pages/Contcat';
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
import DocList  from './components/Users/document/Document';
import EditUser from './components/Admin/users/EditUser';
import Logout from './components/Users/auth/Logout';
import ViewUser from './components/Admin/users/ViewUser';
import DocumentByUserId from './components/Admin/document/DocumentByUserId';
import UpdateDoc from './components/Users/document/UpdateDoc';



function App() {
  return (
    <Router>
      <Routes>
      {/* user */}
      <Route path="/" element={<Home/>}/>




      <Route path="/loginadmin" element={<LoginAdmin/>}/>
      {/* <Route path="/bibliotheques" element={<ListBibliotheque/>}/> */}


      
    

      <Route path="/about" element={<About/>}/>
      <Route path="/faq" element={<FAQs/>}/>
      <Route path="/contact" element={<Contcat/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
     
      <Route path="/*" element={<NotFound/>} />
      
      <Route path="/logout" element={<Logout/>} />

      <Route path="" element={<ProtectedRoute />}>
          
                 
            <Route path="/listusers" element={<ListUsers/>}/>
            <Route path="/create-user" element={<CreateUsers/>}/>
            <Route path="/edit-user/:userId" element={<EditUser/>}/>
            <Route path="/view-user/:userId" element={<ViewUser/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/dash" element={<Dashboard/>}/>
            <Route path="/bibliotheques" element={<ListeBibliotheque/>}/>
            <Route path="/createBib" element={<CreateBib/>}/>
            <Route path="/updateBib/:Id" element={<UpdateBib/>}/>
            <Route path="/documentList" element={<DocumentList/>}/>
            <Route path="/document/user/:userId" element={<DocumentByUserId/>}/>
            <Route path="/createdocuments" element={<CreateDoc/>}/>
      <Route path="/updateDocuments/:documentId" element={<UpdateDoc/>}/>
      <Route path="/documents" element={<DocList/>}/>
      <Route path="/profile" element={<Profile/>}/>
            
      </Route>      
          
        
      
      </Routes>
    </Router>
  );
}

export default App;

