// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

import Inicio from './pages/Inicio';
import Apostar from './pages/Apostar';
import Usuarios from './pages/Usuarios/Index';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/apostar" element={<Apostar />} />      
        <Route path="/usuarios" element={<Usuarios />} />    
      </Routes>
    </Router>
  );
}

export default App;