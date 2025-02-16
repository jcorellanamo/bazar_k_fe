// src/context/AppProvider.jsx
import { createContext, useState, useEffect } from "react";
import Swal from "sweetalert2";

export const kfeContext = createContext();

const AppProvider = ({ children }) => {
  const [producto, setProducto] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [totalAPagar, setTotalAPagar] = useState(0);
  const [actualizarTotal, setActualizarTotal] = useState(false);

  useEffect(() => {
    getProductos();
  }, []);

  const getProductos = async () => {
    try {
      const res = await fetch("/bazarKFe_Productos.json");
      if (!res.ok) throw new Error("No se pudo obtener los productos");
      const productos = await res.json();
      setProducto(productos);
    } catch (error) {
      console.error("Error al cargar los productos:", error);
    }
  };

  const agregarCarrito = (producto, cantidad) => {
    const productoExistente = carrito.find(
      (prod) => prod.id_producto === producto.id_producto
    );

    if (productoExistente) {
      // Si el producto ya está en el carrito, solo sumamos 1 a la cantidad.
      const updatedCarrito = carrito.map((prod) =>
        prod.id_producto === producto.id_producto
          ? { ...prod, count: prod.count + cantidad }
          : prod
      );
      setCarrito(updatedCarrito);
    } else {
      // Si no está en el carrito, lo agregamos con la cantidad inicial
      const nuevoProducto = { ...producto, count: cantidad };
      setCarrito([...carrito, nuevoProducto]);
    }

    setActualizarTotal(true);
  };

  const eliminarCarrito = (producto) => {
    const productoExistenteIndex = carrito.findIndex(
      (prod) => prod.id_producto === producto.id_producto
    );

    if (productoExistenteIndex >= 0) {
      if (carrito[productoExistenteIndex].count > 1) {
        const updatedCarrito = carrito.map((prod) =>
          prod.id_producto === producto.id_producto
            ? { ...prod, count: prod.count - 1 }
            : prod
        );
        setCarrito(updatedCarrito);
      } else {
        Swal.fire({
          title: "¿Estás seguro de eliminar tu producto?",
          text: "¡No podrás revertir esto!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "¡Sí, eliminar!",
        }).then((result) => {
          if (result.isConfirmed) {
            const updatedCarrito = [...carrito];
            updatedCarrito.splice(productoExistenteIndex, 1);
            setCarrito(updatedCarrito);
            Swal.fire({
              title: "¡Eliminada!",
              text: "Tu producto fue eliminada.",
              icon: "success",
            });
            setActualizarTotal(true);
          }
        });
      }
    }
  };

  useEffect(() => {
    if (actualizarTotal) {
      const total = carrito.reduce((acc, producto) => {
        return (
          acc +
          parseFloat(producto.precio.replace("$", "").replace(".", "")) *
            producto.count
        );
      }, 0);
      setTotalAPagar(total);
      setActualizarTotal(false);
    }
  }, [actualizarTotal, carrito]);

  return (
    <kfeContext.Provider
      value={{
        producto,
        carrito,
        totalAPagar,
        agregarCarrito,
        eliminarCarrito,
      }}
    >
      {children}
    </kfeContext.Provider>
  );
};

export default AppProvider;
