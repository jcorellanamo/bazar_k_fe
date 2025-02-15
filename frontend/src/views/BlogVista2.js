import React from "react";
import "./Blog.css";

const BlogVista2 = () => {
  return (
    <div className="blog-container">
      {/* Navbar */}
      {/* <Navbar /> */}

      {/* Encabezado */}
      <header className="blog-header">Bazar K-FE BLOG</header>

      {/* Sección de Imágenes */}
      <div className="blog-images">
        <img
          src="/images/02_card-img.png"
          alt="Imagen 1"
          className="blog-image"
        />
        <img
          src="/images/02_BlogVista2.jpg"
          alt="Imagen 2"
          className="blog-image"
        />
      </div>

      {/* Sección de Texto en 3 Columnas */}
      <div className="blog-text">
        <div className="blog-text-column">
          <p>
            Si eres un amante del café, el affogato es la mezcla perfecta entre
            un postre delicioso y una dosis de café espresso. En esta receta
            sencilla, verás cómo lograr este icónico postre italiano en pocos
            pasos y qué cafés de Lavazza son ideales para prepararlo.
          </p>
          <h2>
            Descubre el Affogato: Una Receta Sencilla para los Amantes del Café
          </h2>

          <h3>Ingredientes</h3>

          <p>
            <ul>
              <li>1 bola de helado de vainilla (o el sabor que prefieras) </li>
              <li>1 shot de espresso caliente </li>
            </ul>
          </p>

          <h3>Preparación</h3>
          <p>
            <ul>
              <li>
                Prepara el espresso: Asegúrate de que sea bien concentrado y
                esté caliente.
              </li>
              <li>
                Sirve el helado: Coloca una bola de helado en una copa o vaso
                pequeño.
              </li>
              <li>
                Vierte el espresso sobre el helado: Justo antes de servir,
                vierte el café sobre el helado para que se derrita ligeramente.
              </li>
              <li>Disfruta inmediatamente.</li>
            </ul>
          </p>
        </div>

        <div className="blog-text-column">
          {" "}
          <p>
            <h3>¿Qué café de Lavazza usar? </h3>
            Para un affogato increíble, el café que elijas es clave. Aquí te
            sugerimos algunas opciones de Lavazza que le aportarán sabores
            únicos:
            <ul>
              <li>
                Lavazza Gusto Forte: Este café tiene una intensidad fuerte,
                ideal si te gusta que el sabor del espresso sea dominante y
                complemente bien el dulzor del helado.
              </li>
              <li>
                Lavazza Crema e Aroma: Con un perfil balanceado, es perfecto si
                buscas una mezcla suave con cuerpo cremoso y toques aromáticos
                que realzan tanto el helado como el café.
              </li>
              <li>
                Lavazza Filtro Classico: Una opción más ligera pero con gran
                sabor, este café es ideal si prefieres un affogato menos
                intenso, pero igualmente delicioso.{" "}
              </li>
            </ul>
          
          </p>
        </div>

        <div className="blog-text-column">
          <p>
            <h3>Disfruta del Mejor Affogato </h3>
            

El affogato es la combinación perfecta de simplicidad y sabor. Con cualquiera de estos cafés Lavazza, puedes disfrutar de un postre espectacular que elevará tu experiencia con el café. ¡Descubre estas opciones en nuestra tienda online y empieza a preparar tu propio affogato hoy mismo!
           
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

export default BlogVista2;
