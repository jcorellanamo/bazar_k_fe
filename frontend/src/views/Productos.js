// src/views/Productos.js
import React from 'react';
//import Navbar from '../components/Navbar';
import './Productos.css';

const productosData = [
  {
    id: 1,
    imagen: '/images/cafe1.jpg',
    marca: 'Marca A',
    descripcion: 'Café de alta calidad, aroma intenso.',
    precio: '$13.990'
  },
  {
    id: 2,
    imagen: '/images/cafe2.jpg',
    marca: 'Marca B',
    descripcion: 'Café orgánico, sabor excepcional.',
    precio: '$13.990'
  },
  {
    id: 3,
    imagen: '/images/cafe3.jpg',
    marca: 'Marca C',
    descripcion: 'Café premium, tostado perfecto.',
    precio: '$13.990'
  },
  {
    id: 4,
    imagen: '/images/cafe4.jpg',
    marca: 'Marca D',
    descripcion: 'Café suave, ideal para el día.',
    precio: '$13.990'
  },
  {
    id: 5,
    imagen: '/images/cafe5.jpg',
    marca: 'Marca E',
    descripcion: 'Café con notas a chocolate.',
    precio: '$13.990'
  },
  {
    id: 6,
    imagen: '/images/cafe6.jpg',
    marca: 'Marca F',
    descripcion: 'Café de origen único, sabor inigualable.',
    precio: '$13.990'
  }
];

const Productos = () => {
  return (
    <div className="productos-container">
      <h1>Café Molido</h1>
      <div className="productos-grid">
        {productosData.map(producto => (
          <div key={producto.id} className="producto-card">
            <img src={producto.imagen} alt={producto.marca} className="producto-image" />
            <h2 className="producto-marca">{producto.marca}</h2>
            <p className="producto-descripcion">{producto.descripcion}</p>
            <div className="producto-precio">
              <span>{producto.precio}</span>
              <button className="btn-add-to-cart">Agregar al Carrito</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Productos;
