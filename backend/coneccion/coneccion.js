// coneccion/coneccion.js

import 'dotenv/config';
import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  allowExitOnIdle: true,
  ssl: {
    rejectUnauthorized: false
  }
});


export {
    pool
}

