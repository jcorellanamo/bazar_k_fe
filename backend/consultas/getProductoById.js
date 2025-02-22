// backend/consultas/getProductoById.js

require("dotenv").config();
const { pool } = require("../coneccion/coneccion");

const getProductoById = async (id_producto) => {
  const consulta = `
    SELECT p.id_producto, p.nombre, p.descripcion, p.precio, p.imagen AS foto
    FROM productos p
    WHERE p.id_producto = $1
    LIMIT 1;
  `;
  const { rows } = await pool.query(consulta, [id_producto]);
  
  if (rows.length === 0) {
    throw { code: 404, message: "Producto no encontrado" };
  }
  
  return rows[0];
};

module.exports = getProductoById;
