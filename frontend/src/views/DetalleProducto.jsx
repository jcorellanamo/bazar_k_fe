// src/views/DetalleProducto.jsx
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { kfeContext } from "../context/AppProvider";
import "./DetalleProducto.css";

const DetalleProducto = () => {
  const { productoId } = useParams();
  const { producto, agregarCarrito } = useContext(kfeContext);
  const [cantidad, setCantidad] = useState(1);

  const handleIncrement = () => setCantidad(cantidad + 1);
  const handleDecrement = () => {
    if (cantidad > 1) setCantidad(cantidad - 1);
  };

  const productoSeleccionado = producto.find(
    (prod) => prod.id_producto === Number(productoId)
  );

  if (!productoSeleccionado) {
    return <p>Producto no encontrado</p>;
  }

  return (
    <div className="container my-5 detail-container">
      <div className="detail-content">
        <div className="detail-left">
          <img
            src={productoSeleccionado.imagen}
            alt={productoSeleccionado.marca}
          />
        </div>

        <div className="detail-right">
          <h3>{productoSeleccionado.marca}</h3>
          <h4>{productoSeleccionado.descripcion}</h4>
          <span className="detail-price">{productoSeleccionado.precio}</span>

          <div className="quantity-container">
            <div className="quantity-controls">
              <span>Cantidad:</span>
              <button onClick={handleDecrement}>-</button>
              <span>{cantidad}</span>
              <button onClick={handleIncrement}>+</button>
            </div>
            <button
              className="add-cart-button"
              onClick={() => {
                agregarCarrito(productoSeleccionado, cantidad); // Pasamos la cantidad al agregar al carrito
              }}
            >
              Agregar al carrito
            </button>
          </div>

          <div>
            <p>
              {productoSeleccionado.descripcionCompleta ||
                productoSeleccionado.descripcion}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleProducto;
