import React, { useState } from "react";
import Swal from "sweetalert2";
import "./Contacto.css";

const Contacto = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de campos
    if (!nombre || !email || !mensaje) {
      Swal.fire({
        title: "Error",
        text: "Por favor, completa todos los campos.",
        icon: "error",
      });
      return;
    }

    try {
      // const id_usuario = localStorage.getItem("id_usuario") || null;

      const response = await fetch("http://localhost:5000/contacto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          email,
          mensaje,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al enviar el mensaje.");
      }

      const data = await response.json();

      Swal.fire({
        title: "¡Mensaje enviado!",
        text:
          data.mensaje || "Nos pondremos en contacto contigo lo antes posible.",
        icon: "success",
      });

      // Limpiar campos del formulario después del envío
      setNombre("");
      setEmail("");
      setMensaje("");
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
      Swal.fire({
        title: "Error",
        text:
          error.message ||
          "Hubo un problema al enviar tu mensaje. Intenta nuevamente.",
        icon: "error",
      });
    }
  };

  return (
    <div>
      <div className="contact-container">
        <div className="contact-image">
          <img src="/images/contacto.jpg" alt="Contacto" />
        </div>
        <div className="contact-form-container">
          <h1>Contáctanos</h1>
          <p>
            Si tienes alguna pregunta escríbenos a{" "}
            <strong>bazark-fe@bazarkfe.cl</strong>. También puedes rellenar el
            siguiente formulario y ¡nos pondremos en contacto contigo pronto!
          </p>
          <form className="contact-form" onSubmit={handleSubmit}>
            <textarea
              placeholder="Escribe tu mensaje aquí..."
              rows="10"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              required
            ></textarea>
            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Correo Electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn-enviar">
              ENVIAR
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contacto;
