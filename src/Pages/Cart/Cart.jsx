import React, { useContext } from 'react';
import LayOut from '../../Components/Layout/LayOut';
import { DataContext } from '../../Components/DataProvider/DataProvider';
import ProductCard from '../../Components/product/ProductCard';
import { Link } from 'react-router-dom';
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat';
import classes from "./cart.module.css";
import { Type } from "../../Utility/action.type"; 
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

function Cart() {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  
  const total = basket?.reduce((amount, item) => {
    const price = Number(item.price) || 0;
    const quantity = Number(item.amount) || 1;
    return price * quantity + amount;
  }, 0);

  const increment = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item
    });
  };

  const decrement = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id
    });
  };

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.cart__container}>
          <h2>Hello</h2>
          <h3>Your shopping basket</h3>
          <hr />
          {
            basket?.length === 0 ? (
              <p>Opps ! No item in your cart</p>
            ) : (
              basket?.map((item, i) => {
                return (
                  <section  key={i} className={classes.cart_product}>
                    <ProductCard
                      product={item}
                      renderDesc={true}
                      flex={true}
                      renderAdd={false}
                    />
                    
                    <div className={classes.btn_container}>
                      <button 
                        onClick={() => increment(item)} 
                        className={classes.btn}
                      >
                        <IoIosArrowUp size={20}/>
                      </button>
                      <span>{item.amount}</span>
                      <button 
                        onClick={() => decrement(item.id)} 
                        className={classes.btn}
                      >
                        <IoIosArrowDown size={20}/>
                      </button>
                    </div>
                  </section>
                );
              })
            )
          }
        </div>
        
        <div>
          {basket?.length !== 0 && (
            <div className={classes.subtotal}>
              <div>
                <p>
                  Subtotal ({basket?.reduce((sum, item) => sum + (item.amount || 1), 0)} items)
                </p>
                <CurrencyFormat amount={total} />
              </div>
              <span>
                <input type="checkbox" />
                <small>This order contains a gift</small>
              </span>
              <Link to="/payments">Continue to checkout</Link>
            </div>
          )}
        </div>
      </section>
    </LayOut>
  );
}

export default Cart;