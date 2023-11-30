import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import RegistroForm from './components/RegistroForm';
import HomeMed from './components/HomeMed';
import CitasList from './components/CitasList';
import CitasMed from './components/CitasMed';


const App = () => {
  const [usuario, setUsuario] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm setUsuario={setUsuario} />} />
        <Route path="/home" element={<Home usuario={usuario} />} />
        <Route path="/citas" element={<CitasList />} />
        <Route path="/med" element={<CitasMed />} /> {/* Agrega la ruta para CitasMed con /med */}
        <Route path="/" element={<RegistroForm />} />
        <Route path="/homeMed" element={<HomeMed usuario={usuario} />} />
      </Routes>
    </Router>
  );
};

export default App;
