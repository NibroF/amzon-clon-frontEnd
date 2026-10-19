import React from 'react'
import Carousel from '../../Components/Carousel/CarouselEff'
import LayOut from '../../Components/Layout/LayOut'
import Catagory from '../../Components/Catagory/Catagory'
import Product from '../../Components/Product/Product'
// requires a loader    
const Landing = () => {
  return (
    <div>
        <LayOut> 
    <Carousel/>
    <Catagory/>
    <Product/>
           </LayOut>
       
    </div>
  )
}

export default Landing
