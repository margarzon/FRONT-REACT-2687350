import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import RegistroForm from './components/RegistroForm';
import HomeMed from './components/HomeMed';
import CitasList from './components/CitasList';
import CitasMed from './components/CitasMed';
import HomeIndex from './components/HomeIndex';
import AdminHome from './components/AdminHome';

const App = () => {
  const [usuario, setUsuario] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm setUsuario={setUsuario} />} />
        <Route path="/home" element={<Home usuario={usuario} />} />
        <Route path="/citas" element={<CitasList />} />
        <Route path="/med" element={<CitasMed />} />
        <Route path="/index" element={<HomeIndex />} />
        <Route path="/admin" element={<AdminHome usuarioLogueado={usuario} />} /> {/* Add the route for Admin with /admin */}
        <Route path="/" element={<RegistroForm />} />
        <Route path="/homeMed" element={<HomeMed usuario={usuario} />} />
      </Routes>
    </Router>
  );
};

export default App;
