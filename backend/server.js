// Importamos las dependencias necesarias para nuestra aplicación
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const jwt = require("jsonwebtoken");
const { body, validationResult, param } = require("express-validator");

// Importamos funciones necesarias para las rutas
const getProductos = require("./consultas/getProductos");
const getProductoById = require("./consultas/getProductoById");
const { insertarProducto } = require("./consultas/insertarProducto");
const eliminarProducto = require("./consultas/eliminarProducto");
const modificarProducto = require("./consultas/modificarProducto");
const obtenerDatosPersonales = require("./consultas/obtenerDatosPersonales");
const cambiarDatosPersonales = require("./consultas/cambiarDatosPersonales");
const obtenerVentas = require("./consultas/obtenerVentas");
const {
  registrarUsuario,
  verificarCorreoExistente,
} = require("./consultas/registrarUsuario");
const getUsuarioById = require("./consultas/getUsuarioById");
const iniciarSesion = require("./consultas/iniciarSesion");

// Importa y configura la conexión a la base de datos
const { Pool } = require("pg");
const pool = new Pool({
  //configuración de la conexión, se crea una instancia de Pool con la configuración necesaria para conectarse a la base de datos PostgreSQL.
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "bazarkfe",
  password: process.env.DB_PASSWORD || "Mari2019",
  port: process.env.DB_PORT || 5432,
  allowExitOnIdle: true,
});

require("dotenv").config();

const app = express();
const PORT = process.env.PORT_SERVER || 5000;

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

// Configuración de CORS
const corsOptions = {
  origin: "http://localhost:3000", // Permitir solicitudes desde localhost:3000 (frontend React)
  methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
  allowedHeaders: ["Content-Type"], // Permitir los encabezados que tu solicitud usa (como Content-Type)
};

app.use(cors(corsOptions)); // Usar cors para todas las rutas

// Middleware para verificar el token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(403)
      .json({ message: "Acceso denegado, no hay token de autenticación." });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token no válido o expirado" });
  }
};

// Ruta de bienvenida
app.get("/", (req, res) => {
  res.json({
    mensaje: "¡Bienvenidos! Esperamos que disfrutes tu experiencia.",
  });
});

// RUTA PARA REGISTRO DE NUEVOS USUARIOS
app.post(
  "/registro",
  [
    body("nombre").isString().notEmpty(),
    body("apellido").isString().notEmpty(),
    body("email").isEmail(),
    body("telefono").isString().notEmpty(),
    body("password").isString().isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    try {
      // Verificar si el correo ya está registrado
      const usuarioExistente = await verificarCorreoExistente(email);
      if (usuarioExistente) {
        return res
          .status(400)
          .json({ error: "El correo electrónico ya está registrado" });
      }

      // Si el correo no está registrado, proceder con el registro
      await registrarUsuario(req.body);
      res.status(201).json({ message: "Usuario registrado con éxito" });
    } catch (error) {
      console.error("Error al registrar usuario:", error.message);
      res.status(500).json({ error: "Error en el registro" });
    }
  }
);

//RUTA USUARIO ID
app.put("/usuarios/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, telefono, email } = req.body;

  try {
    const datosActualizados = await getUsuarioById({
      id_usuario: id,
      nombre,
      apellido,
      telefono,
      email,
    });
    res.status(200).json({
      message: "Datos actualizados con éxito",
      usuario: datosActualizados,
    });
  } catch (error) {
    console.error("Error al actualizar datos:", error.message);
    res.status(500).json({ error: "No se pudo actualizar los datos." });
  }
});

