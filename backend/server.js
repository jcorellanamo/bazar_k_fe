//server.js
// Importamos las dependencias necesarias para nuestra aplicación
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { pool } = require("./coneccion/coneccion"); // Aquí se importa el pool de conexión
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
  origin: "*", // Permite solicitudes desde cualquier origen
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

// RUTA LOGIN PARA USUARIOS

// Ruta de inicio de sesión
app.post(
  "/login",
  [
    body("email").isEmail().withMessage("El email no es válido"),
    body("password")
      .isString()
      .isLength({ min: 6 })
      .withMessage("La contraseña debe tener al menos 6 caracteres"),
  ],
  async (req, res) => {
    // Validar los datos
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Llamar a la función de iniciar sesión y obtener el token
      const token = await iniciarSesion({ email, password });

      // Responder con el token generado
      res.status(200).json({ token });
    } catch (error) {
      // En caso de error (usuario no encontrado o contraseña incorrecta)
      res.status(401).json({ error: error.message });
    }
  }
);

// app.post(
//   "/login",
//   [body("email").isEmail(), body("password").isString().isLength({ min: 6 })],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     try {
//       const token = await iniciarSesion(req.body);
//       res.status(200).json({ token });
//     } catch (error) {
//       console.error("Error en el inicio de sesión:", error.message);
//       res.status(401).json({ error: "Credenciales incorrectas" });
//     }
//   }
// );

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

    res.status(201).json({
      message: "Producto insertado con éxito",
      producto: nuevoProducto,
    });
  } catch (error) {
    console.error("Error al insertar producto:", error.message);
    res.status(400).json({ error: error.message });
  }
});

// RUTA PARA ELIMINAR UN PRODUCTO
app.delete("/productos/:id", async (req, res) => {
  const { id } = req.params;

  try {
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
// RUTA PARA INSERTAR UN CONTACTO
app.post("/contacto", async (req, res) => {
  console.log("Solicitud recibida en /contacto");
  const { nombre, email, mensaje } = req.body;

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

// INICIAR SERVIDOR
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
