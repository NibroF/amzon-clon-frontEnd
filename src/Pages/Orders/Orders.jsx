import React, { useContext, useEffect, useState } from "react";
import LayOut from "../../Components/Layout/LayOut";
import classes from "./orders.module.css";
import { db } from "../../Utility/firebase";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import ProductCard from "../../Components/Product/ProductCard";

function Orders() {
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      const ordersRef = collection(db, "users", user.uid, "orders");
      const q = query(ordersRef, orderBy("created", "desc"));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        setOrders(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });

      return () => unsubscribe();
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.orders__container}>
          <h2>Your Orders</h2>
          {orders?.length ==0 && (
            <div style={{ padding: "20px" }}>
              You don't have any orders yet.
            </div>
          )}
          
          {orders?.length === 0 && (
            <div style={{ padding: "20px" }}>You have no orders yet.</div>
          )}

          <div>
            {orders?.map((eachOrder) => {
              return (
                <div key={eachOrder.id}>
                  <hr />
                  <p>Order ID: {eachOrder.id}</p>
                  
                  {eachOrder?.data?.basket?.map((item) => {
                    return (
                      <ProductCard
                        flex={true}
                        product={item}
                        key={item.id}
                        renderAdd={false}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Orders;