import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import './card.css';

const CitasList = ({ usuarioLogueado }) => {
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    if (usuarioLogueado) {
      const fetchCitas = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:3000/citas/${usuarioLogueado._id}`);
          console.log('Datos recibidos:', response.data);

          const citasData = response.data.data;
          setCitas(citasData);
        } catch (error) {
          console.error('Error al obtener citas:', error);
        }
      };

      fetchCitas();
    }
  }, [usuarioLogueado]);

  const handleCancelarCita = async (citaId) => {
    const confirmacion = window.confirm('¿Estás seguro de que quieres cancelar tu cita?');

    if (confirmacion) {
      try {
        await axios.delete(`http://127.0.0.1:3000/citas/${citaId}`);
        const updatedCitas = citas.filter(cita => cita._id !== citaId);
        setCitas(updatedCitas);
      } catch (error) {
        console.error('Error al cancelar cita:', error);
      }
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
              <strong>Usuario:</strong> {cita.usuarioInfo ? `${cita.usuarioInfo.firstName} ${cita.usuarioInfo.lastName}` : 'Información del usuario no disponible'},
              <strong>Fecha:</strong> {cita.fechaCita},
              <strong>Hora:</strong> {cita.horaCita},
              <strong>Médico:</strong> {cita.medico}
              <button className="cancelar-btn" onClick={() => handleCancelarCita(cita._id)}>
                Cancelar Cita
              </button>
            </li>
          ))}
        </ul>
      </div>

      <footer>
        <p>© 2023 Tu Servicio Médico Virtual. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default CitasList;
