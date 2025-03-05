import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { FaShoppingCart } from "react-icons/fa";
import { kfeContext } from "../context/AppProvider";

const Navbar = () => {
  const { totalAPagar } = useContext(kfeContext);
  const [usuario, setUsuario] = useState(null);

  // Cargar el usuario desde localStorage cuando se monta el componente
  useEffect(() => {
    const userData = localStorage.getItem("usuario");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        if (parsedUser && parsedUser.nombre && parsedUser.apellido) {
          setUsuario(parsedUser);
        }
      } catch (error) {
        console.error("Error al parsear el usuario desde localStorage", error); // mostrar el error por la consola
      }
    }
  }, []);
  

  // Función para cerrar sesión
  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    setUsuario(null);
    window.location.reload(); // Recargar la página para actualizar el navbar
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo">
          <Link to="/">
            <img src="/images/logo1.jpg" alt="Logo" className="logo-img" />
          </Link>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/productos" style={{ textDecoration: "none", color: "white" }}>
              Productos
            </Link>
          </li>

          {usuario ? (
            <>
              <li>
                <span style={{ color: "white", fontWeight: "bold" }}>
                  Bienvenido, {usuario.nombre} {usuario.apellido} 👋
                </span>
              </li>
              <li>
                <button onClick={cerrarSesion} className="btn-logout">
                  Cerrar sesión
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" style={{ textDecoration: "none", color: "white" }}>
                  Login
                </Link>
              </li>
              <li>
                <Link to="/registrarse" style={{ textDecoration: "none", color: "white" }}>
                  Registrarse
                </Link>
              </li>
            </>
          )}

          <li>
            <Link to="/contacto" style={{ textDecoration: "none", color: "white" }}>
              Contacto
            </Link>
          </li>
          <li>
            <Link to="/blog" style={{ textDecoration: "none", color: "white" }}>
              Blog
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-right">
        <Link to="/carrito" className="my-1 mb-0">
          <p className="mb-0" style={{ color: "white" }}>
            <FaShoppingCart size={30} /> ${totalAPagar}
          </p>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
