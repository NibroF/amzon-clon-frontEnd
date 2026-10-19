import React from 'react'
import {ClipLoader} from "react-spinners"

const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems:"center",
        justifyContent: "center",
        height: "50vh"
       
      }}>
       <ClipLoader/>
    </div>
  )
}

export default Loader
