const { pool } = require("../coneccion/coneccion");
const { insertarProducto } = require("./insertarProducto");

async function testInsertarProducto() {
  try {
    const nuevoProducto = await insertarProducto(
      "ProductoTest",
      "Descripción de prueba",
      100,
      20,
      "imagen.jpg",
      1,
      "Baja",
      "España"
    );
    console.log(nuevoProducto);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

testInsertarProducto();
