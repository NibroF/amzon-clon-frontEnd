import React, { useState, useEffect } from 'react'
import ProductCard from './ProductCard'
import axios from 'axios'
import classes from './product.module.css'
import Loader from '../Layout/Loading/Loader'

const Product = () => {
  // 1. State variable is named `products` (plural)
  const [products, setProducts] = useState([])
   const [isLoading,setIsLoading]=useState(false)
  
  useEffect(() => {
     setIsLoading(true)
    axios
      .get('https://fakestoreapi.com/products')
      .then((res) => {
        setProducts(res.data)
        setIsLoading(false)
      })
      .catch((err) => {
        console.error("Error fetching products:", err)
        setIsLoading(false)
      })
  }, [])

  return (
    <> 
    {isLoading?(<Loader/>):( <section className={classes.products__container}>
     
      {products && products.map((singleProduct) => {
        return <ProductCard  renderAdd={true} product={singleProduct} key={singleProduct.id
          
        } />
      })}
    </section> 
    
    )}
     </>
   )}
   
  


export default Product