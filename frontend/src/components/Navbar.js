import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { FaShoppingCart } from "react-icons/fa";
import { kfeContext } from "../context/AppProvider";

const Navbar = () => {
  const { totalAPagar } = useContext(kfeContext);
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
            <Link
              to="/productos"
              style={{ textDecoration: "none", color: "white" }}
            >
              Productos
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "white" }}
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/registrarse"
              style={{ textDecoration: "none", color: "white" }}
            >
              Registrarse
            </Link>
          </li>
          <li>
            <Link
              to="/contacto"
              style={{ textDecoration: "none", color: "white" }}
            >
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
          <p className="mb-0 " style={{ color: "white" }}>
            <FaShoppingCart size={30} /> ${totalAPagar}
          </p>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
