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
          <img src="/images/register-image.jpg" alt="Register" />
        </div>

        {/* Columna derecha con formulario */}
        <div className="register-form-container">
          <h1>Sign In</h1>
          <p>Create your account in a seconds</p>
          <form className="register-form">
            <div className="input-group">
              <input type="text" placeholder="First Name" required />
            </div>
            <div className="input-group">
              <input type="text" placeholder="Last Name" required />
            </div>
            <div className="input-group">
              <input type="email" placeholder="Email Address" required />
            </div>
            <div className="input-group">
              <input type="password" placeholder="Create Password" required />
            </div>
            <div className="checkbox-group">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms" className="terms-label">
                I Agree to the terms and privacy policy
              </label>
            </div>
            <button type="submit" className="btn-create-account">
              Create Account
            </button>
          </form>
          <p className="member-text">
            Already a member?{' '}
            <Link to="/login" className="login-link">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registrarse;
