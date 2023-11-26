import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import '../components/Home.css';

const Ticket = ({ codigoGenerado }) => (
  <div className="ticket-wrapper">
    <div className="ticket">
      <div className="ticket-txt">
        {codigoGenerado.split('').map((char, index) => (
          <span key={index} className="slide-in">
            {char}
          </span>
        ))}
      </div>
      <p className="left"></p>
      <div className="tear-line">
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
      </div>
    </div>
    <div className="ticket-rip">
      <div className="tear-line">
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
      </div>
      <p className="right"></p>
    </div>
    {codigoGenerado && (
      <div className="ticket-info">
        <p>Cita seleccionada: {codigoGenerado}</p>
      </div>
    )}
  </div>
);

const DashboardLink = ({ title, onSelect }) => (
  <div className="dashboard-link" onClick={onSelect}>
    {title}
  </div>
);

const FormularioMedicinaGeneral = () => {
  const [nombrePaciente, setNombrePaciente] = useState('');
  const [fechaCita, setFechaCita] = useState('');
  const [horaCita, setHoraCita] = useState('');

  const handleNombreChange = (e) => {
    setNombrePaciente(e.target.value);
  };

  const handleFechaChange = (e) => {
    setFechaCita(e.target.value);
  };

  const handleHoraChange = (e) => {
    setHoraCita(e.target.value);
  };

  const handleEnviarFormulario = () => {
    alert(`Cita agendada para ${nombrePaciente} el ${fechaCita} a las ${horaCita}`);
  };

  return (
    <div>
      <h3>Formulario para Medicina General</h3>
      <label htmlFor="nombrePaciente">Nombre del Paciente:</label>
      <input type="text" id="nombrePaciente" value={nombrePaciente} onChange={handleNombreChange} />

      <label htmlFor="fechaCita">Fecha de la Cita:</label>
      <input type="date" id="fechaCita" value={fechaCita} onChange={handleFechaChange} />

      <label htmlFor="horaCita">Hora de la Cita:</label>
      <input type="time" id="horaCita" value={horaCita} onChange={handleHoraChange} />

      <button onClick={handleEnviarFormulario}>Agendar Cita</button>
    </div>
  );
};

const DashboardRectangle = ({ title, content, isSelected, usuario, setUsuario, codigoGenerado, setCodigoGenerado, tiposCitasGenerados, setTiposCitasGenerados }) => {
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [editedEmail, setEditedEmail] = useState(usuario ? usuario.email : '');
  const [selectedCita, setSelectedCita] = useState('');
  const [numeroTicket, setNumeroTicket] = useState('');
  const [formularioVisible, setFormularioVisible] = useState(false);

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

  const handleCitaChange = (e) => {
    setSelectedCita(e.target.value);
  };

  const handleSelectCita = () => {
    if (tiposCitasGenerados.includes(selectedCita)) {
      alert(`Ya se ha generado un ticket para ${selectedCita}.`);
      return;
    }

    let letraAsignada = '';

    switch (selectedCita) {
      case 'Medicina General':
        letraAsignada = 'G';
        break;
      case 'Odontología General':
        letraAsignada = 'J';
        break;
      case 'Especialidades':
        letraAsignada = 'K';
        break;
      default:
        break;
    }

    const numerosAleatorios = Math.floor(100 + Math.random() * 900);
    const nuevoCodigo = letraAsignada + numerosAleatorios;

    setTiposCitasGenerados([...tiposCitasGenerados, selectedCita]);
    setCodigoGenerado(nuevoCodigo);
    // Comenté la línea que muestra automáticamente el formulario
    // setFormularioVisible(true);
  };

  const handleNumeroTicketChange = (e) => {
    setNumeroTicket(e.target.value);
  };

  const handleAgendarCita = () => {
    if (!numeroTicket || numeroTicket.trim() === '') {
      alert('Por favor, ingresa el número de ticket antes de agendar la cita.');
      return;
    }

    alert(`Número de Ticket ingresado: ${numeroTicket}, Tipo de Cita: ${selectedCita}`);
    setFormularioVisible(true);
  };

  const renderFormulario = () => {
    switch (codigoGenerado.charAt(0)) {
      case 'G':
        return formularioVisible ? <FormularioMedicinaGeneral /> : null;
      default:
        return null;
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
      {title === 'Generar Turno' && (
        <div>
          <label htmlFor="tipoCita">Tipo de Cita:</label>
          <select id="tipoCita" value={selectedCita} onChange={handleCitaChange}>
            <option value="">Selecciona un tipo de cita</option>
            <option value="Medicina General">Medicina General</option>
            <option value="Odontología General">Odontología General</option>
            <option value="Especialidades">Especialidades</option>
          </select>
          <button onClick={handleSelectCita}>Seleccionar</button>
          <Ticket codigoGenerado={codigoGenerado} />
        </div>
      )}
      {title === 'Agendar Cita' && (
        <div>
          <label htmlFor="numeroTicket">Número de Ticket:</label>
          <input type="text" id="numeroTicket" value={numeroTicket} onChange={handleNumeroTicketChange} />
          <button onClick={handleAgendarCita}>Agendar Cita</button>
          {renderFormulario()}
        </div>
      )}
      <p>{content}</p>
    </div>
  );
};

const Home = () => {
  const location = useLocation();
  const usuario = location.state ? location.state.usuario : null;

  const dashboardItems = [
    { title: 'Actualizar Datos', content: '' },
    { title: 'Generar Turno', content: 'Contenido relacionado con generar turno.' },
    { title: 'Agendar Cita', content: 'Contenido relacionado con agendar cita.' },
    { title: 'Ver Citas', content: 'Contenido relacionado con ver citas.' },
    { title: 'Historial Médico', content: 'Contenido relacionado con historial médico.' },
  ];

  const [selectedItem, setSelectedItem] = useState(dashboardItems[0]);
  const [codigoGenerado, setCodigoGenerado] = useState('');
  const [tiposCitasGenerados, setTiposCitasGenerados] = useState([]);

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>Servicio Médico Virtual</li>
          </ul>
        </nav>
      </header>

      <br></br>

      <div className="container">
        <div className="rectangle welcome-rectangle">
          <div className="dashboard-links">
            <h1>{usuario ? `Bienvenid@ ${usuario.firstName}` : 'Bienvenido a tu Servicio Médico Virtual'}</h1>
            <p>Agendar tus citas nunca ha sido tan fácil.</p>
            <br />
            {dashboardItems.map((item, index) => (
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
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
