import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  return (
    <div className="page-container">
      <div className="login-container">
        <div className="login-image">
          <img src="/images/login.jpg" alt="Login-image"></img>
        </div>

        <div className="login-form-container">
          <h1>Iniciar Sesión</h1>
          <p>Ingresa tus datos</p>
          <form className="login-form">
            <div className="input-group">
              <input type="email" placeholder="Correo electrónico" required />
            </div>
            <div className="input-group">
              <input type="password" placeholder="Contraseña" required />
            </div>
            <div className="checkbox-group">
              <input type="checkbox" id="keepLoggedIn" />
              <label htmlFor="keepLoggedIn" className="terms-label">
                Mantenerme conectado   
              </label>
            </div>
            <Link to="/forgot-password" className="forget-password">
                   He olvidado de contraseña
              </Link>
              <div>
            <button type="submit" className="btn-login">
              Iniciar Sesión
            </button>
            </div>
          </form>
          <p className="member-text">
           ¿No tienes cuenta?{' '}
            <Link to="/registrarse" className="signup-link">
              Registrarse
            </Link>
          </p>
        </div>
      </div>

     
    </div>
  );
};

export default Login;
