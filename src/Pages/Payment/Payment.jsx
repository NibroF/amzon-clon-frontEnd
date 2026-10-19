import React, { useContext, useState } from 'react';
import classes from "./payment.module.css";
import LayOut from "../../Components/Layout/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat';
import { axiosInstance } from "../../Api/axios";
import { db } from "../../Utility/firebase";
import { doc, setDoc, collection } from "firebase/firestore";
import { ClipLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import { Type } from '../../Utility/action.type';

function Payment() {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();

  const totalItem = basket?.reduce((amount, item) => {
    return (item.amount || 1) + amount;
  }, 0);

  const total = basket?.reduce((amount, item) => {
    const price = Number(item.price) || 0;
    const quantity = Number(item.amount) || 1;
    return price * quantity + amount;
  }, 0);

  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  // 🛡️ Bulletproof change handler to safely catch Stripe card errors
  const handleChange = (event) => {
    if (event && event.error) {
      setError(String(event.error.message));
    } else {
      setError(null);
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    // 🛡️ Prevent double-clicks / concurrent in-flight requests
    if (processing || !stripe || !elements) return;

    // 🛡️ Ensure user is authenticated before writing to Firestore
    if (!user || !user.uid) {
      setError("You must be logged in to place an order.");
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      // 1. Contact backend / emulator to get the client secret
      const response = await axiosInstance({
        method: "post",
        url: `/payment/create?total=${Math.round(total * 100)}`
      });

      const clientSecret = response.data?.clientSecret;

      if (!clientSecret) {
        throw new Error("Client secret is missing from the backend response!");
      }

      // 2. Confirm card payment with Stripe
      const cardElement = elements.getElement(CardElement);
      const confirmation = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            email: user?.email || "guest@example.com"
          }
        }
      });

      if (confirmation.error) {
        setError(String(confirmation.error.message));
        setProcessing(false);
        return;
      }

      if (!confirmation.paymentIntent) {
        throw new Error("Payment confirmation failed. Please try again.");
      }

      // 🛡️ 3. Sanitize IDs and Basket data to prevent Firestore type/undefined errors
      const userId = String(user.uid);
      const paymentId = String(confirmation.paymentIntent.id);

      const sanitizedBasket = basket.map(item => ({
        id: item.id || "unknown",
        title: item.title || "",
        price: Number(item.price) || 0,
        rating: Number(item.rating) || 0,
        image: item.image || "",
        amount: Number(item.amount) || 1
      }));

      // 4. Save order to Firestore safely
      const orderRef = doc(collection(db, "users", userId, "orders"), paymentId);
      await setDoc(orderRef, {
        basket: sanitizedBasket,
        amount: Number(confirmation.paymentIntent.amount),
        created: Number(confirmation.paymentIntent.created)
      });

      // 5. Empty the cart/basket
      dispatch({ type: Type.EMPTY_BASKET });

      setProcessing(false);

      // 6. Redirect to orders page
      navigate("/orders", {state: { msg:"you have placed new order"}});

    } catch (err) {
      console.log("payment error:", err);
      const errorMessage = err?.response?.data?.message || err?.message || "An unexpected error occurred.";
      setError(String(errorMessage));
      setProcessing(false);
    }
  };

  return (
    <LayOut>
      <div className={classes.payment__header}>
        Checkout ({totalItem}) items
      </div>

      <section className={classes.payment}>
        {/* Delivery Address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Los Angeles, CA</div>
          </div>
        </div>

        <hr />

        {/* Product Review */}
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard 
                product={item} 
                key={item.id} 
                flex={true} 
                renderAdd={false} 
              />
            ))}
          </div>
        </div>

        <hr />

        {/* Payment Method / Card Form */}
        <div className={classes.flex}>
          <h3>Payment methods</h3>
          <div className={classes.payment__card__container}>
            <div className={classes.payment__details}>
              <form onSubmit={handlePayment}>
                {error && <small style={{ color: "red", display: "block", marginBottom: "10px" }}>{error}</small>}
                <CardElement onChange={handleChange} />
                
                <div className={classes.payment__price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order |</p> <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit" disabled={processing || !stripe}>
                    {
                      processing ? 
                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p>please wait...</p>
                      </div> : "Buy Now"
                    }
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;