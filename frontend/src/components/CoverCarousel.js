import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const CoverCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const images = [
    '/images/cover1.jpg',
    '/images/cover2.jpg',
    '/images/cover3.jpg'
  ];

  return (
    <div style={{ position: 'relative', textAlign: 'center' }}>
      <div style={{ 
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
        zIndex: 2, 
        backgroundColor: 'rgba(255, 255, 255, 0.5)', 
        padding: '20px 40px', 
        borderRadius: '10px' 
      }}>
        <h1 className="display-1 fw-bold my-5" style={{ 
          color: 'black', 
          textShadow: '2px 2px 4px rgba(224, 215, 215, 0.9)', 
          margin: 0,
          fontSize: '10rem'
        }}>
          Bazar K-fe
        </h1>
      </div>
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index} style={{ position: 'relative' }}>
            <img src={img} alt={`cover-${index}`} style={{ width: '100%', height: 'auto', margin: '0 auto' }} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CoverCarousel;
