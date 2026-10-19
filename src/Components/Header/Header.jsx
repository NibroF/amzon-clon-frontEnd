import React,{useContext} from 'react';
import classes from "./header.module.css";
import {Link} from "react-router-dom";
import { SlLocationPin } from 'react-icons/sl';
import { BsSearch } from 'react-icons/bs';
import { BiCart } from 'react-icons/bi';
import LowerHeader from './LowerHeader';
import {DataContext} from "../../Components/DataProvider/DataProvider"
import { auth } from '../../Utility/firebase';
function Header() {
  const [{basket,user},dispatch]=useContext(DataContext)
const totalItem = basket?.reduce((amount, item) => {
  return (item.amount || 1) + amount;
}, 0);
  
  return (
    <section    className={classes.fixed}>
      <div className={classes.header__container}>
        {/* 1. Logo */}
        <div className={classes.logo__container}>
          <Link to="/">
            <img 
              src="https://w7.pngwing.com/pngs/832/820/png-transparent-amazon-com-logo-retail-others-thumbnail.png" 
              alt="amazon logo" 
            />
          </Link>
        </div>

        {/* 2. Delivery Location */}
        <div className={classes.delivery}>
          <span>
            <SlLocationPin />
          </span>
          <div>
            <p>Delivered to</p>
            <span>Ethiopia</span>
          </div>
        </div>

        {/* 3. Search Bar */}
        <div className={classes.search}>
          <select name="" id="">
            <option value="">All</option>
          </select>
          <input type="text" placeholder="Search Amazon" />
          <BsSearch size={38} />
        </div>

        {/* 4. Right Side Navigation */}
        <div className={classes.order__container}>
          {/* Language Selector */}
          <Link to="/" className={classes.language}>
            <img 
              src="https://w7.pngwing.com/pngs/756/466/png-transparent-united-state-of-america-flag-flag-of-the-united-states-decal-us-flag-flag-text-rectangle-thumbnail.png" 
              alt="US Flag" 
            />
            <select name="" id="">
              <option value="">EN</option>
            </select>
          </Link>

          {/* Account & Sign In */}
        <Link to={!user ? "/auth" : "#"}>
            <div>
              <div>
                {
                  user?(
                  <>
                  <p>Hello, {user?.email?.split("@")[0]}</p>
                   <span onClick={()=>auth.signOut()}>Sign Out</span>
                   </>
                   ):
                
                   
                   (
                       <>
                     <p>Hello, Sign In</p>
                      <span>Account & Lists</span>
                     </>
                    
                  )
                 
                }
                
              </div>
             
           
            </div>
          </Link>

          {/* Returns & Orders */}
          <Link to="/orders">
            <div>
              <p>Returns</p>
              <span>& Orders</span>
            </div>
          </Link>

          {/* Cart */}
          <Link to="/cart" className={classes.cart}>
            <BiCart size={35} />
            <span>{totalItem }</span>
          </Link>
        </div>
      </div>
    
      <LowerHeader />
     
    </section>
    
  );
}

export default Header;