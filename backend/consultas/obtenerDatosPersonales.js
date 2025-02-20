// backend/consultas/obtenerDatosPersonales.js

require("dotenv").config();
const { pool } = require("../coneccion/coneccion");

const obtenerDatosPersonales = async (id_usuario) => {
  const consulta = "SELECT * FROM usuarios WHERE id_usuario = $1;";
  const result = await pool.query(consulta, [id_usuario]);
  return result.rows[0];
};

module.exports = obtenerDatosPersonales;
