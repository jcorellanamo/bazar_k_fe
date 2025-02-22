CREATE DATABASE bazarkfe;
\c bazarkfe;

-- Creación del tipo ENUM para el estado del pedido
CREATE TYPE estado_pedido AS ENUM ('pendiente', 'enviado', 'entregado', 'cancelado');

-- Tabla de Usuarios
CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Direcciones
CREATE TABLE direcciones (
    id_direccion SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    ciudad VARCHAR(100) NOT NULL,
    region VARCHAR(100),
    codigo_postal VARCHAR(20),
    pais VARCHAR(100) NOT NULL,
    es_predeterminada BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
);

-- Tabla de Métodos de Pago
CREATE TABLE metodos_pago (
    id_metodo SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    tipo VARCHAR(50) NOT NULL, -- Tarjeta de crédito, débito, PayPal, etc.
    numero_tarjeta VARCHAR(20) NOT NULL,
    fecha_expiracion DATE NOT NULL,
    cvv VARCHAR(10) NOT NULL,
    titular VARCHAR(100) NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
);

-- Tabla de Categorías de Café
CREATE TABLE categorias (
    id_categoria SERIAL PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE NOT NULL
);

-- Tabla de Productos
CREATE TABLE productos (
    id_producto SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    precio NUMERIC(10,2) NOT NULL,
    stock INT NOT NULL,
    imagen VARCHAR(255),
    id_categoria INT NOT NULL,
    intensidad VARCHAR(50), -- Suave, Medio, Fuerte, Muy Fuerte
    origen VARCHAR(100),
    fecha_agregado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria) ON DELETE CASCADE
);

-- Tabla de Favoritos / Lista de Deseos
CREATE TABLE favoritos (
    id_favorito SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_producto INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto) ON DELETE CASCADE
);

-- Tabla de Carrito de Compras
CREATE TABLE carrito (
    id_carrito SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL CHECK (cantidad > 0),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto) ON DELETE CASCADE
);

-- Tabla de Pedidos
CREATE TABLE pedidos (
    id_pedido SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_direccion INT NOT NULL,
    id_metodo INT NOT NULL,
    total NUMERIC(10,2) NOT NULL,
    estado estado_pedido DEFAULT 'pendiente',
    fecha_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_direccion) REFERENCES direcciones(id_direccion) ON DELETE CASCADE,
    FOREIGN KEY (id_metodo) REFERENCES metodos_pago(id_metodo) ON DELETE CASCADE
);

-- Tabla de Detalles del Pedido
CREATE TABLE detalles_pedido (
    id_detalle SERIAL PRIMARY KEY,
    id_pedido INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL CHECK (cantidad > 0),
    precio_unitario NUMERIC(10,2) NOT NULL,
    subtotal NUMERIC(10,2) NOT NULL,
    FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido) ON DELETE CASCADE,
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto) ON DELETE CASCADE
);

-- Tabla de Programa de Fidelización
CREATE TABLE fidelizacion (
    id_fidelizacion SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    puntos INT DEFAULT 0,
    nivel VARCHAR(50) DEFAULT 'Bronce', -- Bronce, Plata, Oro, Black
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
);

-- Tabla de Contactos (Mensajes de usuarios)
CREATE TABLE contacto (
    id_contacto SERIAL PRIMARY KEY,
    id_usuario INT,
    nombre VARCHAR(100),
    email VARCHAR(100) NOT NULL,
    mensaje TEXT NOT NULL,
    fecha_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE SET NULL
);
