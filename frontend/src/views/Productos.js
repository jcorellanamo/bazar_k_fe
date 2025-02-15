import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { kfeContext } from "../context/AppProvider"; // Importa el contexto
import "./Productos.css";

const Productos = () => {
  const navigate = useNavigate(); // Hook para navegación
  const { producto, setProducto } = useContext(kfeContext); // Accede al estado de productos

  // Solo carga los productos si no están disponibles.
  useEffect(() => {
    if (producto.length === 0) {
      // Solo cargar productos si no están disponibles en el estado global
      setProducto([]);
    }
  }, [producto, setProducto]); // Incluye setProducto en las dependencias

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
