// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

import Inicio from './pages/Inicio';
import Apostar from './pages/Apostar';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/apostar" element={<Apostar />} />       
      </Routes>
    </Router>
  );
}

export default App;