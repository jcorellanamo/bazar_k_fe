// backend/consultas/iniciarSesion.js

require("dotenv").config();
const { pool } = require("../coneccion/coneccion");
const jwt = require("jsonwebtoken");

const iniciarSesion = async (datos) => {
  const { email, password } = datos;

  const consulta = `
    SELECT * FROM usuarios
    WHERE email = $1;
  `;

  try {
    const { rows } = await pool.query(consulta, [email]);

    if (rows.length === 0) {
      throw new Error("Usuario no encontrado");
    }

    const usuario = rows[0];

    if (usuario.contraseña !== password) {
      throw new Error("Contraseña incorrecta");
    }

    // Generamos el token JWT
    const token = jwt.sign(
      { id_usuario: usuario.id_usuario, email: usuario.email },
      process.env.SECRET_JWT_KEY,
      { expiresIn: "1h" }
    );

    return token;
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    throw error;
  }
};

module.exports = iniciarSesion;
