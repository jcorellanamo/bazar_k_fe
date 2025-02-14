// src/views/Productos.js
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importa el hook para navegación
import { kfeContext } from "../context/AppProvider"; // Importa el contexto
import "./Productos.css";

const Productos = () => {
  const navigate = useNavigate(); // Hook para navegación
  const { producto, setProducto } = useContext(kfeContext); // Accede al estado de productos

  // Usamos useEffect para cargar los productos al montar el componente
  useEffect(() => {
    if (producto.length === 0) {
      // Solo cargar productos si no están disponibles en el estado global
      fetchProductos();
    }
  }, [producto]);

  const fetchProductos = async () => {
    try {
      const res = await fetch("/bazarKFe_Productos.json");
      if (!res.ok) {
        throw new Error("No se pudo obtener los productos");
      }
      const productos = await res.json();
      setProducto(productos); // Actualiza el estado con los productos obtenidos
    } catch (error) {
      console.error("Error al cargar los productos:", error);
    }
  };

  const irADetalle = (id) => {
    navigate(`/detalle/${id}`); // Redirigir al detalle del producto con el ID
  };

  return (
    <div className="productos-container">
      <h1>Café Molido</h1>
      <div className="productos-grid">
        {producto.length > 0 ? (
          producto.map((producto) => (
            <div
              key={producto.id_producto}
              className="producto-card"
              onClick={() => irADetalle(producto.id_producto)} // Al hacer clic, redirige al detalle
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
                <button className="btn-add-to-cart">Agregar al Carrito</button>
              </div>
            </div>
          ))
        ) : (
          <p>Cargando productos...</p>
        )}
      </div>
    </div>
  );
};

export default Productos;
