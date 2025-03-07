import React, { useState, useEffect, useCallback } from "react";
import "./Blog.css";

const BlogVista1 = () => {
  // Estados para los campos del formulario y los comentarios
  const [comentario, setComentario] = useState("");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [comentarios, setComentarios] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // Definir fetchComentarios con useCallback para mantener una referencia estable
  const fetchComentarios = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/comentarios`);
      const data = await response.json();
      setComentarios(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }, [API_URL]);

  // Ejecutar fetchComentarios al montar el componente
  useEffect(() => {
    fetchComentarios();
  }, [fetchComentarios]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newComentario = { nombre, email, comentario };

    try {
      const response = await fetch(`${API_URL}/comentarios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newComentario),
      });
      if (response.ok) {
        setComentario("");
        setNombre("");
        setEmail("");
        fetchComentarios();
      } else {
        console.error("Error al enviar comentario");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="blog-container">
      {/* Navbar */}
      {/* <Navbar /> */}

      {/* Encabezado */}
      <header className="blog-header">Bazar K-FE BLOG</header>

      {/* Sección de Imágenes */}
      <div className="blog-images">
        <img src="/images/01_Blog.png" alt="Imagen 1" className="blog-image" />
        <img src="/images/02_Blog.png" alt="Imagen 2" className="blog-image" />
      </div>

      {/* Sección de Texto en 3 Columnas */}
      <div className="blog-text">
        {/* Aquí va el contenido textual del blog */}
      </div>

      {/* Formulario de Comentarios */}
      <div className="contact-form-container">
        <h1>Cuentanos tu opinión</h1>
        <p>
          Dejanos tus comentarios. Su dirección de correo electrónico no será publicada
        </p>
        <form className="contact-form" onSubmit={handleSubmit}>
          <textarea
            placeholder="Escribe tu comentario aquí..."
            rows="10"
            required
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
          ></textarea>
          <input
            type="text"
            placeholder="Nombre"
            required
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <input
            type="email"
            placeholder="Correo Electrónico"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="btn-enviar">
            PUBLICAR COMENTARIO
          </button>
        </form>
      </div>

      {/* Visualización de Comentarios */}
      <div className="comentarios-lista">
        <h2>Opiniones Recibidas</h2>
        {comentarios.length > 0 ? (
          comentarios.map((com, index) => (
            <div key={index} className="comentario">
              <p>
                <strong>{com.nombre}</strong>
              </p>
              <p>{com.comentario}</p>
            </div>
          ))
        ) : (
          <p>No hay opiniones aún.</p>
        )}
      </div>
    </div>
  );
};

export default BlogVista1;
