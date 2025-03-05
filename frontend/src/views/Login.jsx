import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import Swal from 'sweetalert2';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire('¡Bienvenido!', 'Has iniciado sesión correctamente.', 'success');
        navigate('/'); // Redirigir a la página principal
      } else {
        Swal.fire('Error', data.error || 'Credenciales incorrectas.', 'error');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      Swal.fire('Error', 'Hubo un problema con el servidor.', 'error');
    }
  };

  return (
    <div className="page-container">
      <div className="login-container">
        <div className="login-image">
          <img src="/images/login.jpg" alt="Login" />
        </div>

        <div className="login-form-container">
          <h1>Iniciar Sesión</h1>
          <p>Ingresa tus datos</p>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="checkbox-group">
              <input type="checkbox" id="keepLoggedIn" />
              <label htmlFor="keepLoggedIn" className="terms-label">
                Mantenerme conectado
              </label>
            </div>
            <Link to="/forgot-password" className="forget-password">
              He olvidado mi contraseña
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
