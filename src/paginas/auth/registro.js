// src/Registro.js
import React, { useState } from 'react';

const Registro = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };

  const handleCorreoChange = (e) => {
    setCorreo(e.target.value);
  };

  const handleContrasenaChange = (e) => {
    setContrasena(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, correo, contrasena }),
      });

      if (response.ok) {
        console.log('Usuario registrado exitosamente');
      } else {
        console.error('Error al registrar usuario');
      }
    } catch (error) {
      console.error('Error al comunicarse con el servidor', error);
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input type="text" value={nombre} onChange={handleNombreChange} />
        </div>
        <div>
          <label>Correo:</label>
          <input type="email" value={correo} onChange={handleCorreoChange} />
        </div>
        <div>
          <label>Contraseña:</label>
          <input type="password" value={contrasena} onChange={handleContrasenaChange} />
        </div>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Registro;
