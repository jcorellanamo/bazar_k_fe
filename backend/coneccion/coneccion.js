// coneccion/coneccion.js

require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Usar la URL de conexión
  ssl: { rejectUnauthorized: false }, // Para conexiones remotas con SSL
  allowExitOnIdle: true,
});

module.exports = { pool };

