import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import About from './pages/About';
import FAQs from './pages/FAQs';
import Contcat from './pages/Contcat';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import Login from './components/Users/auth/Login';

import Dashboard from './components/Admin/pages/Dashboard';
import LoginAdmin from './components/Admin/auth/LoginAdmin';
import ListeBibliotheque from './components/Admin/Bibliotique/ListeBibliotique';
import CreateBib from './components/Admin/Bibliotique/createBib';
import UpdateBib from './components/Admin/Bibliotique/updateBib';
import DocumentList from './components/Admin/document/DocumentList';
import CreateDoc from './components/Users/document/CreateDoc';
import UpdateDocumentForm from './components/Users/document/UpdateDoc';
import DocList  from './components/Users/document/Document';



function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home/>}/>

      <Route path="/loginadmin" element={<LoginAdmin/>}/>

      <Route path="/dash" element={<Dashboard/>}/>
      <Route path="/listeBib" element={<ListeBibliotheque/>}/>
      <Route path="/createBib" element={<CreateBib/>}/>
      <Route path="/updateBib" element={<UpdateBib/>}/>
      <Route path="/documentList" element={<DocumentList/>}/>
      <Route path="/uploadDoc" element={<CreateDoc/>}/>
      <Route path="/updateDoc" element={<UpdateDocumentForm/>}/>
      <Route path="/myDoc" element={<DocList/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/faq" element={<FAQs/>}/>
      <Route path="/contact" element={<Contcat/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>

      <Route path="/*" element={<NotFound/>} />
      
      </Routes>
    </Router>
  );
}

export default App;
