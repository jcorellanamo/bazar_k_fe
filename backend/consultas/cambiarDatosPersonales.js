// backend/consultas/cambiarDatosPersonales.js

require("dotenv").config();
const { pool } = require("../coneccion/coneccion");

const cambiarDatosPersonales = async (datos) => {
  const { nombre, apellido, telefono, email, id_usuario } = datos;
  const query = `
    UPDATE usuarios
    SET nombre = $1, apellido = $2, telefono = $3, email = $4
    WHERE id_usuario = $5
    RETURNING *;
  `;
  const values = [nombre, apellido, telefono, email, id_usuario];
  
  try {
    const { rows } = await pool.query(query, values);
    if (rows.length === 0) {
      throw new Error("Usuario no encontrado.");
    }
    return rows[0];
  } catch (error) {
    console.error("Error al actualizar datos personales:", error);
    throw error;
  }
};

module.exports = cambiarDatosPersonales;