// RUTA LOGIN PARA USUARIOS
app.post(
  "/login",
  [body("email").isEmail(), body("password").isString().isLength({ min: 6 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const token = await iniciarSesion(req.body);
      res.status(200).json({ token });
    } catch (error) {
      console.error("Error en el inicio de sesión:", error.message);
      res.status(401).json({ error: "Credenciales incorrectas" });
    }
  }
);

// RUTA PARA PRODUCTOS
app.get("/productos", async (req, res) => {
  try {
    const productos = await getProductos();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

// RUTA PARA PRODUCTO POR ID
app.get(
  "/productos/:id",
  param("id").isInt().withMessage("El ID debe ser un número entero"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const producto = await getProductoById(req.params.id);
      if (!producto) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }
      res.json(producto);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener el producto" });
    }
  }
);

// RUTA PARA INSERTAR UN NUEVO PRODUCTO
app.post("/productos", async (req, res) => {
  const {
    nombre,
    descripcion,
    precio,
    stock,
    imagen,
    id_categoria,
    intensidad,
    origen,
  } = req.body;

  try {
    // Intentar insertar el producto
    const nuevoProducto = await insertarProducto(
      nombre,
      descripcion,
      precio,
      stock,
      imagen,
      id_categoria,
      intensidad,
      origen
    );

    // Si todo va bien, enviar respuesta de éxito
    res.status(201).json({
      message: "Producto insertado con éxito",
      producto: nuevoProducto,
    });
  } catch (error) {
    console.error("Error al insertar producto:", error.message);
    res.status(400).json({ error: error.message }); // Retornar el error de la verificación
  }
});
// RUTA PARA ELIMINAR UN PRODUCTO
app.delete("/productos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Llamar a una función que elimine el producto (deberás crear esta función en tu archivo de consultas)
    const productoEliminado = await eliminarProducto(id);

    if (!productoEliminado) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.status(200).json({ message: "Producto eliminado con éxito" });
  } catch (error) {
    console.error("Error al eliminar producto:", error.message);
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
});

// RUTA PARA MODIFICAR UN PRODUCTO
app.put("/productos/:id", async (req, res) => {
  const { id } = req.params;
  const {
    nombre,
    descripcion,
    precio,
    stock,
    imagen,
    id_categoria,
    intensidad,
    origen,
  } = req.body;

  try {
    // Llamar a una función que modifique el producto (deberás crear esta función en tu archivo de consultas)
    const productoModificado = await modificarProducto(
      id,
      nombre,
      descripcion,
      precio,
      stock,
      imagen,
      id_categoria,
      intensidad,
      origen
    );

    if (!productoModificado) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.status(200).json({
      message: "Producto modificado con éxito",
      producto: productoModificado,
    });
  } catch (error) {
    console.error("Error al modificar producto:", error.message);
    res.status(500).json({ error: "Error al modificar el producto" });
  }
});

// RUTA PARA OBTENER DATOS PERSONALES
app.get("/datospersonales", verifyToken, async (req, res) => {
  try {
    const datosPersonales = await obtenerDatosPersonales(req.user.id_usuario);
    if (!datosPersonales) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json(datosPersonales);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener datos personales" });
  }
});

// RUTA PARA MODIFICAR DATOS PERSONALES
app.put("/datospersonales", verifyToken, async (req, res) => {
  try {
    await cambiarDatosPersonales({
      id_usuario: req.user.id_usuario,
      ...req.body,
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "No se pudo actualizar la información" });
  }
});

// RUTA PARA OBTENER VENTAS / PEDIDOS
app.get("/ventas", async (req, res) => {
  try {
    const ventas = await obtenerVentas();
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener ventas" });
  }
});

// RUTA PARA INSERTAR UN COMENTARIO
app.post("/comentarios", async (req, res) => {
  const { nombre, email, comentario } = req.body;
  // Verifica que se hayan enviado todos los campos
  if (!nombre || !email || !comentario) {
    return res.status(400).json({ error: "Todos los campos son requeridos." });
  }
  try {
    const result = await pool.query(
      "INSERT INTO comentarios (nombre, email, comentario) VALUES ($1, $2, $3) RETURNING *",
      [nombre, email, comentario]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error al insertar comentario:", err);
    res.status(500).json({ error: "Error al insertar comentario." });
  }
});

// RUTA PARA OBTENER COMENTARIOS (solo nombre y comentario)
app.get("/comentarios", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT nombre, comentario FROM comentarios ORDER BY fecha_envio DESC"
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error al obtener comentarios:", err);
    res.status(500).json({ error: "Error al obtener comentarios." });
  }
});
// RUTA PARA INSERTAR UN CONTACTO
app.post("/contacto", async (req, res) => {
  const { nombre, email, mensaje } = req.body;
  // Verifica que se hayan enviado todos los campos
  if (!nombre || !email || !mensaje) {
    return res.status(400).json({ error: "Todos los campos son requeridos." });
  }
  try {
    const result = await pool.query(
      "INSERT INTO contacto (nombre, email, mensaje) VALUES ($1, $2, $3) RETURNING *",
      [nombre, email, mensaje]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error al insertar contacto:", err);
    res.status(500).json({ error: "Error al insertar contacto." });
  }
});

// MANEJO DE ERRORES 404
app.use((req, res) => {
  res.status(404).json({ error: "Recurso no encontrado" });
});

// INICIAR SERVIDOR
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
