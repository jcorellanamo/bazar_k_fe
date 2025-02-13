// src/components/Footer.js
import React from 'react';
import './Footer.css';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <img src="/images/logo2.jpg" alt="Logo" className="footer-logo" />
        <span className="footer-text">2025 Bazar K-Fé. Todos los derechos reservados</span>
        <div className="footer-social">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook size={20} />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter size={20} />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={20} />
          </a>
        </div>
      </div>
      <div className="footer-right">
        <h3>Contáctanos</h3>
        <p>
          Si tienes alguna pregunta escríbenos a{' '}
          <a href="mailto:ventas@bazarcafe.cl">ventas@bazarcafe.cl</a> ¡Nos pondremos en contacto contigo lo antes posible!
        </p>
      </div>
    </footer>
  );
};

export default Footer;
