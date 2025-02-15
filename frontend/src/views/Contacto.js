// src/views/Contacto.js
import React from 'react';
import './Contacto.css';

const Contacto = () => {
  return (
    <div>
      <div className="contact-container">
        {/* Columna izquierda con imagen */}
        <div className="contact-image">
          <img src="/images/contacto.jpg" alt="Contacto" />
        </div>

        {/* Columna derecha con formulario */}
        <div className="contact-form-container">
          <h1>Contactanos</h1>
          <p>
            Si tienes alguna pregunta escribenos a bazark-fe@bazarkfe.cl. También puedes rellenar el siguiente formulario ¡Nos pondremos en contacto contigo lo antes posible!
          </p>
          <form className="contact-form">
            <textarea placeholder="Escribe tu mensaje aquí..." rows="10" required></textarea>
            <input type="text" placeholder="Nombre" required />
            <input type="email" placeholder="Correo Electrónico" required />
            <button type="submit" className="btn-enviar">ENVIAR</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contacto;
