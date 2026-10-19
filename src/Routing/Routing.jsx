import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from '../Pages/Landing/Landing'
import Auth from '../Pages/Auth/Auth'
import Cart from '../Pages/Cart/Cart'
import Orders from '../Pages/Orders/Orders' 
import Results from '../Pages/Results/Results'   
import ProductDetail from '../Pages/ProductDetail/ProductDetail'   
import Payment from '../Pages/Payment/Payment'   
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js'; 
import ProtectedRoute from '../Components/ProtectedRoute/ProtectedRoute'   

const stripePromise = loadStripe('pk_test_51UBMDBDVvjkj0mLS8MLgViI4slU1kbz71nCOYuAXwFyGSjDlVUGObhyLIuvdqTo1gRD5EV3VUmadaCmrTB79bHTG00CCWxUWZY');

const Routing = () => {
  return (
    <Router>    
      <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/auth" element={<Auth/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/products/:productId" element={<ProductDetail/>}/>
          <Route path="/categories/:categoryName" element={<Results/>}/>
          <Route path="/orders" element={
              <ProtectedRoute
                msg={"You must be log in to access your orders."}
                redirect={"/orders"}
              >
                   <Orders/>
              </ProtectedRoute>
            
           }/>
          
          {/* Protected Payment Route */}
          <Route 
            path="/payments"
            element={
              <ProtectedRoute
                msg={"You must be logged in to access the payment page."}
                redirect={"/payments"}
              >
                <Elements stripe={stripePromise}>
                  <Payment />
                </Elements>
              </ProtectedRoute>
            }
          />
      </Routes>
    </Router>
  )
}

export default Routing