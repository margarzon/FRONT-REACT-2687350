// HomeIndex.js

import React from 'react';
import './Home.css'; // Asegúrate de proporcionar la ruta correcta a Home.css
import './cardindex.css'; // Agrega un archivo CSS para la clase card-container

const HomeIndex = () => {
  return (
    < div className="app-container">
      <header>
        <div className="header-banner">
          <h1>Tu salud, nuestro compromiso diario</h1>
        </div>
        <div className="clear"></div>
        <nav>
          <div className="site-title">Finland</div>
          <ul>
            <li>
              <a href="/home">Tu Servicio Médico Virtual.</a>
            </li>
            <li>
              <a href="/login">Iniciar Sesión.</a>
            </li>
            <li>
              <a href="/">Registrarse.</a>
            </li>
          </ul>
        </nav>
      </header>
<br></br>
<br></br>
<br></br>
      <div className="custom-card-container">
  {/* Primera tarjeta */}
  <div className="custom-card custom-card-1">
    <div className="custom-card-body">
      <h2 className="custom-card-title">Atención Integral</h2>
      <p className="custom-card-text">Ofrecemos servicios médicos completos para el bienestar de toda tu familia. Desde exámenes preventivos hasta tratamientos especializados, estamos comprometidos con tu salud a cada paso.</p>
    </div>
  </div>

  {/* Segunda tarjeta */}
  <div className="custom-card custom-card-2">
    <div className="custom-card-body">
      <h2 className="custom-card-title">Especialistas Altamente Calificados</h2>
      <p className="custom-card-text">Nuestro equipo de profesionales médicos altamente capacitados y especializados está listo para brindarte la mejor atención posible. Con experiencia en diversas áreas, trabajamos juntos para ofrecer soluciones personalizadas para tus necesidades de salud.</p>
    </div>
  </div>

  {/* Tercera tarjeta */}
  <div className="custom-card custom-card-3">
    <div className="custom-card-body">
      <h2 className="custom-card-title">Tecnología Avanzada</h2>
      <p className="custom-card-text">En el corazón de nuestros servicios se encuentra la tecnología de vanguardia. Utilizamos equipos modernos y métodos innovadores para garantizar diagnósticos precisos y tratamientos efectivos. Tu salud merece lo mejor, y en nuestro centro, eso es exactamente lo que recibirás.</p>
    </div>
  </div>
</div>
      <footer>
        <p>© 2023 Tu Servicio Médico Virtual. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default HomeIndex;
