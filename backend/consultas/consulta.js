//consultas/consultas.js
// importando paquetes instalados necesarios
require("dotenv").config();

// importando lo que necesitas de conection.js, conexion a la BD
const { pool } = require("../conection/conection");

//variables globales de server.js
let status = "";
let message = "";

// FUNCIÓN PARA INSERTAR UN NUEVO PRODUCTO

const insertarProducto = async (marca, descripcion, imagen, stock, precio) => {
  const consulta = `INSERT INTO productos (id_producto, marca, descripcion, imagen, stock, precio) VALUES (DEFAULT, $1, $2, $3, $4, $5) RETURNING *;`;
  const values = [marca, descripcion, imagen, stock, precio];
  const result = await pool.query(consulta, values);
  return result.rows[0]; // Retorna el producto insertado con id generado
};

// FUNCIÓN PARA TRAER PRODUCTO
const getProductos = async () => {
  const { rows: productos } = await pool.query("SELECT * FROM productos");
  return productos;
};

// FUNCIÓN PARA TRAER PRODUCTO POR ID (Tengo dudas con esta función)
const getProductoById = async (id_producto) => {
  // Realizamos la consulta a la base de datos para obtener el producto por ID
  const { rows } = await pool.query(
    `SELECT p.id_producto, p.nombre, p.descripcion, p.precio, 
              p.imagen AS foto
       FROM productos p
       WHERE p.id_producto = $1 LIMIT 1`, // Aquí corregimos la consulta
    [id_producto] // Pasamos el id_producto como parámetro
  );

  // Verificamos si no se encontraron productos
  if (rows.length === 0) {
    throw { code: 404, message: "Producto no encontrado" };
  }

  // Si encontramos el producto, lo devolvemos
  return rows[0];
};

// FUNCIÓN PARA OBTENER DATOS DE USUARIO
const obtenerDatosPersonales = async (id_usuario) => {
  const consulta = "SELECT * FROM usuarios WHERE id_usuario = $1 ; ";
  const values = [id_usuario];
  const result = await pool.query(consulta, values);
  return result.rows[0]; // Retorna la publicación actualizada
};

// FUNCIÓN PARA MODIFICAR DATOS DE USUARIO
const cambiarDatosPersonales = async (datos) => {
  const { nombre, apellido, telefono, email, id_usuario } = datos;
  // console.log("información usuario mas id", id_usuario, nombre, apellido, telefono, email);
  const query = `    UPDATE usuarios     SET nombre = $1, apellido = $2, telefono = $3, email = $4    WHERE id_usuario = $5  RETURNING *;`;

  const values = [nombre, apellido, telefono, email, id_usuario];

  try {
    const { rows } = await pool.query(query, values);
    if (rows.length === 0) {
      throw new Error("Usuario no encontrado.");
    }
    return rows[0]; // Devuelve los datos actualizados
  } catch (error) {
    console.error("Error al actualizar datos personales:", error);
    throw error;
  }
};

// FUNCIÓN PARA OBTENER DATOS DEL PEDIDO / VENTA
const obtenerVentas = async () => {
  const consulta = `SELECT p.id_pedido AS n_pedido, u.nombre AS Nombre, u.apellido AS Apellido,    
  p.fecha_pedido AS Fecha_Pedido, p.total AS Total,  u.telefono AS Teléfono,  u.email AS Email, 
  d.direccion AS Dirección, d.ciudad AS Ciudad FROM pedidos p 
  JOIN  usuarios u ON p.id_usuario = u.id_usuario 
  LEFT JOIN (SELECT DISTINCT ON (id_usuario) * FROM direcciones 
  ORDER BY id_usuario, id_direccion) d ON u.id_usuario = d.id_usuario 
  ORDER BY p.id_pedido;`;

  try {
    const { rows } = await pool.query(consulta);
    console.log(" Pedidos ", rows);
    return rows;
  } catch (error) {
    console.error("Error al leer publicaciones:", error);
    throw new Error("No se pudieron obtener las publicaciones");
  }
};

module.exports = {
  insertarProducto,
  getProductos,
  getProductoById,
  obtenerDatosPersonales,
  obtenerVentas,
  cambiarDatosPersonales,
};
