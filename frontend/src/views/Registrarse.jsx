import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Agrega useNavigate
import './Registrarse.css';
import { kfeContext } from '../context/AppProvider';
import Swal from 'sweetalert2';

const Registrarse = () => {
  const { userData, actualizarUserData, handleSubmit } = useContext(kfeContext);
  const navigate = useNavigate(); // Inicializa el hook useNavigate

  // Modificamos handleSubmit para redirigir después del registro
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Manejo del registro (puedes agregar lógica de API aquí)
    Swal.fire('¡Cuenta creada!', 'Tu cuenta fue creada con éxito.', 'success');

    // Redirige a la página de login
    navigate('/login');
  };

  return (
    <div>
      <div className="register-container">
        <div className="register-image">
          <img src="/images/registrarse.jpg" alt="Register-img" />
        </div>

        <div className="register-form-container">
          <h1>Crear Cuenta</h1>
          <p>Crea tu cuenta en segundos</p>
          <form className="register-form" onSubmit={handleFormSubmit}>
            <div className="input-group">
              <input
                type="text"
                placeholder="Nombre"
                value={userData.nombre}
                onChange={(e) => actualizarUserData('nombre', e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                placeholder="Apellidos"
                value={userData.apellidos}
                onChange={(e) => actualizarUserData('apellidos', e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="email"
                placeholder="Dirección correo electrónico"
                value={userData.email}
                onChange={(e) => actualizarUserData('email', e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                placeholder="Crear contraseña"
                value={userData.contraseña}
                onChange={(e) => actualizarUserData('contraseña', e.target.value)}
                required
              />
            </div>
            <div className="checkbox-group">
              <input
                type="checkbox"
                id="terms"
                checked={userData.aceptoTerminos}
                onChange={(e) => actualizarUserData('aceptoTerminos', e.target.checked)}
                required
              />
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
