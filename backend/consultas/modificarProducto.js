// consultas/modificarProducto.js
const { pool } = require("../coneccion/coneccion");

async function modificarProducto(
  id,
  nombre,
  descripcion,
  precio,
  stock,
  imagen,
  id_categoria,
  intensidad,
  origen
) {
  const consulta = `
    UPDATE productos
    SET nombre = $1, descripcion = $2, precio = $3, stock = $4, imagen = $5, id_categoria = $6, intensidad = $7, origen = $8
    WHERE id_producto = $9
    RETURNING *;
  `;

  const valores = [
    nombre,
    descripcion,
    precio,
    stock,
    imagen,
    id_categoria,
    intensidad,
    origen,
    id,
  ];

  try {
    const { rows } = await pool.query(consulta, valores);
    if (rows.length > 0) {
      // Si el producto fue encontrado y modificado, devolvemos el producto modificado
      console.log(`✅ Producto con ID ${id} modificado con éxito.`);
      return rows[0];
    } else {
      // Si no se encontró el producto, informamos que no se pudo modificar
      console.log(`❌ Producto con ID ${id} no encontrado para modificar.`);
      return null;
    }
  } catch (error) {
    console.error("❌ Error al modificar producto:", error);
    throw error;
  }
}

module.exports = modificarProducto;
