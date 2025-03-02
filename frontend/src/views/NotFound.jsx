import React from "react";
import { Link } from "react-router-dom"; // Importamos Link para redirigir al usuario
import "./NotFound.css"; // Puedes agregar estilos adicionales si lo deseas

export const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404 - Página no encontrada</h1>
      <p className="not-found-message">
        Lo sentimos, la página que buscas no existe o ha sido movida.
      </p>
      <Link to="/" className="not-found-home-button">
        Volver al inicio
      </Link>
    </div>
  );
};
