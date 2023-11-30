import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import '../components/Home.css';

const DashboardLink = ({ title, onSelect }) => (
  <div className="dashboard-link" onClick={onSelect}>
    {title}
  </div>
);

const DashboardRectangle = ({
  title,
  content,
  isSelected,
  usuario,
  setUsuario,
  codigoGenerado,
  setCodigoGenerado,
  tiposCitasGenerados,
  setTiposCitasGenerados,
  excusaInasistencia,
  setExcusaInasistencia,
}) => {
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [editedEmail, setEditedEmail] = useState(usuario ? usuario.email : '');

  const handleEditEmail = () => {
    setIsEditingEmail(true);
  };

  const handleEmailChange = (e) => {
    setEditedEmail(e.target.value);
  };

  const handleSaveEmail = async () => {
    try {
      const response = await axios.put(`http://127.0.0.1:3000/users/${usuario._id}`, { email: editedEmail });
      setUsuario({ ...usuario, email: editedEmail });
      setIsEditingEmail(false);
    } catch (error) {
      console.error('Error al actualizar el correo electrónico:', error);
    }
  };

  const [nombrePaciente, setNombrePaciente] = useState('');
  const [fechaCita, setFechaCita] = useState('');
  const [motivoInasistencia, setMotivoInasistencia] = useState('');

  const [motivo, setMotivo] = useState('');
  const [fecha, setFecha] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');
  const [nombreEmpleado, setNombreEmpleado] = useState('');
  const [comentarios, setComentarios] = useState('');
  const [error, setError] = useState('');
  const [enviado, setEnviado] = useState(false);

  const handleSubmitExcusa = async (e) => {
    e.preventDefault();

    try {
      // Aquí puedes realizar la lógica para enviar los datos del formulario al backend
      // por ejemplo, utilizando axios.post
      // await axios.post('URL_DEL_BACKEND', { ...tusDatos });

      setEnviado(true);
      setError('');
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      setError('Error al enviar el formulario. Por favor, intenta nuevamente.');
    }
  };

  return (
    <div className={`rectangle other-rectangle ${isSelected ? 'selected' : ''}`}>
      <h1>{title}</h1>

      {title === 'Actualizar Datos' && usuario && (
        <div className="user-profile">
          <p>
            <strong>Nombre:</strong> {usuario.firstName}
          </p>
          <p>
            <strong>Apellidos:</strong> {usuario.lastName}
          </p>
          {isEditingEmail ? (
            <div>
              <strong>Correo Electrónico:</strong>{' '}
              <input type="text" value={editedEmail} onChange={handleEmailChange} />
              <button onClick={handleSaveEmail}>Guardar</button>
            </div>
          ) : (
            <p>
              <strong>Correo Electrónico:</strong> {usuario.email}{' '}
              <button onClick={handleEditEmail}>Editar</button>
            </p>
          )}
        </div>
      )}

      {title === 'Citas Pendientes' && (
        <div className="card-container">
          {[...Array(8)].map((_, index) => (
            <div className="card" key={index}>
              <div className="card-header">Medicina General</div>
              <div className="card-body">
                <div className="card-title">Detalles de la cita</div>
                <div className="card-text">
                  <div className="info-item">
                    <div className="info-label">Nombre del paciente</div>
                    <div>Juan</div>
                  </div>
                  <div className="info-item">
                    <div className="info-label">Fecha de la cita</div>
                    <div>15/12/2023</div>
                  </div>
                  <div className="info-item">
                    <div className="info-label">Hora de la cita</div>
                    <div>10:30 AM</div>
                  </div>
                  <div className="info-item">
                    <div className="info-label">Estado</div>
                    <div>Activo</div>
                  </div>
                </div>
                <div className="btn-container">
                  <a
                    href="#"
                    className="btn"
                    onClick={() => alert('Has reportado inasistencia a cita medica, se procederá a realizar protocolo para reportar a paciente')}
                  >
                    Reportar inasistencia
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {title === 'Reportes Excusas de Inasistencia' && (
        <div>
          <h3>Formulario de Excusas de Inasistencia</h3>
          <form onSubmit={(e) => handleSubmitExcusa(e)}>

          <label htmlFor="motivoInasistencia">Motivo de Inasistencia:</label>
      <select
        id="motivoInasistencia"
        value={motivoInasistencia}
        onChange={(e) => setMotivoInasistencia(e.target.value)}
        required
      >
        <option value="" disabled>
          Selecciona un motivo
        </option>
        <option value="Enfermedad">Enfermedad</option>
        <option value="Cita médica">Cita médica</option>
        <option value="Emergencia familiar">Emergencia familiar</option>
        <option value="Problemas de transporte">Problemas de transporte</option>
        <option value="Compromisos familiares">Compromisos familiares</option>
        <option value="Evento personal">Evento personal</option>
        <option value="Problemas técnicos (si la inasistencia es virtual)">
          Problemas técnicos (si la inasistencia es virtual)
        </option>
        <option value="Actividad extracurricular">Actividad extracurricular</option>
        <option value="Viaje">Viaje</option>
        <option value="Otro compromiso importante">Otro compromiso importante</option>
      </select>
              <br></br>
        <br></br>
            <label htmlFor="motivo">Comentarios Adicionales</label>
            <input
              type="text"
              id="motivo"
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              required
            />

            <label htmlFor="fecha">Fecha:</label>
            <input
              type="date"
              id="fecha"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              required
            />

            <label htmlFor="horaInicio">Hora de Inicio:</label>
            <input
              type="time"
              id="horaInicio"
              value={horaInicio}
              onChange={(e) => setHoraInicio(e.target.value)}
              required
            />

            <label htmlFor="horaFin">Hora de Fin:</label>
            <input
              type="time"
              id="horaFin"
              value={horaFin}
              onChange={(e) => setHoraFin(e.target.value)}
              required
            />


            {error && <p>{error}</p>}

            {enviado && <p>¡Formulario enviado con éxito!</p>}
            <br></br>
        <br></br>
            <button type="submit">Enviar Excusa</button>
          </form>
        </div>
      )}

      <p>{content}</p>
    </div>
  );
};

const HomeMed = () => {
  const location = useLocation();
  const usuario = location.state ? location.state.usuario : null;

  const dashboardItems = [
    { title: 'Actualizar Datos', content: '' },
    { title: 'Citas Pendientes', content: 'Contenido relacionado con citas pendientes.' },
    { title: 'Reportes Excusas de Inasistencia', content: 'Contenido relacionado Excusas de Inasistencia.' },
  ];

  const duplicatedDashboardItems = [...dashboardItems];

  const [selectedItem, setSelectedItem] = useState(duplicatedDashboardItems[0]);
  const [codigoGenerado, setCodigoGenerado] = useState('');
  const [tiposCitasGenerados, setTiposCitasGenerados] = useState([]);
  const [excusaInasistencia, setExcusaInasistencia] = useState('');

  const handleSelectItem = (item) => {
    // Check if the selected item is 'Reportes Excusas de Inasistencia'
    if (item.title === 'Reportes Excusas de Inasistencia') {
      setSelectedItem(item);
      setExcusaInasistencia('');
    } else if (item.title === 'Citas Pendientes') {
      // Open a new window or navigate to the specified link for 'Ver Citas'
      window.open('/med', '_blank'); // You can modify this line based on your routing needs
    } else {
      // For other items, update the selected item state
      setSelectedItem(item);
    }
  };
  
  return (
    <div>
      <header>
        <div className="header-banner">
          <h1>Tu salud, nuestro compromiso diario</h1>
        </div>
        <div className="clear"></div>
        <nav>
          <div className="site-title">Finland</div>
          <ul>
            <li>
              <a href="/homemed">Tu Servicio Médico Virtual.</a>
            </li>
          </ul>
        </nav>
      </header>

      <br />

      <div className="container">
        <div className="rectangle welcome-rectangle">
          <div className="dashboard-links">
            <h1>{usuario ? `Bienvenid@ ${usuario.firstName}` : 'Bienvenido a tu Servicio Médico Virtual'}</h1>
            <p>En Tu Servicio Médico Virtual, velamos por la calidad y bienestar de nuestros médicos.</p>
            <br />
            {duplicatedDashboardItems.map((item, index) => (
              <DashboardLink key={index} title={item.title} onSelect={() => handleSelectItem(item)} />
            ))}
          </div>
        </div>

        <div className="dashboard-content">
          <DashboardRectangle
            title={selectedItem.title}
            content={selectedItem.content}
            isSelected
            usuario={usuario}
            setUsuario={() => {}}
            codigoGenerado={codigoGenerado}
            setCodigoGenerado={setCodigoGenerado}
            tiposCitasGenerados={tiposCitasGenerados}
            setTiposCitasGenerados={setTiposCitasGenerados}
            excusaInasistencia={excusaInasistencia}
            setExcusaInasistencia={setExcusaInasistencia}
          />
        </div>
      </div>

      <footer>
        <p>© 2023 Tu Servicio Médico Virtual. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default HomeMed;
