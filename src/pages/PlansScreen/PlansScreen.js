import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import './PlansScreen.css';
import { collection, getDocs, query, where, setDoc, doc, onSnapshot } from "firebase/firestore"; 
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { loadStripe } from '@stripe/stripe-js';

function PlansScreen() {
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    const subRef = getDocs(collection(db, 'customers', user.uid, 'subscriptions'))
      .then(querySnapshot => {
        querySnapshot.forEach(async (subscription) => {
          setSubscription({
            role: subscription.data().role,
            current_period_end: subscription.data().current_period_end.seconds,
            current_period_start: subscription.data().current_period_start.seconds,
          })
        })
    })
  }, [user.uid])
  console.log(subscription)

  useEffect(() => {
    const getProducts = async () => {
      const querySnapshot = await getDocs(query(collection(db, 'products'), where("active", "==", true)))
      const products = {};
      querySnapshot.forEach(async productDoc => {
        // console.log(productDoc.id)
        products[productDoc.id] = productDoc.data();
        const priceColRef = await getDocs(collection(db, `products`, productDoc.id, 'prices'))
        priceColRef.docs.forEach(price => {
          products[productDoc.id].prices = {
            priceId: price.id,
            priceData: price.data(),
          }
        })
      })
      setProducts(products);
    }
    getProducts();
  }, [])

  const loadCheckout = async (priceId) => {
    const orderDocRef = doc(collection(db, 'customers', user.uid, 'checkout_sessions'))
    const docRef = await setDoc(orderDocRef, {
      price: priceId,
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    });
    onSnapshot(orderDocRef, async (snap) => {
      const { error, sessionId } = snap.data();
      if (error) {
        alert(`An error occured: ${error.message}`);
      }
      if (sessionId) {
        const stripe = await loadStripe("pk_test_51Mqh9QJ0TqQG7TViE5RLNmvGII5MPx2aZ5yi2ZG0IIRqJfmQRkzzLuwWpGeInlDQdgJsaPYFfiyYKhGakthXI9WF002PNJ2N7s");
        stripe.redirectToCheckout({ sessionId });
      };
    })
  }
  
  return (
    <div className='plansScreen'>
      {Object.entries(products).map(([productId, productData]) => {
        // TODO add logic if user sub is active
        const isCurrentPackage = productData.name?.toLowerCase().includes(subscription?.role.concat(" plan"));
        return (
          <div
            className={`
              ${isCurrentPackage && "plansScreen__plan--disabled"} 
              plansScreen__plan`}
            key={productId}>
            <div className='plansScreen__info'>
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button onClick={() => !isCurrentPackage && loadCheckout(productData.prices.priceId)}>
              {isCurrentPackage ? "Current Package" : "Subscribe"}  
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default PlansScreen;