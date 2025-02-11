// frontend/src/components/CoverCarousel.js
import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const CoverCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000, // Cambia cada 3 segundos (puedes ajustar)
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  // Asegúrate de colocar las imágenes en la carpeta public o importarlas
  const images = [
    '/images/cover1.jpg',
    '/images/cover2.jpg',
    '/images/cover3.jpg'
  ];

  return (
    <div>
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index}>
            <img src={img} alt={`cover-${index}`} style={{ width: '100%', height: 'auto' }} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CoverCarousel;
