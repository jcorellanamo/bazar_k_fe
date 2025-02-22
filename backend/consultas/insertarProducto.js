//consultas/insertarProducto.js
require("dotenv").config();
const { pool } = require("../coneccion/coneccion");

// Función para verificar si el producto ya existe en la base de datos
const verificarProductoExistente = async (nombre) => {
  const consulta = `
    SELECT * FROM productos WHERE nombre = $1;
  `;
  try {
    const { rows } = await pool.query(consulta, [nombre]);
    return rows.length > 0; // Si hay filas, significa que el producto ya existe
  } catch (error) {
    console.error("Error al verificar producto:", error);
    throw error;
  }
};

// Función para insertar el producto
const insertarProducto = async (
  nombre,
  descripcion,
  precio,
  stock,
  imagen,
  id_categoria,
  intensidad,
  origen
) => {
  // Verificar si el producto ya existe
  const productoExistente = await verificarProductoExistente(nombre);

  if (productoExistente) {
    throw new Error("El producto ya está registrado.");
  }

  const consulta = `
    INSERT INTO productos (id_producto, nombre, descripcion, precio, stock, imagen, id_categoria, intensidad, origen)
    VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *;
  `;
  const values = [
    nombre,
    descripcion,
    precio,
    stock,
    imagen,
    id_categoria,
    intensidad,
    origen,
  ];

  try {
    const result = await pool.query(consulta, values);
    return result.rows[0]; // Retorna el producto insertado con el id generado
  } catch (error) {
    console.error("Error al insertar producto:", error);
    throw error;
  }
};

module.exports = { insertarProducto, verificarProductoExistente };
