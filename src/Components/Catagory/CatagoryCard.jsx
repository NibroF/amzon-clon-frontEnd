import React from 'react';
import classes from './catagory.module.css';
import { Link } from 'react-router-dom';
const CatagoryCard = ({ data }) => {
  return (
    <div className={classes.catagory}>
      <Link to={`/catagory/${data.name}`}>
        <h2>{data?.title}</h2>
        <img src={data.imgLink} alt={data.title} />
        <p>Shop now</p>
      </Link>
    </div>
  );
};

export default CatagoryCard;