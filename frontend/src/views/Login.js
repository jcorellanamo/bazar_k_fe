// src/views/Login.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  return (
    <div>
      <div className="login-container">
        {/* Columna izquierda con imagen */}
        <div className="login-image">
          <img src="/images/login-image.jpg" alt="Login" />
        </div>

        {/* Columna derecha con formulario */}
        <div className="login-form-container">
          <h1>Login</h1>
          <p>Login your account in a seconds</p>
          <form className="login-form">
            <div className="input-group">
              <input type="email" placeholder="Email Address" required />
            </div>
            <div className="input-group">
              <input type="password" placeholder="Password" required />
            </div>
            <div className="checkbox-group">
              <input type="checkbox" id="keepLoggedIn" />
              <label htmlFor="keepLoggedIn" className="terms-label">
                Keep me logged in
              </label>
              <Link to="/forgot-password" className="forget-password">
                Forget password?
              </Link>
            </div>
            <button type="submit" className="btn-login">
              Log In
            </button>
          </form>
          <p className="member-text">
            Don’t have account?{' '}
            <Link to="/registrarse" className="signup-link">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
