import React,{useContext, useEffect} from 'react'
import { DataContext } from './Components/DataProvider/DataProvider'
import "./App.css"
import Routing from './Routing/Routing'
import { Type } from './Utility/action.type'
import { auth } from './Utility/firebase'

const App = () => {
  const [{user},dispatch]=useContext(DataContext)
  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        // console.log(authUser)
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        })
      }
      else{
        dispatch({
          type: Type.SET_USER,
          user: null,
        })
      }
    
    })

  },[])
  return (
    <Routing />
  )
}

export default App