import React from "react";
import { Link } from "react-router-dom";
import "./Art-Blog.css"; /* Ahora importamos el CSS */

const ArtBlog = () => {
  return (
    <div className="blog-container">
      {/* Navbar */}
      {/* <Navbar /> */}

      {/* Encabezado */}
      <header className="blog-header">Bazar K-FE BLOG</header>

      {/* Sección de Imágenes */}
      <div className="blog-images">
        <img src="/images/artblog_01.jpg" alt="Imagen 1" className="blog-image" />
        <img src="/images/artblog_02.jpg" alt="Imagen 2" className="blog-image" />
      </div>

      {/* Sección de Texto en 3 Card */}
      <div className="three-card-container">
        <h2>A r t í c u l o s_B a z a r_K-fe</h2>

        <div className="cards-wrapper">
          {/* Card 1 */}
          <div className="card">
            <img className="card-img-top" src="/images/01_card-img.png" alt="Card 1" />
            <div className="card-body">
                <h3>Noviembre 2024</h3>
              <h5 className="card-title">7 Razones Irresistibles para Disfrutar de tu Taza de Café Diaria</h5>
              <p className="card-text">
              Somos unos amantes del café y queremos compartir nuestra pasión contigo. Explora nuestro blog y descubre consejos prácticos, recomendaciones sobre distintos tipos de café y las mejores marcas.
              </p>
              <Link to="/vista1" className="btn btn-primary">Leer más</Link>
            </div>
          </div>

          {/* Card 2 */}
          <div className="card">
            <img className="card-img-top" src="/images/02_card-img.png" alt="Card 2" />
            <div className="card-body">
                <h3>Diciembre 2024</h3>
              <h5 className="card-title">Descubre el Affogato: Una Receta Sencilla para los Amantes del Café</h5>
              <p className="card-text">
                Si eres amante del café, el affogato es el postre perfecto que mezcla la dulzura del helado con la intensidad del espresso.
              </p>
              <Link to="/vista2" className="btn btn-primary">Leer más</Link>
            </div>
          </div>

          {/* Card 3 */}
          <div className="card">
            <img className="card-img-top" src="/images/03_card-img.png" alt="Card 3" />
            <div className="card-body">
                <h3>Enero 2025</h3>
              <h5 className="card-title">Día Internacional del Café: Celebrando Nuestra Pasión por el Café en Octubre</h5>
              <p className="card-text">
              Cada 1 de octubre se celebra el Día Internacional del Café, una oportunidad para rendir homenaje a esta bebida que conecta a millones de personas en todo el mundo. Desde los pequeños agricultores hasta los baristas, este día reconoce el trabajo detrás de cada taza y nos invita a descubrir más sobre el fascinante mundo del café.
              </p>
              <Link to="/vista3" className="btn btn-primary">Leer más</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtBlog;
