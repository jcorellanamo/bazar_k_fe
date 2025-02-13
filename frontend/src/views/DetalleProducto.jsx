//src/views/DetalleProducto.jsx
import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Importa hooks para obtener parámetros de URL y navegar
import { kfeContext } from "../context/AppProvider"; // Importa el contexto global de productos

const DetalleProducto = () => {
  const { productoId } = useParams(); // Obtiene el ID del producto desde la URL
  const navigate = useNavigate(); // Función para navegar entre rutas
  const { producto } = useContext(kfeContext); // Obtiene el estado de productos desde el contexto global

  // Buscar el producto seleccionado usando el ID de la URL
  const productoSeleccionado = producto.find(
    (prod) => prod.id_producto === Number(productoId) // Compara el ID del producto con el ID en la URL
  );

  // Si no se encuentra el producto, muestra un mensaje de error
  if (!productoSeleccionado) {
    return <p>Producto no encontrado</p>;
  }

  // Funciones para navegar entre productos (anterior y siguiente)
  const irADetalle = (id) => {
    navigate(`/detalle/${id}`); // Navega a la página de detalle del producto con el ID dado
  };

  // Obtener producto anterior (si existe)
  const productoAnterior =
    productoSeleccionado.id_producto > 1
      ? productoSeleccionado.id_producto - 1 // Si el producto actual no es el primero, obtenemos el anterior
      : null; // Si no hay producto anterior (es el primero), no lo mostramos

  // Obtener producto siguiente (si existe)
  const productoSiguiente =
    productoSeleccionado.id_producto < producto.length
      ? productoSeleccionado.id_producto + 1 // Si el producto actual no es el último, obtenemos el siguiente
      : null; // Si no hay producto siguiente (es el último), no lo mostramos
  return (
    <div className=" row container my-5">
      {/* Contenedor principal con margen */}

      <div className="d-flex flex-row">
        {/* Fila que contiene la imagen y los detalles del producto */}

        {/* Columna de la imagen del producto */}
        <div className="col-md-6 d-flex justify-content-center">
          {/* Imagen del producto, con clase 'img-fluid' para que se ajuste bien al tamaño */}
          <img
            src={productoSeleccionado.imagen} // Fuente de la imagen del producto seleccionado
            alt={productoSeleccionado.marca} // El texto alternativo es el nombre de la marca
            className="img-fluid" // Hace que la imagen sea responsiva
          />
        </div>

        {/* Columna de detalles del producto (a la derecha de la imagen) */}
        <div className="col-md-6 d-flex flex-column justify-content-between">
          <div>
            {/* Nombre o marca del producto */}
            <h2>{productoSeleccionado.marca}</h2>

            {/* Descripción del producto */}
            <p>
              <strong>Detalle:</strong> {productoSeleccionado.descripcion}
            </p>

            {/* Precio del producto */}
            <p>
              <strong>Precio:</strong>{" "}
              <span style={{ fontWeight: "bold", fontSize: "2em" }}>
                {productoSeleccionado.precio}
              </span>
            </p>
          </div>

          {/* Botones de navegación y agregar al carrito */}
          <div className="d-flex justify-content-between mt-4">
            {/* Botón para ir al producto anterior si existe */}
            {productoAnterior && (
              <button
                className="btn btn-secondary me-2"
                onClick={() => irADetalle(productoAnterior)} // Navega al detalle del producto anterior
              >
                Atrás
              </button>
            )}

            {/* Botón para ir al producto siguiente si existe */}
            {productoSiguiente && (
              <button
                className="btn btn-secondary"
                onClick={() => irADetalle(productoSiguiente)} // Navega al detalle del producto siguiente
              >
                Siguiente
              </button>
            )}
          </div>

          {/* Botón para agregar al carrito */}
          <button className="btn btn-dark mt-3">Agregar al carrito</button>
        </div>
      </div>
    </div>
  );
};

export default DetalleProducto;
