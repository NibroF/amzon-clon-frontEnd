import React from 'react'
import classes from "./productDetail.module.css"
import {useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import LayOut from '../../Components/Layout/LayOut'
import axios from 'axios'
import { productUrl } from '../../Api/endPoint'
import ProductCard from '../../Components/Product/ProductCard'
import Loader from '../../Components/Layout/Loading/Loader'



const ProductDetail = () => {
    const {productId}=useParams()
     const [product,setProducts]=useState({})
     const [isLoading,setIsLoading]=useState(false)
    
     useEffect(()=>{
         setIsLoading(true)
        axios.get(`${productUrl}/products/${productId}`)
        .then((res)=>{
            setProducts(res.data)
            setIsLoading(false)
        }).catch((err)=>{
            console.log(err)
            setIsLoading(false)
        })
     },[productId])
  return (
    <LayOut> 
        <div>
        
    { 
        isLoading?(<Loader/>):(
     <ProductCard  product={product}
       flex={true}
        renderDesc={true}
        renderAdd={true}
       />)
   
       }
        </div>
    </LayOut>

  
  )
}

export default ProductDetail
