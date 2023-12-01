import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/RegistroForm.css';

const LoginForm = () => {
  const [credenciales, setCredenciales] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredenciales({
      ...credenciales,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:3000/users/login', credenciales);

      console.log('Respuesta del servidor:', response);

      if (response.data.data.role === 'medico') {
        navigate('/homemed', { state: { usuario: response.data.data } });
      } else if (response.data.data.role === 'user') {
        navigate('/home', { state: { usuario: response.data.data } });
      } else {
        navigate('/home', { state: { usuario: response.data.data } });
      }

      setCredenciales({
        email: '',
        password: '',
      });
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Credenciales inválidas. Verifica tu correo electrónico y contraseña.');
    }
  };

  return (
    <div className='flogin'>
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <h2 className="active">Iniciar Sesión</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="email"
              className="fadeIn second"
              name="email"
              placeholder="Correo Electrónico"
              value={credenciales.email}
              onChange={handleChange}
            />
            <input
              type="password"
              id="password"
              className="fadeIn third"
              name="password"
              placeholder="Contraseña"
              value={credenciales.password}
              onChange={handleChange}
            />
            <input type="submit" className="fadeIn fourth" value="Iniciar Sesión" />
          </form>
          <div id="formFooter">
            <a className="underlineHover" href="/">
              ¿No tienes una cuenta? Regístrate
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
