import React, { useState , useEffect} from 'react';
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


const Calendar = ({ onSelectDate }) => {
  const [currentMonth, setCurrentMonth] = useState(10); // Noviembre es 10
  const [currentYear, setCurrentYear] = useState(2023);
  const [calendarDates, setCalendarDates] = useState([]);
  const [monthYear, setMonthYear] = useState('');

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  useEffect(() => {
    generateCalendar();
  }, [currentMonth, currentYear]);

  const generateCalendar = () => {
    const newCalendarDates = [];
    const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

    const lastDayOfLastMonth = new Date(currentYear, currentMonth, 0).getDate();
    const lastDayOfWeek = new Date(currentYear, currentMonth, 0).getDay();
    const daysToAdd = (7 - lastDayOfWeek + 2) % 7;

    const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();

    const selectableDays = generateSelectableDays(currentMonth, totalDays);

    for (let i = 0; i < totalDays; i++) {
      const day = i + 1;
      const currentDayOfWeek = (daysToAdd + i) % 7;
      const isGreen = selectableDays.includes(day);

      newCalendarDates.push({ day, isToday: false, dayOfWeek: daysOfWeek[currentDayOfWeek], isGreen });
    }

    setCalendarDates(newCalendarDates);
    setMonthYear(`${months[currentMonth]} ${currentYear}`);
  };

  const generateSelectableDays = (month, totalDays) => {
    if (month === 10) {
      // Noviembre
      return [30];
    } else if (month === 11) {
      // Diciembre
      return [2, 7, 12, 17, 22, 27, 31].filter(day => day <= totalDays);
    } else {
      // Otros meses
      return generatePatternForMonth(month, totalDays);
    }
  };

  const generatePatternForMonth = (month, totalDays) => {
    // Puedes personalizar el patrón para cada mes aquí
    switch (month) {
      case 0: // Enero
        return [1, 5, 10, 15, 20, 25, 28, 31].filter(day => day <= totalDays);
      case 1: // Febrero
        return [2, 7, 14, 21, 24].filter(day => day <= totalDays);
      case 2: // Marzo
        return [3, 9, 16, 22, 27].filter(day => day <= totalDays);
      // ... Ajusta los patrones para otros meses según sea necesario
      default:
        // Por defecto, selecciona el primer día del mes
        return [1];
    }
  };

  const showPrevMonth = () => {
    if (currentMonth > 0) {
      setCurrentMonth(currentMonth - 1);
    } else {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    }
  };

  const showNextMonth = () => {
    if (currentMonth < 11) {
      setCurrentMonth(currentMonth + 1);
    } else {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    }
  };

  const handleDayClick = (day) => {
    const selectedDate = `${currentYear}-${currentMonth + 1 < 10 ? '0' : ''}${currentMonth + 1}-${day < 10 ? '0' : ''}${day}`;
    
    if (calendarDates.find(date => date.day === day && date.isGreen)) {
      onSelectDate(selectedDate);
    }
  };

  return (
    <div className="calendar" id="calendar">
      <div className="month">
        <button className="nav" onClick={showPrevMonth}>&lt;</button>
        <div id="monthYear">{monthYear}</div>
        <button className="nav" onClick={showNextMonth}>&gt;</button>
      </div>
      <div className="days">
        <span>Dom</span>
        <span>Lun</span>
        <span>Mar</span>
        <span>Mié</span>
        <span>Jue</span>
        <span>Vie</span>
        <span>Sáb</span>
      </div>
      <div className="dates" id="calendarDates">
        {calendarDates.map((item, index) => (
          <button key={index} style={{ backgroundColor: item.isGreen ? "green" : "transparent" }} onClick={() => handleDayClick(item.day)}>
            {item.day !== null ? <time>{item.day}</time> : null}
          </button>
        ))}
      </div>
    </div>
  );
};


const FormularioMedicinaGeneral = ({ usuario }) => {
  const [fechaCita, setFechaCita] = useState('');
  const [horaCita, setHoraCita] = useState('');
  const [medicoSeleccionado, setMedicoSeleccionado] = useState('');
  const [randomHours] = useState(generateRandomHours());
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [citasProgramadas, setCitasProgramadas] = useState([]);

  const handleFechaChange = (fecha) => {
    setFechaCita(fecha);
    setCalendarVisible(false);
  };

  function generateRandomHours() {
    const hours = [];
    for (let i = 6; i <= 10; i++) {
      hours.push(`${i < 10 ? '0' : ''}${i}:00`);
    }
    return hours;
  }

  const handleHoraChange = (e) => {
    setHoraCita(e.target.value);
  };

  const handleMedicoChange = (e) => {
    setMedicoSeleccionado(e.target.value);
  };

  const handleEnviarFormulario = async () => {
    try {
      const nuevaCita = {
        usuario: usuario._id,
        fechaCita,
        horaCita,
        medico: medicoSeleccionado,
      };

      const response = await axios.post('http://127.0.0.1:3000/citas', nuevaCita);

      setCitasProgramadas([...citasProgramadas, response.data]);

      console.log(response.data);

      alert('Cita agendada con éxito');
    } catch (error) {
      console.error('Error al agendar la cita:', error.message);
      alert('Error al agendar la cita. Por favor, inténtalo de nuevo.');
    }
  };

  const handleCalendarToggle = () => {
    setCalendarVisible(!calendarVisible);
  };


  return (
    <div className="formulario-container">
      <h3>Formulario para Medicina General</h3>

      <label>Nombre del Paciente:</label>
      <span>{usuario.firstName} {usuario.lastName}</span>

      <label htmlFor="fechaCita">Fecha de la Cita:</label>
      {calendarVisible ? (
        <Calendar onSelectDate={handleFechaChange} />
      ) : (
        <>
          <input
            type="text"
            id="fechaCita"
            value={fechaCita}
            onChange={() => {}}
            placeholder="Selecciona una fecha"
            readOnly
          />
          <button onClick={handleCalendarToggle}>Seleccionar Fecha</button>
        </>
      )}

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
        <option value="Dra. Ana Montoya">Dra. Ana Montoya</option>
        <option value="Dr. David Martinez">Dr. David Martinez</option>
        <option value="Dr. Juan Cardona">Dr. Juan Cardona</option>
        <option value="Dr. Richard Oviedo">Dr. Richard Oviedo</option>
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

  const [citasProgramadas, setCitasProgramadas] = useState([]);

  

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
    if (item.title === 'Ver Citas') {
      window.open('/citas', '_blank');
    } else {
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
