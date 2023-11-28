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

const FormularioMedicinaGeneral = ({ usuario }) => {
  const [fechaCita, setFechaCita] = useState('');
  const [horaCita, setHoraCita] = useState('');
  const [medicoSeleccionado, setMedicoSeleccionado] = useState('');

  const handleFechaChange = (e) => {
    setFechaCita(e.target.value);
  };

  const generateRandomHours = () => {
    const hours = [];
    for (let i = 6; i <= 18; i++) {
      hours.push(`${i < 10 ? '0' : ''}${i}:00`);
    }
    return hours;
  };

  const randomHours = generateRandomHours();

  const handleHoraChange = (e) => {
    setHoraCita(e.target.value);
  };

  const handleMedicoChange = (e) => {
    setMedicoSeleccionado(e.target.value);
  };

  const handleEnviarFormulario = () => {
    alert(`Cita agendada para ${usuario.firstName} el ${fechaCita} a las ${horaCita} con el médico ${medicoSeleccionado}`);
  };

  return (
    <div className="formulario-container">
      <h3>Formulario para Medicina General</h3>

      <label>Nombre del Paciente:</label>
      <span>{usuario.firstName} {usuario.lastName}</span>

      <label htmlFor="fechaCita">Fecha de la Cita:</label>
      <input type="date" id="fechaCita" value={fechaCita} onChange={handleFechaChange} />

      <label htmlFor="horaCita">Hora de la Cita:</label>
      <select
        id="horaCita"
        value={horaCita}
        onChange={handleHoraChange}
        style={{ marginBottom: '10px' }}
      >
        <option value="">Selecciona una hora</option>
        {randomHours.map((hour, index) => (
          <option key={index} value={hour}>
            {hour}
          </option>
        ))}
      </select>

      <label htmlFor="medico">Médico:</label>
      <select id="medico" value={medicoSeleccionado} onChange={handleMedicoChange}>
        <option value="">Selecciona un médico</option>
        <option value="Dr. Smith">Dr. Smith</option>
        <option value="Dr. Johnson">Dr. Johnson</option>
        <option value="Dr. Brown">Dr. Brown</option>
        <option value="Dr. Davis">Dr. Davis</option>
      </select>

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
      alert(`Ya se ha generado una Autorización para ${selectedCita}.`);
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
    setFormularioVisible(false);
  };

  const handleNumeroTicketChange = (e) => {
    setNumeroTicket(e.target.value);
  };

  const handleAgendarCita = () => {
    if (!numeroTicket || numeroTicket.trim() === '') {
      alert('Por favor, ingresa el número de Autorización antes de agendar la cita.');
      return;
    }

    const regexPattern = /^G\d{3}$/;
    if (!regexPattern.test(numeroTicket)) {
      alert('El número de Autorización ingresado no cumple con el formato requerido para Medicina General (GXXX).');
      return;
    }

    alert(`Número de Autorización ingresado: ${numeroTicket}, Tipo de Cita: ${selectedCita}`);
    setFormularioVisible(true);
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

      {title === 'Generar Autorización' && (
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
          <label htmlFor="numeroTicket">Número de Autorización:</label>
          <input type="text" id="numeroTicket" value={numeroTicket} onChange={handleNumeroTicketChange} />
          <button onClick={handleAgendarCita}>Comprobar Autorización</button>
          {formularioVisible && codigoGenerado.startsWith('G') && codigoGenerado.length === 4 && (
            <FormularioMedicinaGeneral usuario={usuario} />
          )}
        </div>
      )}

      {title === 'Ver Citas' && (
        <div class="card-container">
  <div class="card">
    <div class="card-header">Medicina General</div>
    <div class="card-body">
      <div class="card-title">Detalles de la cita</div>
      <div class="card-text">
        <div class="info-item">
          <div class="info-label">Nombre del paciente</div>
          <span>{usuario.firstName} {usuario.lastName}</span>
        </div>
        <div class="info-item">
          <div class="info-label">Fecha de la cita</div>
          <div>15/12/2023</div>
        </div>
        <div class="info-item">
          <div class="info-label">Hora de la cita</div>
          <div>10:30 AM</div>
        </div>
        <div class="info-item">
          <div class="info-label">Médico</div>
          <div>Dr. García</div>
        </div>
      </div>
      <div class="btn-container">
      <a href="#" class="btn" onClick={() => alert("Has cancelado tu cita")}>
        Cancelar Cita
      </a>
    </div>
    </div>
  </div>

  <div class="card">
    <div class="card-header">Odontología</div>
    <div class="card-body">
      <div class="card-title">Detalles de la cita</div>
      <div class="card-text">
        <div class="info-item">
          <div class="info-label">Nombre del paciente</div>
          <span>{usuario.firstName} {usuario.lastName}</span>
        </div>
        <div class="info-item">
          <div class="info-label">Fecha de la cita</div>
          <div>18/12/2023</div>
        </div>
        <div class="info-item">
          <div class="info-label">Hora de la cita</div>
          <div>11:45 AM</div>
        </div>
        <div class="info-item">
          <div class="info-label">Médico</div>
          <div>Dr. Martínez</div>
        </div>
      </div>
      <div class="btn-container">
      <a href="#" class="btn" onClick={() => alert("Has cancelado tu cita")}>
        Cancelar Cita
      </a>      </div>
    </div>
  </div>

  <div class="card">
    <div class="card-header">Especialidades</div>
    <div class="card-body">
      <div class="card-title">Detalles de la cita</div>
      <div class="card-text">
        <div class="info-item">
          <div class="info-label">Nombre del paciente</div>
          <span>{usuario.firstName} {usuario.lastName}</span>
        </div>
        <div class="info-item">
          <div class="info-label">Fecha de la cita</div>
          <div>22/12/2023</div>
        </div>
        <div class="info-item">
          <div class="info-label">Hora de la cita</div>
          <div>11:00 AM</div>
        </div>
        <div class="info-item">
          <div class="info-label">Médico</div>
          <div>Dr. González</div>
        </div>
      </div>
      <div class="btn-container">
      <a href="#" class="btn" onClick={() => alert("Has cancelado tu cita")}>
        Cancelar Cita
      </a>      </div>
    </div>
  </div>

  <div class="card">
    <div class="card-header">Especialidades</div>
    <div class="card-body">
      <div class="card-title">Detalles de la cita</div>
      <div class="card-text">
        <div class="info-item">
          <div class="info-label">Nombre del paciente</div>
          <span>{usuario.firstName} {usuario.lastName}</span>
        </div>
        <div class="info-item">
          <div class="info-label">Fecha de la cita</div>
          <div>25/12/2023</div>
        </div>
        <div class="info-item">
          <div class="info-label">Hora de la cita</div>
          <div>2:15 PM</div>
        </div>
        <div class="info-item">
          <div class="info-label">Médico</div>
          <div>Dr. Ramírez</div>
        </div>
      </div>
      <div class="btn-container">
      <a href="#" class="btn" onClick={() => alert("Has cancelado tu cita")}>
        Cancelar Cita
      </a>      </div>
    </div>
  </div>

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
    { title: 'Generar Autorización', content: 'Contenido relacionado con Generar Autorización.' },
    { title: 'Agendar Cita', content: 'Contenido relacionado con agendar cita.' },
    { title: 'Ver Citas', content: 'Contenido relacionado con ver citas.' },
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

      <br />

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

      <footer>
        <p>© 2023 Tu Servicio Médico Virtual. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};




export default Home;
