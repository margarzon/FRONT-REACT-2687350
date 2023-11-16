import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './paginas/auth/navbar';
import Registro from './paginas/auth/registro';
import Index3 from './paginas/auth/index3';
import Loginuser from './paginas/auth/loginuser';
import User from './paginas/auth/user';
import './index.css'; // Importa tu archivo CSS aquí
import './user.css'; // Importa tu archivo CSS aquí


function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<Index3/>} />
          <Route path="/user" element={<Loginuser/>} />
          <Route path="/usera" element={<User/>} />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
