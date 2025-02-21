const { pool } = require("../coneccion/coneccion");

async function verificarCorreoExistente(email) {
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
}

async function registrarUsuario() {
  const nombre = "Ana";
  const apellido = "Gómez";
  const email = "ana@example.com";
  const password = "123456";
  const telefono = "987654321";

  try {
    // Verificar si el correo ya está registrado
    const correoExistente = await verificarCorreoExistente(email);

    if (correoExistente) {
      console.log("❌ El correo ya está registrado.");
      return; // Abortamos el registro si el correo ya está en uso
    }

    // Si el correo no está registrado, proceder con el registro del usuario
    const query = `
      INSERT INTO usuarios (nombre, apellido, email, contraseña, telefono)
      VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `;

    const values = [nombre, apellido, email, password, telefono];
    const res = await pool.query(query, values);

    console.log("✅ Usuario registrado con éxito:", res.rows[0]);
  } catch (error) {
    console.error("❌ Error al registrar usuario:", error);
  } finally {
    pool.end();
  }
}

registrarUsuario();
