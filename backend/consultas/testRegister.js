const { pool } = require("../coneccion/coneccion");

async function registrarUsuario() {
  try {
    const query = `
      INSERT INTO usuarios (nombre, apellido, email, contraseña, telefono)
      VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `;

    const values = ["Ana", "Gómez", "ana@example.com", "123456", "987654321"];
    const res = await pool.query(query, values);

    console.log("✅ Usuario registrado con éxito:", res.rows[0]);
  } catch (error) {
    console.error("❌ Error al registrar usuario:", error);
  } finally {
    pool.end();
  }
}

registrarUsuario();
