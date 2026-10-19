import React from 'react';
import CatagoryCard from './CatagoryCard';
import { categoryImage } from './catagoryFullInfos';
import classes from './catagory.module.css';

const Catagory = () => {
  return (
    <div className={classes.category__container}>
      {categoryImage.map((info, index) => (
        <CatagoryCard key={index} data={info} />
      ))}
    </div>
  );
};

export default Catagory;