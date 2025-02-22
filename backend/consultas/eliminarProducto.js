// consultas/eliminarProducto.js
const { pool } = require("../coneccion/coneccion");

async function eliminarProducto(id) {
  const consulta = `DELETE FROM productos WHERE id_producto = $1 RETURNING *`;
  try {
    const { rows } = await pool.query(consulta, [id]);
    return rows.length > 0; // Si el producto fue eliminado, rows contendrá el producto eliminado
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    throw error;
  }
}

module.exports = eliminarProducto;
