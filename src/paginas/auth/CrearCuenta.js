import React from 'react' ;
import { Link } from 'react-router-dom' ;

const CrearCuenta = ()=>{
    return (
<div className="login-box">
  <div className="login-logo">
    <Link to ="{#}"><b>Crear </b>Cuenta</Link>
  </div>
  {/* /.login-logo */}
  <div className="card">
    <div className="card-body login-card-body">
      <p className="login-box-msg"> Bienvenido! Ingrese sus datos </p>
      <form action="../../index3.html" method="post">
        <div className="input-group mb-3">
          <input type="name" 
          className="form-control" 
          placeholder="Nombre" 
          id = "name" 
          name='name'/>
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-envelope" />
            </div>
          </div>
        </div>
        <div className="input-group mb-3">
          <input type="email" 
          className="form-control" 
          placeholder="Email" 
          id = "Email" 
          name='Email'/>
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-envelope" />
            </div>
          </div>
        </div>
        <div className="input-group mb-3">
          <input type="password" 
          className="form-control" 
          placeholder="Contraseña"
          id='Password' 
          name='Password'/>
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-lock" />
            </div>
          </div>
        </div>
        <div className="input-group mb-3">
          <input type="password" 
          className="form-control" 
          placeholder="Confirmar Contraseña"
          id='Confirmar' 
          name='Confirmar'/>
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-lock" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-8">
           
            </div>
          </div>
          {/* /.col */}
          
          {/* /.col */}
          <br></br>
      </form>
      <div className="social-auth-Links text-center mb-3">  
        <button type='submit' className="btn btn-block btn-primary">
          Ingresar
        </button>
        <Link to={"#"} className="btn btn-block btn-danger">
          Crear cuenta
        </Link>
      </div>
      {/* /.social-auth-Links */}
     
    </div>
    {/* /.login-card-body */}
  </div>
</div>
)
   
}

export default CrearCuenta;