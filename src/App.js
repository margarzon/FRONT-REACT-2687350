import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './paginas/auth/login';
import './App.css'; // Importa tu archivo CSS aquí
import CrearCuenta from './paginas/auth/CrearCuenta';

function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path="/" exact element={<CrearCuenta />} />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;