// backend/consultas/insertarProducto.js

require("dotenv").config();
const { pool } = require("../coneccion/coneccion");

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
  const consulta = `
    INSERT INTO productos (id_producto, nombre, descripcion, precio, stock, imagen, id_categoria, intensidad, origen)
    VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *;
  `;
  const values = [nombre, descripcion, precio, stock, imagen, id_categoria, intensidad, origen];
  const result = await pool.query(consulta, values);
  return result.rows[0]; // Retorna el producto insertado con el id generado
};

module.exports = insertarProducto;
