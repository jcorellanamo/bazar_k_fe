// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';  // Importa solo Routes y Route
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './views/Home';
import Productos from './views/Productos';
import Login from './views/Login';
import Registrarse from './views/Registrarse';
import Contacto from './views/Contacto';
import Blog from './views/Blog';
import DetalleProducto from "./views/DetalleProducto";
import { NotFound } from "./views/NotFound";

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registrarse" element={<Registrarse />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/detalle/:productoId" element={<DetalleProducto />} />
        {/* Ruta de detalle del producto */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
