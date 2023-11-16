import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Index3 = () => {
  useEffect(() => {
    const signupButton = document.getElementById("signup-button");
    const loginButton = document.getElementById("login-button");
    const userForms = document.getElementById("user_options-forms");

    const handleSignupClick = () => {
      userForms.classList.remove("bounceRight");
      userForms.classList.add("bounceLeft");
    };

    const handleLoginClick = () => {
      userForms.classList.remove("bounceLeft");
      userForms.classList.add("bounceRight");
    };

    if (signupButton && loginButton && userForms) {
      signupButton.addEventListener("click", handleSignupClick, false);
      loginButton.addEventListener("click", handleLoginClick, false);
    }

    return () => {
      // Cleanup: remove event listeners when the component unmounts
      if (signupButton && loginButton) {
        signupButton.removeEventListener("click", handleSignupClick, false);
        loginButton.removeEventListener("click", handleLoginClick, false);
      }
    };
  }, []); // Empty dependency array to run the effect only once on mount

  return (
    <section className="user">
      <div className="user_options-container">
        <div className="user_options-text">
          <div className="user_options-unregistered">
            <h2 className="user_unregistered-title">¿No has creado tu cuenta?</h2>
            <p className="user_unregistered-text">¡Crea una cuenta ahora!</p>
            <button className="user_unregistered-signup" id="signup-button">
              REGISTRATE
            </button>
          </div>
          <div className="user_options-registered">
            <h2 className="user_registered-title" />
            <p className="user_registered-text">¿Ya tienes una cuenta?</p>
            <button className="user_registered-login" id="login-button">
              Ingresar
            </button>
          </div>
        </div>
        <div className="user_options-forms" id="user_options-forms">
          <div className="user_forms-signup">
            <h2 className="forms_title" style={{ marginTop: '-15px' }}>
              REGISTRO
            </h2>
            <form className="forms_form" id="signup-form">
              <fieldset className="forms_fieldset">
                <div className="forms_field">
                  <input
                    type="text"
                    placeholder="Nombre Completo"
                    className="forms_field-input"
                    required
                  />
                </div>
                <div className="forms_field">
                  <input
                    type="email"
                    placeholder="Email"
                    className="forms_field-input"
                    required
                  />
                </div>
                <div className="forms_field">
                  <input
                    type="password"
                    id="password"
                    placeholder="Contraseña"
                    className="forms_field-input"
                    required
                  />
                </div>
                <div className="forms_field">
                  <input
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirmar Contraseña"
                    className="forms_field-input"
                    required
                  />
                </div>
              </fieldset>
              <div className="forms_buttons">
                <input
                  type="submit"
                  value="CREAR CUENTA"
                  className="forms_buttons-action"
                />
              </div>
            </form>
          </div>
          <div className="user_forms-login">
            <h2 className="forms_title" style={{ textAlign: 'center' }}>
              Bienvenido a tu Servicio Médico Virtual
            </h2>
            <form className="forms_form">
              <fieldset className="forms_fieldset">
                <div className="forms_field">
                  <input
                    type="email"
                    placeholder="Email"
                    className="forms_field-input"
                    required
                    autoFocus
                  />
                </div>
                <div className="forms_field">
                  <input
                    type="password"
                    placeholder="Contraseña"
                    className="forms_field-input"
                    required
                  />
                </div>
              </fieldset>
              <div className="forms_buttons">
                <button
                  type="button"
                  className="forms_buttons-forgot"
                >
                  ¿Olvidaste tu contraseña?
                </button>
                <input
                  type="submit"
                  value="INGRESAR"
                  className="forms_buttons-action"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Index3;
