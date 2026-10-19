import React, { useContext } from 'react'
import CurrencyFormat from '../CurrencyFormat/CurrencyFormat'
import { Rating } from '@mui/material'
import classes from './product.module.css'
import { Link } from 'react-router-dom'
import {DataContext} from "../DataProvider/DataProvider"
import {Type} from "../../Utility/action.type"

const ProductCard = ({ product, flex,renderDesc,renderAdd=true  }) => {
  if (!product) return null

  const { title, image, price, rating, id,description} = product
  const [{basket},dispatch]=useContext(DataContext)

  

const addToCart = () => {
  dispatch({
    type: Type.ADD_TO_BASKET,
    item: {
      id,
      title,
      image,
      price,
      rating,
      description
    }
  });
};
  

  return (
    <div
      className={`${classes.card__container} ${
        flex ? classes.product__flexed : ''
      }`}
    >
      <Link to={`/products/${id}`}>
        <img src={image} alt={title} />
      </Link>

      <div>
        <h3>{title}</h3>
        {
        renderDesc && <div style={{maxWidth:"750px"
        }}>
          {description}
        </div>
        }

        <div className={classes.rating}>
          <Rating value={rating?.rate || 0} precision={0.1} readOnly />
          <small>{rating?.count || 0}</small>
        </div>

        <div>
          <CurrencyFormat amount={price} />
        </div>
     {renderAdd &&
        <button className={classes.button} onClick={addToCart}>Add to Cart</button>}
      </div>
    </div>
  )
}

export default ProductCard