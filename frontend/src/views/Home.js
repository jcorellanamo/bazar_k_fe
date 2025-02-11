// src/views/Home.js
import React from 'react';
import CoverCarousel from '../components/CoverCarousel';
import FeaturedProductsCarousel from '../components/FeaturedProductsCarousel';

const Home = () => {
  return (
    <div>
      <CoverCarousel />
      <FeaturedProductsCarousel />
    </div>
  );
};

export default Home;
