// Script para probar la conexión a la db

const { pool } = require("./coneccion/coneccion");

async function testDB() {
  try {
    const res = await pool.query("SELECT NOW() as fecha_actual");
    console.log("✅ Conexión exitosa a la base de datos. Fecha actual:", res.rows[0].fecha_actual);
  } catch (error) {
    console.error("❌ Error en la conexión a la base de datos:", error);
  } finally {
    pool.end();
  }
}

testDB();
