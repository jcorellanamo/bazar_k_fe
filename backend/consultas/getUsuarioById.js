require("dotenv").config();
const { pool } = require("../coneccion/coneccion");

const getUsuarioById = async (datos) => {
  const { nombre, apellido, telefono, email, id_usuario } = datos;

  // Verificar que los datos necesarios estén presentes
  if (!nombre || !apellido || !telefono || !email || !id_usuario) {
    throw new Error("Faltan datos necesarios para actualizar.");
  }

  // Comprobar que el id_usuario es un número
  if (isNaN(id_usuario)) {
    throw new Error("El id_usuario debe ser un número válido.");
  }

  // Consulta para actualizar los datos
  const query = `
      UPDATE usuarios 
      SET nombre = $1, apellido = $2, telefono = $3, email = $4
      WHERE id_usuario = $5
      RETURNING *;
    `;

  const values = [nombre, apellido, telefono, email, id_usuario];

  try {
    const { rows } = await pool.query(query, values);

    // Si no se encontró el usuario
    if (rows.length === 0) {
      throw new Error("Usuario no encontrado.");
    }

    // Retorna los datos actualizados
    return rows[0];
  } catch (error) {
    console.error("Error al actualizar datos personales:", error);
    throw error; // Lanza el error para que sea manejado externamente
  }
};

module.exports = getUsuarioById;
