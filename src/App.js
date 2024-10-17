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


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home/>}/>

      <Route path="/loginadmin" element={<LoginAdmin/>}/>

      <Route path="/dash" element={<Dashboard/>}/>
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
