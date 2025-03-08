// backend/consultas/registrarUsuario.js

require("dotenv").config();
const { pool } = require("../coneccion/coneccion");

// Función para verificar si el correo ya está registrado
const verificarCorreoExistente = async (email) => {
  const consulta = `
    SELECT * FROM usuarios WHERE email = $1;
  `;
  try {
    const { rows } = await pool.query(consulta, [email]);
    return rows.length > 0; // Si hay filas, significa que el correo ya existe
  } catch (error) {
    console.error("Error al verificar correo:", error);
    throw error;
  }
};

// Función para registrar el usuario
const registrarUsuario = async (datos) => {
  const { nombre, apellido, email, password, telefono } = datos;

  const consulta = `
    INSERT INTO usuarios (nombre, apellido, email, "contraseña", telefono)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  const values = [nombre, apellido, email, password, telefono];

  try {
    const { rows } = await pool.query(consulta, values);
    console.log("Usuario insertado:", rows[0]); // Para depuración
    return rows[0]; // Retorna el usuario insertado, incluyendo su id generado.
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    throw error;
  }
};

module.exports = { registrarUsuario, verificarCorreoExistente };
