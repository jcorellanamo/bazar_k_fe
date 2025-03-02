import React from "react";
import "./Blogvista3.css"

const BlogVista3 = () => {
  return (
    <div className="blog-container">
      {/* Navbar */}
      {/* <Navbar /> */}

      {/* Encabezado */}
      <header className="blog-header">Bazar K-FE BLOG</header>

      {/* Sección de Imágenes */}
      <div className="blog-images">
        <img
          src="/images/03_BlogVista2.jpg"
          alt="Imagen 1"
          className="blog-image"
        />
        <img
          src="/images/03_BlogVista3.jpg"
          alt="Imagen 2"
          className="blog-image"
        />
      </div>

      {/* Sección de Texto en 3 Columnas */}
      <div className="blog-text-3">
        <div className="blog-text-column">
          <p>
          Cada 1 de octubre se celebra el Día Internacional del Café, una oportunidad para rendir homenaje a esta bebida que conecta a millones de personas en todo el mundo. Desde los pequeños agricultores hasta los baristas, este día reconoce el trabajo detrás de cada taza y nos invita a descubrir más sobre el fascinante mundo del café.
          </p>
          <h2>
          ¿Por qué celebrar el café?
          </h2>
          El café no es solo una bebida, es una experiencia que disfrutamos a diario. Algunas razones para celebrarlo incluyen:

        
          <p>
            <ul>
              <li>Diversidad de sabores: El café ofrece una amplia variedad de perfiles, desde notas afrutadas hasta toques achocolatados.</li>
              <li>1Conexión global: Nos conecta con culturas de todo el mundo, desde el espresso italiano hasta el café filtrado latinoamericano. </li>
              <li>Beneficios para la salud: Consumido con moderación, el café puede mejorar el estado de alerta y es una fuente rica en antioxidantes.</li>
            </ul>
          </p>

          
        </div>

        <div className="blog-text-column">
        <h3>Ideas para celebrar en este mes</h3>
          <p>
            <ul>
              <li>
              Prueba nuevas variedades: Descubre diferentes tipos de café en nuestra tienda online.
              </li>
              <li>
              Organiza una cata de café: Comparte la experiencia con amigos probando diferentes perfiles de sabor.
              </li>
              <li>
              Apoya el comercio justo: Opta por cafés de origen sostenible para apoyar a los pequeños productores.
              </li>
              En nuestro ecommerce, encontrarás una selección de cafés para todos los gustos, desde los más suaves hasta los más intensos.
         
            </ul>
          </p>
        </div>

        {/* <div className="blog-text-column">
          <p>
            <h3>Disfruta del Mejor Affogato </h3>
            

El affogato es la combinación perfecta de simplicidad y sabor. Con cualquiera de estos cafés Lavazza, puedes disfrutar de un postre espectacular que elevará tu experiencia con el café. ¡Descubre estas opciones en nuestra tienda online y empieza a preparar tu propio affogato hoy mismo!
           
          </p>
        </div> */}
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
          Dejanos tus comentarios. Su dirección de correo electrónico no será
          publicada
        </p>
        <form className="contact-form">
          <textarea
            placeholder="Escribe tu comentario aquí..."
            rows="10"
            required
          ></textarea>
          <input type="text" placeholder="Nombre" required />
          <input type="email" placeholder="Correo Electrónico" required />
          <button type="submit" className="btn-enviar">
            PUBLICAR COMENTARIO
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogVista3;
