const { pool } = require("../coneccion/coneccion");

async function verificarProductoExistente(nombre) {
  const consulta = `
    SELECT * FROM productos WHERE nombre = $1;
  `;
  try {
    const { rows } = await pool.query(consulta, [nombre]);
    return rows.length > 0; // Si hay filas, significa que el producto ya existe
  } catch (error) {
    console.error("Error al verificar producto:", error);
    throw error;
  }
}

async function insertarProducto() {
  const nombre = "Café Express";
  const descripcion = "Café de origen único, sabor inigualable";
  const precio = "13.990";
  const stock = "15";
  const imagen = "imagen.jpj";
  const id_categoria = "1";
  const intensidad = "Amargo";
  const origen = "Colombia";

  try {
    // Verificar si el producto ya está registrado
    const productoExistente = await verificarProductoExistente(nombre);

    if (productoExistente) {
      console.log("❌ El producto ya está registrado.");
      return; // Abortamos el registro si el producto ya está en uso
    }

    // Si el producto no está registrado, proceder con el registro del usuario
    const query = `
      INSERT INTO productos (nombre, descripcion, precio, stock, imagen, id_categoria, intensidad, origen)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;
    `;

    const values = [
      nombre,
      descripcion,
      precio,
      stock,
      imagen,
      id_categoria,
      intensidad,
      origen,
    ];
    const res = await pool.query(query, values);

    console.log("✅ Producto registrado con éxito:", res.rows[0]);
  } catch (error) {
    console.error("❌ Error al registrar producto:", error);
  } finally {
    pool.end();
  }
}

insertarProducto();
