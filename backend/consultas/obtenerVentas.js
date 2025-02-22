// backend/consultas/obtenerVentas.js

require("dotenv").config();
const { pool } = require("../coneccion/coneccion");

const obtenerVentas = async () => {
  const consulta = `
    SELECT 
      p.id_pedido AS n_pedido,
      u.nombre AS Nombre,
      u.apellido AS Apellido,    
      p.fecha_pedido AS Fecha_Pedido,
      p.total AS Total,
      u.telefono AS Teléfono,
      u.email AS Email,
      d.direccion AS Dirección,
      d.ciudad AS Ciudad
    FROM pedidos p 
    JOIN usuarios u ON p.id_usuario = u.id_usuario 
    LEFT JOIN (
      SELECT DISTINCT ON (id_usuario) *
      FROM direcciones
      ORDER BY id_usuario, id_direccion
    ) d ON u.id_usuario = d.id_usuario 
    ORDER BY p.id_pedido;
  `;
  
  try {
    const { rows } = await pool.query(consulta);
    console.log("Pedidos:", rows);
    return rows;
  } catch (error) {
    console.error("Error al leer publicaciones:", error);
    throw new Error("No se pudieron obtener las publicaciones");
  }
};

module.exports = obtenerVentas;
