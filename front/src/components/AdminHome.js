import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminHome = () => {
  const [citas, setCitas] = useState([]);
  const [users, setUsers] = useState([]);

  // Fetch citas
  useEffect(() => {
    axios.get('http://127.0.0.1:3000/citas')
      .then(response => {
        console.log('Datos recibidos (Citas):', response.data);
        setCitas(response.data.data);
      })
      .catch(error => console.error('Error (Citas):', error));
  }, []);

  // Fetch users
  useEffect(() => {
    axios.get('http://127.0.0.1:3000/users') // Assuming this is the correct endpoint for users
      .then(response => {
        console.log('Datos recibidos (Users):', response.data);
        setUsers(response.data.data);
      })
      .catch(error => console.error('Error (Users):', error));
  }, []);

  const handleUpdateCita = (citaId) => {
    // Implement the logic for updating cita with ID citaId
    console.log(`Updating cita with ID ${citaId}`);
  };

  const handleDeleteCita = (citaId) => {
    // Implement the logic for deleting cita with ID citaId
    console.log(`Deleting cita with ID ${citaId}`);
  };

  const handleUpdateUser = (userId) => {
    // Implement the logic for updating user with ID userId
    console.log(`Updating user with ID ${userId}`);
  };

  const handleDeleteUser = (userId) => {
    // Implement the logic for deleting user with ID userId
    console.log(`Deleting user with ID ${userId}`);
  };

  return (
    <div className="app-container">
      <header>
        <div className="header-banner">
          <h1>Tu salud, nuestro compromiso diario</h1>
        </div>
        <div className="clear"></div>
        <nav>
          <div className="site-title">Finland</div>
          <ul>
            <li><a href="/home">Tu Servicio Médico Virtual.</a></li>
          </ul>
        </nav>
      </header>

      <div>
        <h1>Bienvenid@ Afministrador@</h1>
        <h1>Lista de Citas</h1>
        <ul>
          {citas.map(cita => (
            <li key={cita._id}>
              <strong>Usuario:</strong> {cita.usuarioInfo ? `${cita.usuarioInfo.firstName} ${cita.usuarioInfo.lastName}` : 'Información del usuario no disponible'},
              <strong>Fecha:</strong> {cita.fechaCita},
              <strong>Hora:</strong> {cita.horaCita},
              <strong>Médico:</strong> {cita.medico}
              <button onClick={() => handleUpdateCita(cita._id)}>Actualizar</button>
              <button onClick={() => handleDeleteCita(cita._id)}>Eliminar</button>
            </li>
          ))}
        </ul>

        <h1>Lista de Usuarios</h1>
        <ul>
          {users.map(user => (
            <li key={user._id}>
              <strong>Nombre:</strong> {user.firstName} {user.lastName},
              <strong>Email:</strong> {user.email},
              <strong>Rol:</strong> {user.role}
              <button onClick={() => handleUpdateUser(user._id)}>Actualizar</button>
              <button onClick={() => handleDeleteUser(user._id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </div>
<br></br>
<br></br>
<br></br>
<br></br>

      <footer>
        <p>© 2023 Tu Servicio Médico Virtual. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default AdminHome;
