// config localhost
const { Pool } = require("pg"); //importa la clase Pool de la biblioteca pg

const { HOST, DATABASE, USER, PASSWORD, PORT } = process.env; //extrae las variables de entorno necesarias para la conexión a la base de datos del archivo .env

const pool = new Pool({
  //configuración de la conexión, se crea una instancia de Pool con la configuración necesaria para conectarse a la base de datos PostgreSQL.
  host: HOST || "localhost",
  database: DATABASE || "bazarkfe",
  user: USER || "postgres", //reemplaza por tu usuario,
  password: PASSWORD || "juan2013", //ingresa tu clave
  port: PORT || 5432,
  allowExitOnIdle: true, // permite que la aplicación se cierre incluso si hay conexiones inactivas en el pool.
});

module.exports = { pool };
