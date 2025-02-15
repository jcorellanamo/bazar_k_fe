import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  return (
    <div className="page-container">
      <div className="login-container">
        <div className="login-image">
          <img src="/images/login.jpg" alt="Login-image"></img>
        </div>

        <div className="login-form-container">
          <h1>Login</h1>
          <p>Login to your account in seconds</p>
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
                Forgot password?
              </Link>
            </div>
            <button type="submit" className="btn-login">
              Log In
            </button>
          </form>
          <p className="member-text">
            Don’t have an account?{' '}
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
