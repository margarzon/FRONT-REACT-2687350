import React, { useState, useEffect } from "react";

function MyComponent() {
  const [usuario, setUsuario] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmar: ''
  });

  const { nombre, email, password, confirmar } = usuario;

  const onChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    });
  }

  useEffect(() => {
    document.getElementById("nombre").focus();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    // Lógica para manejar el envío del formulario aquí
  }

  return (
    <form action="../../index3.html" method="post" onSubmit={onSubmit}>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Nombre"
          id="nombre"
          name="nombre"
          value={nombre}
          onChange={onChange}
          required
        />
      </div>
      {/* Agrega más campos de formulario aquí */}
      <button type="submit">Enviar</button>
    </form>
  );
}

export default MyComponent;
