import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './paginas/auth/login';
import './App.css'; // Importa tu archivo CSS aquí

function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path="/" exact element={<Login />} />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
