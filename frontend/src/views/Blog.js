import React from "react";
import "./Blog.css";

const Blog = () => {
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
        <div className="blog-text-column">
          <p>
            El café no es solo una bebida, es una experiencia que despierta
            nuestros sentidos, conecta a las personas y nos acompaña en esos
            momentos de calma o productividad. Ya sea que lo tomes solo, con
            leche, en la mañana o después de almuerzo, aquí te compartimos
          </p>
          <h2>
            7 Razones Irresistibles para Disfrutar de tu Taza de Café Diaria
          </h2>

          <h3>1. Energía para tu Día</h3>

          <p>
            No es sorpresa que el café sea la elección número uno para comenzar
            el día. La cafeína, su principal componente activo, actúa como un
            estimulante natural que mejora la concentración y te da ese empujón
            necesario para enfrentar tus tareas.{" "}
          </p>

          <h3>2. Una Explosión de Antioxidantes</h3>
          <p>
            El café está repleto de antioxidantes que ayudan a proteger tu
            cuerpo de los radicales libres, combatiendo el envejecimiento
            celular.
          </p>
        </div>

        <div className="blog-text-column">
          {" "}
          <p>
            <h3>3. Mejora tu Rendimiento Físico </h3>
            Si disfrutas hacer deporte o simplemente te gusta sentirte activo,
            el café es tu aliado. La cafeína aumenta los niveles de adrenalina
            en la sangre, lo que puede mejorar tu rendimiento físico en un
            11-12%.
            <h3>4. Fomenta la Conexión Social</h3>
            No hay nada como una buena conversación acompañada de una taza de
            café. En Chile, el café es el compañero ideal para largas charlas
            con amigos o familiares. Es una bebida que nos une y crea momentos
            inolvidables.
            <h3>5. Es Parte de la Cultura Chilena </h3>
            Cada región del mundo tiene su manera única de disfrutar el café, y
            en Chile no es la excepción. Desde un "café con piernas" en Santiago
            hasta el café de especialidad que ofrecen pequeños emprendedores a
            lo largo del país, el café se ha convertido en una parte importante
            de nuestra vida diaria.
          </p>
        </div>

        <div className="blog-text-column">
          <p>
            <h3>7. El Placer del Ritual Diario </h3>
            Preparar una taza de café es más que una rutina, es un momento
            especial del día. Desde escoger tu grano favorito, molerlo al
            instante y disfrutar su aroma, hasta el primer sorbo que te envuelve
            con su sabor, este ritual nos brinda un momento de pausa y disfrute
            personal. 
            
            <h3>Disfruta del Mejor Café</h3>
            No importa cómo lo prefieras, el café es una bebida versátil y deliciosa que nos ofrece una variedad de beneficios. En nuestra tienda, te ofrecemos una selección de las mejores marcas de cafés del mundo como Occaffé, Lavazza y Lucaffé para que puedas disfrutar de los beneficios de esta maravillos bebida ¡Explora nuestra tienda y encuentra el café perfecto para ti!
          </p>
        </div>
      </div>

      {/* Sección de Comentarios */}
      {/* <div className="blog-comments">
        <h2>Deja tu comentario</h2>
        <form className="comment-form">
          <input type="text" placeholder="Nombre" required />
          <input type="email" placeholder="Correo Electrónico" required />
          <textarea placeholder="Comentario" required></textarea>
          <button type="submit">Publicar comentario</button>
        </form>
      </div> */}

      <div className="contact-form-container">
          <h1>Cuentanos tu opinión</h1>
          <p>
            Dejanos tus comentarios. Su dirección de correo electrónico no será publicada
          </p>
          <form className="contact-form">
            <textarea placeholder="Escribe tu comentario aquí..." rows="10" required></textarea>
            <input type="text" placeholder="Nombre" required />
            <input type="email" placeholder="Correo Electrónico" required />
            <button type="submit" className="btn-enviar">PUBLICAR COMENTARIO</button>
          </form>
        </div>

       </div>
  );
};

export default Blog;
