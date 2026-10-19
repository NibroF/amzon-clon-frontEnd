import React from 'react'
import classes from "./results.module.css"
import LayOut from '../../Components/Layout/LayOut'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import { productUrl } from '../../Api/endPoint'
import { useState,useEffect } from 'react'
import ProductCard from '../../Components/Product/ProductCard'
import Loader from '../../Components/Layout/Loading/Loader'
const Results = () => {
    const [results,setResults]=useState([])
    const [isLoading,setIsLoading]=useState(false)
       const {catagoryName} = useParams()
    useEffect(()=>{
        setIsLoading(true)
        axios.get(`${productUrl}/products/category/${catagoryName}`)
        .then((res)=>{
            setResults(res.data)
            setIsLoading(false)
        }).catch((err)=>{
            console.log(err)
            setIsLoading(false)
        })
    },[catagoryName])
        

    
    
  return (
    <LayOut>

        {isLoading?(<Loader/>):(  <section>      
        <h1 style={{padding:"30px"}}>Results</h1>
        <p style={{padding:"30px"}}>Catagory/{catagoryName}</p>
        <hr/>
        <div className={classes.product_container}>
            {
                results?.map((product)=>(
                    <ProductCard
                    key={product.id}
                    product={product}
                    renderAdd={true}
                    />
                ))
            }
            
        </div>
     </section>)}
   
    </LayOut>
  )
}

export default Results
