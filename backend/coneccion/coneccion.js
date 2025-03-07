// coneccion/coneccion.js

require("dotenv").config();
const { Pool } = require("pg");

// Extraer las variables de entorno
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = process.env;

const pool = new Pool({
  host: DB_HOST || "localhost", // Por defecto se usa localhost si no está definida
  database: DB_NAME || "bazarkfe", // Nombre de la base de datos
  user: DB_USER || "postgres", // Usuario de la base de datos
  password: DB_PASSWORD || "Mari2019", // Contraseña de la base de datos
  port: DB_PORT || 5432, // Puerto de la base de datos (por defecto 5432)
  allowExitOnIdle: true, // Permite que la aplicación se cierre incluso si hay conexiones inactivas
  ssl: false,
});

module.exports = { pool };
