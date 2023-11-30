// CitasList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';  // Asegúrate de proporcionar la ruta correcta a CitasList.css
import './card.css';  // Asegúrate de proporcionar la ruta correcta a Header.css

const CitasList = () => {
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:3000/citas');
        console.log('Datos recibidos:', response.data);
        const citasData = response.data.data;
        const citasWithUserInfo = await Promise.all(citasData.map(async (cita) => {
          const usuarioInfo = await getUsuarioInfo(cita.usuario);
          return {
            ...cita,
            usuarioInfo,
          };
        }));
        setCitas(citasWithUserInfo);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);  

  const handleCancelarCita = async (citaId) => {
    // Confirmación antes de cancelar la cita
    const confirmacion = window.confirm("¿Estás seguro de que quieres cancelar tu cita?");
    
    if (confirmacion) {
      try {
        await axios.delete(`http://127.0.0.1:3000/citas/${citaId}`);
        // Actualizar la lista de citas después de eliminar la cita
        const updatedCitas = citas.filter(cita => cita._id !== citaId);
        setCitas(updatedCitas);
      } catch (error) {
        console.error('Error al cancelar cita:', error);
      }
    }
  };

  // Función para obtener la información del usuario
  const getUsuarioInfo = async (usuarioId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:3000/users/${usuarioId}`);
      return response.data.data;
    } catch (error) {
      console.error('Error al obtener información del usuario:', error);
      return null;
    }
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

      <div className="citas-list-container">
        <h1>Mis Citas</h1>
        <ul>
          {citas.map(cita => (
            <li key={cita._id}>
              <strong>Usuario:</strong> {cita.usuarioInfo ? `${cita.usuarioInfo.firstName} ${cita.usuarioInfo.lastName}` : 'Información del usuario no disponible'}, <strong>Fecha:</strong> {cita.fechaCita}, <strong>Hora:</strong> {cita.horaCita}, <strong>Médico:</strong> {cita.medico}
              <button className="cancelar-btn" onClick={() => handleCancelarCita(cita._id)}>
                Cancelar Cita
              </button>
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

export default CitasList;
