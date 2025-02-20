// backend/consultas/registrarUsuario.js

require("dotenv").config();
const { pool } = require("../coneccion/conection");

const registrarUsuario = async (datos) => {
  const { nombre, apellido, email, password, telefono } = datos;

  const consulta = `
    INSERT INTO usuarios (nombre, apellido, email, contraseña, telefono)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  
  const values = [nombre, apellido, email, password, telefono];
  
  try {
    const { rows } = await pool.query(consulta, values);
    return rows[0]; // Retorna el usuario insertado, incluyendo su id generado.
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    throw error;
  }
};

module.exports = registrarUsuario;
