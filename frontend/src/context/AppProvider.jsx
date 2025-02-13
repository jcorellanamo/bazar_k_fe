// src/context/AppProvider.jsx
import { createContext, useState, useEffect } from "react";

export const kfeContext = createContext();

const AppProvider = ({ children }) => {
  const [producto, setProducto] = useState([]); // Arreglo que almacenará los productos
  const [carrito, setCarrito] = useState([]); // Arreglo para el carrito de compras

  // Cargar los productos desde el archivo JSON al montar el componente
  useEffect(() => {
    getProductos();
  }, []);

  const getProductos = async () => {
    try {
      const res = await fetch("/bazarKFe_Productos.json");
      if (!res.ok) {
        throw new Error("No se pudo obtener los productos");
      }
      const productos = await res.json();
      setProducto(productos); // Actualiza el estado con los productos
    } catch (error) {
      console.error("Error al cargar los productos:", error);
    }
  };

  return (
    <kfeContext.Provider value={{ producto, setProducto, carrito, setCarrito }}>
      {children}
    </kfeContext.Provider>
  );
};

export default AppProvider;

