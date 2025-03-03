// src/views/Productos.js
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom"; // Importa el hook para navegación
import { kfeContext } from "../context/AppProvider"; // Importa el contexto
import "./Productos.css";

const Productos = () => {
  const navigate = useNavigate();
  const { producto, cargando } = useContext(kfeContext); // Accedemos a 'producto' y 'cargando' desde el contexto

  // Función para navegar a la página de detalle de un producto

  const irADetalle = (id) => {
    navigate(`/detalle/${id}`);
  };

  return (
    <div className="productos-container">
      <h1>Café Molido</h1>
      <div className="productos-grid">
        {cargando ? (
          <p>Cargando productos...</p> // Mostramos este mensaje mientras se cargan los productos
        ) : (
          producto.map((producto) => (
            <div
              key={producto.id_producto}
              className="producto-card"
              onClick={() => irADetalle(producto.id_producto)} // Navegar al detalle del producto
            >
              <img
                src={producto.imagen}
                alt={producto.marca}
                className="producto-image"
              />
              <h2 className="producto-marca">{producto.marca}</h2>
              <p className="producto-descripcion">{producto.descripcion}</p>
              <div className="producto-precio">
                <span>{producto.precio}</span>
              </div>
              <button className="btn-add-to-cart">Agregar al Carrito</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Productos;
