// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/Navbar';

import Inicio from '@/pages/Inicio';
import Apostar from '@/pages/Apostar';
import Usuarios from '@/pages/Usuarios/Index';
import UsuarioNovo from '@/pages/Usuarios/Novo';
import UsuarioEditar from '@/pages/Usuarios/Editar';
import Grupos from '@/pages/Modos/Grupos';
import Numeros from '@/pages/Modos/Numeros';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/apostar" element={<Apostar />} />      
        <Route path="/usuarios" element={<Usuarios />} />    
        <Route path="/usuarios/novo" element={<UsuarioNovo />} />    
        <Route path="/usuarios/editar" element={<UsuarioEditar />} /> 
        <Route path="/modos/grupo" element={<Grupos/>}/>
        <Route path="/modos/numeros" element={<Numeros/>}/>
      </Routes>
    </Router>
  );
}

export default App;