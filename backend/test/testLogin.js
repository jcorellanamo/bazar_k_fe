require("dotenv").config();
const iniciarSesion = require("../consultas/iniciarSesion");

async function testLogin() {
  const datosCorrectos = {
    email: "ana@example.com", // Asegúrate de que este usuario existe en la BD
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

testLogin();


