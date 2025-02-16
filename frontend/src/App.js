// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './views/Home';
import Productos from './views/Productos';
import Login from './views/Login';
import Registrarse from './views/Registrarse';
import Contacto from './views/Contacto';
import DetalleProducto from "./views/DetalleProducto";
import { NotFound } from "./views/NotFound";
import ArtBlog from './views/Art-Blog';
import BlogVista1 from './views/BlogVista1';
import BlogVista2 from './views/BlogVista2';
import BlogVista3 from './views/BlogVista3';
import "./App.css";

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
        <Route path="/blog" element={<ArtBlog />} />
        <Route path="/detalle/:productoId" element={<DetalleProducto />} />
        {/* Ruta de detalle del producto */}
        <Route path="*" element={<NotFound />} />
        <Route path="/vista1" element={<BlogVista1/>} />
        <Route path="/vista2" element={<BlogVista2/>} />
        <Route path="/vista3" element={<BlogVista3/>} />
        

      </Routes>
      <Footer />
    </div>
  );
}

export default App;
