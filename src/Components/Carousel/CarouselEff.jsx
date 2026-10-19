import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; 
import classes from './Carousel.module.css';
import { img } from './images/data';

const CarouselEff = () => {
  return (
    <div className={classes.hero__container}>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
      >
        {img.map((imgItemLink, index) => {
          return <img key={index} src={imgItemLink} alt="hero image" />;
        })}
      </Carousel>
      
      <div className={classes.hero__img}></div>
    </div> 
  );
};

export default CarouselEff;