// src/views/Registrarse.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Registrarse.css';

const Registrarse = () => {
  return (
    <div>
      <div className="register-container">
        {/* Columna izquierda con imagen */}
        <div className="register-image">
          <img src="/images/registrarse.jpg" alt="Register-img" />
        </div>

        {/* Columna derecha con formulario */}
        <div className="register-form-container">
          <h1>Crear Cuenta</h1>
          <p>Crea tu cuenta en segundos</p>
          <form className="register-form">
            <div className="input-group">
              <input type="text" placeholder="Nombre" required />
            </div>
            <div className="input-group">
              <input type="text" placeholder="Apellidos" required />
            </div>
            <div className="input-group">
              <input type="email" placeholder="Dirección correo electrónico" required />
            </div>
            <div className="input-group">
              <input type="password" placeholder="Crear contraseña" required />
            </div>
            <div className="checkbox-group">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms" className="terms-label">
                Acepto los términos y condiciones
              </label>
            </div>
            <button type="submit" className="btn-create-account">
              Crear cuenta
            </button>
          </form>
          <p className="member-text">
            Ya estás registrado?{' '}
            <Link to="/login" className="login-link">
              Iniciar Sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registrarse;
