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
import ListUsers from './components/Admin/users/ListUsers';
import ListBibliotheque from './components/Admin/bibliotheque/ListBibliotheque';
import CreateUsers from './components/Admin/users/CreateUser';


function App() {
  return (
    <Router>
      <Routes>
      {/* user */}
      <Route path="/listusers" element={<ListUsers/>}/>
      <Route path="/createuser" element={<CreateUsers/>}/>


      <Route path="/" element={<Home/>}/>

      <Route path="/loginadmin" element={<LoginAdmin/>}/>
      <Route path="/bibliotheques" element={<ListBibliotheque/>}/>

      <Route path="/dashboard" element={<Dashboard/>}/>
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
