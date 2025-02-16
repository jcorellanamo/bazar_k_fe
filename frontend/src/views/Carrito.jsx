// src/views/carrito.jsx
import { useContext } from "react";
import { kfeContext } from "../context/AppProvider";
import "./Carrito.css";

const Carrito = () => {
  const { carrito, totalAPagar, agregarCarrito, eliminarCarrito } =
    useContext(kfeContext);

  return (
    <div>
      <div className="detalleCarrito">
        <h2 className="carrito-header">Tu carrito</h2>

        {/* Encabezado de la lista con los títulos */}
        <div className="header-row">
          <span>Producto</span>
          <span>Cantidad</span>
          <span>Precio</span>
        </div>

        <ul>
          {carrito.map((producto) => (
            <li key={producto.id_producto} className="producto-item">
              {/* Columna izquierda: imagen y nombre del producto */}
              <div>
                <img src={producto.imagen} alt={producto.marca} />
              </div>

              {/* Columna central: cantidad */}
              <div className="cantidad">
                <button
                  className="decrementa"
                  onClick={() => eliminarCarrito(producto)} // Se mantiene para restar 1
                >
                  <b> - </b>
                </button>
                {producto.count}
                <button
                  className="incrementa"
                  onClick={() => agregarCarrito(producto, 1)} // Pasa solo 1 al incrementar
                >
                  <b> + </b>
                </button>
              </div>

              {/* Columna derecha: precio total */}
              <div className="precio producto-precio">
                $
                {parseFloat(producto.precio.replace("$", "").replace(".", "")) *
                  producto.count}
              </div>
            </li>
          ))}
        </ul>

        {/* Total a pagar */}
        <div className="total-a-pagar">
          <p>PAGAR PEDIDO</p>
          <p>
            <b>${totalAPagar}</b>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Carrito;
