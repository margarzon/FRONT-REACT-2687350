import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const LoginUser = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      {/* Carrusel al principio de la página */}
      <Slider {...settings}>
        <div>
          <img src="imagen1.jpg" alt="Slide 1" />
        </div>
        <div>
          <img src="imagen2.jpg" alt="Slide 2" />
        </div>
        <div>
          <img src="imagen3.jpg" alt="Slide 3" />
        </div>
        {/* Agrega más slides según sea necesario */}
      </Slider>

      {/* Resto del contenido del componente LoginUser */}
      <div>
        <div>
          <header className="header-with-image">
            <p className="header-text-no-border">Servicio Médico Virtual</p>
          </header>
        </div>
        <div className="columns-container">
          <div className="column">
            <div className="rectangulo">
              <div className="seccion">
                <div className="informacion-usuario">
                  <div className="usuario-info">
                    <div className="usuario-icon">
                      <img src="icono-usuario.png" alt width="100%" height="100%" />
                    </div>
                    <div id="info-usuario">
                      <h1>Nombre del Usuario 1</h1>
                      <p className="plan-salud">Plan de Salud: Nombre del Plan 1</p>
                    </div>
                  </div>
                  <div id="actualizar-datos">
                    <Link to="#">Actualizar datos</Link>
                  </div>
                </div>
                <div className="botones-navegacion">
                  <Link to="#">Inicio</Link>
                  <Link to="#">Citas agendadas</Link>
                  <Link to="#">Historia clínica</Link>
                  <Link to="#">Cerrar sesión</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="card">
              <div className="card-content">
                <h2>Numero de Autorizacion</h2>
                <button className="card-button">Generar</button>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="card">
              <div className="card-content">
                <h2>Agendar Cita</h2>
                <button className="card-button">Ingresar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginUser;
