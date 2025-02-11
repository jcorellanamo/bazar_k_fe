// frontend/src/components/FeaturedProductsCarousel.js
import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

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
    '/images/product1.jpg',
    '/images/product2.jpg',
    '/images/product3.jpg',
    '/images/product4.jpg',
    '/images/product5.jpg'
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center' }}>Productos Destacados</h2>
      <Slider {...settings}>
        {products.map((img, index) => (
          <div key={index}>
            <img src={img} alt={`product-${index}`} style={{ width: '100%', height: 'auto' }} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default FeaturedProductsCarousel;
