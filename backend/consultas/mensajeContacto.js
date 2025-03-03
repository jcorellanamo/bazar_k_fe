// backend/consultas/mensajeContacto.js
// FUNCION PARA INSERTAR UN MENSAJE DE CONTACTO
require("dotenv").config();
const { pool } = require("../coneccion/coneccion");

const mensajeContacto = async (nombre, email, mensaje) => {
  const consulta = `INSERT INTO contacto (nombre, email, mensaje) VALUES ($1, $2, $3 ) RETURNING *;`;
  const values = [nombre, email, mensaje]; // Si no hay id_usuario, usamos null
  const result = await pool.query(consulta, values);
  return result.rows[0]; // Retorna el mensaje insertado
};

module.exports = mensajeContacto;
