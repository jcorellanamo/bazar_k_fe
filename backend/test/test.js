const request = require("supertest");
const app = require("../server");
const { pool } = require("../coneccion/coneccion"); // Asegúrate de que la conexión esté bien configurada

// Verificar si el producto ya existe en la base de datos
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

// Insertar un nuevo producto
async function insertarProducto(
  nombre,
  descripcion,
  precio,
  stock,
  imagen,
  id_categoria,
  intensidad,
  origen
) {
  try {
    // Verificar si el producto ya está registrado
    const productoExistente = await verificarProductoExistente(nombre);

    if (productoExistente) {
      console.log("❌ El producto ya está registrado.");
      return; // Abortamos el registro si el producto ya está en uso
    }

    // Si el producto no está registrado, proceder con el registro
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
    return res.rows[0];
  } catch (error) {
    console.error("❌ Error al registrar producto:", error);
  }
}

// Modificar un producto
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
      // Si el producto fue encontrado y modificado
      console.log(`✅ Producto con ID ${id} modificado con éxito:`, rows[0]);
      return rows[0];
    } else {
      // Si no se encontró el producto
      console.log(`❌ Producto con ID ${id} no encontrado para modificar.`);
      return null;
    }
  } catch (error) {
    console.error("❌ Error al modificar producto:", error);
    throw error;
  }
}

// Eliminar producto
async function eliminarProducto(id) {
  const consulta = `
    DELETE FROM productos WHERE id_producto = $1 RETURNING *;
  `;

  try {
    const { rows } = await pool.query(consulta, [id]);

    if (rows.length > 0) {
      console.log(`✅ Producto con ID ${id} eliminado con éxito:`, rows[0]);
    } else {
      console.log(`❌ Producto con ID ${id} no encontrado para eliminar.`);
    }
  } catch (error) {
    console.error("❌ Error al eliminar producto:", error);
    throw error;
  }
}

// Verificar si el correo ya está registrado
async function verificarCorreoExistente(email) {
  const consulta = `
    SELECT * FROM usuarios WHERE email = $1;
  `;
  try {
    const { rows } = await pool.query(consulta, [email]);
    return rows.length > 0; // Si hay filas, significa que el correo ya existe
  } catch (error) {
    console.error("Error al verificar correo:", error);
    throw error;
  }
}

// Registrar un nuevo usuario
async function registrarUsuario() {
  const nombre = "Ana";
  const apellido = "Gómez";
  const email = "Gana@example.com";
  const password = "123456";
  const telefono = "987654321";

  try {
    // Verificar si el correo ya está registrado
    const correoExistente = await verificarCorreoExistente(email);

    if (correoExistente) {
      console.log("❌ El correo ya está registrado.");
      return; // Abortamos el registro si el correo ya está en uso
    }

    // Si el correo no está registrado, proceder con el registro
    const query = `
      INSERT INTO usuarios (nombre, apellido, email, contraseña, telefono)
      VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `;

    const values = [nombre, apellido, email, password, telefono];
    const res = await pool.query(query, values);

    console.log("✅ Usuario registrado con éxito:", res.rows[0]);
  } catch (error) {
    console.error("❌ Error al registrar usuario:", error);
  }
}

require("dotenv").config();
const iniciarSesion = require("../consultas/iniciarSesion");

// Prueba de inicio de sesión
async function testLogin() {
  const datosCorrectos = {
    email: "ana@example.com",
    password: "123456",
  };

  const datosIncorrectos = {
    email: "ana@example.com",
    password: "wrongpassword",
  };

  const usuarioNoExistente = {
    email: "noexiste@example.com",
    password: "123456",
  };

  try {
    console.log("🔹 Probando inicio de sesión con credenciales correctas...");
    const token = await iniciarSesion(datosCorrectos);
    console.log("✅ Inicio de sesión exitoso. Token generado:", token);

    console.log("🔹 Probando inicio de sesión con contraseña incorrecta...");
    await iniciarSesion(datosIncorrectos);
  } catch (error) {
    console.error("❌ Error esperado:", error.message);
  }

  try {
    console.log("🔹 Probando inicio de sesión con usuario no existente...");
    await iniciarSesion(usuarioNoExistente);
  } catch (error) {
    console.error("❌ Error esperado:", error.message);
  }
}

async function test() {
  console.log("🔹 Probando insertar producto...");
  await insertarProducto(); // Probar si el producto ya existe

  console.log("🔹 Probando modificar producto...");
  await modificarProducto(
    5, // ID del producto a modificar
    "Café Expresso",
    "Café de sabor intenso",
    14990,
    20,
    "nueva_imagen.jpg",
    1,
    "Suave",
    "Brasil"
  ); // Modificar el producto con ID 5

  console.log("🔹 Probando eliminar producto...");
  await eliminarProducto(5); // Eliminar el producto con ID 5

  console.log("🔹 Probando registrar usuario...");
  await registrarUsuario(); // Probar si el correo ya está registrado

  console.log("🔹 Probando inicio de sesión...");
  await testLogin();
}

// Ejecutar todas las pruebas
test().finally(() => {
  pool.end(); // Cierra el pool al final de todas las pruebas
});
