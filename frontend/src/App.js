// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './views/Home';
import Productos from './views/Productos';
import Login from './views/Login';
import Registrarse from './views/Registrarse';
import Contacto from './views/Contacto';
//import Blog from './views/Blog';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registrarse" element={<Registrarse />} />
          <Route path="/contacto" element={<Contacto />} />

        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
