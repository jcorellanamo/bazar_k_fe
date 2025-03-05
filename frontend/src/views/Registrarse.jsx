import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"; // Agrega useNavigate
import "./Registrarse.css";
import { kfeContext } from "../context/AppProvider";
import Swal from "sweetalert2";

function Register() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [telefono, setTelefono] = useState('');
  const navigate = useNavigate(); // Hook para redirección

  // Función para verificar si el email ya está registrado
  async function verificarCorreoExistente(email) {
    try {
      const response = await fetch(`http://localhost:5000/verificar-email?email=${email}`);
      const data = await response.json();
      return data.existe; // true si el correo ya está en la base de datos
    } catch (error) {
      console.error("Error al verificar el correo:", error);
      return false; // En caso de error, permitir el registro
    }
  }

  async function registrarse(event) {
    event.preventDefault();

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
          <form className="register-form" onSubmit={registrarse}>
            <div className="input-group">
              <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                placeholder="Apellidos"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="email"
                placeholder="Dirección correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                placeholder="Crear contraseña (mínimo 6 caracteres)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                placeholder="Teléfono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                required
              />
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
}

export default Register;
