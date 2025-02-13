// frontend/src/components/FeaturedProductsCarousel.js
import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./FeaturedProductsCarousel.css";


const FeaturedProductsCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000, // Cambia cada 5 segundos
    speed: 500,
    slidesToShow: 3,      // Mostrar varios productos a la vez (ajusta según diseño)
    slidesToScroll: 1
  };

  const products = [
    '/productos/01_productos.png',
    '/productos/02_productos.png',
    '/productos/03_productos.png',
    '/productos/04_productos.png',
    '/productos/05_productos.png',
    '/productos/06_productos.png',
    '/productos/07_productos.png',
    
  ];

  return (
    <div className="carousel-container">
    <h2 className="carousel-title">Productos Destacados</h2>
    <Slider {...settings}>
      {products.map((img, index) => (
        <div key={index} className="carousel-item">
          <img src={img} alt={`product-${index}`} />
        </div>
      ))}
    </Slider>
  </div>
  
  );
};

export default FeaturedProductsCarousel;
