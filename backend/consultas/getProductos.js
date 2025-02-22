// backend/consultas/getProductos.js

require("dotenv").config();
const { pool } = require("../coneccion/coneccion");

const getProductos = async () => {
  const { rows: productos } = await pool.query("SELECT * FROM productos");
  return productos;
};

module.exports = getProductos;
