/* eslint-disable @typescript-eslint/no-unused-expressions */
import { getSuggestedQuery } from '@testing-library/react';
import axios from 'axios';
import { response } from 'express';
import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { json } from 'stream/consumers';
import { UserCartContext } from '../App';
import { ShoppingCart } from '../components/ShoppingCart';
import { useShoppingCart } from '../context/ShoppingCartContext';
import IProductItem from '../interfaces/product-item';

axios.defaults.baseURL =
process.env.REACT_APP_SERVER_PORT || "http://localhost:4000";


export const OrderPage = () => {

  const [, setOrder] = useState([]);
  const [products, setProducts] = useState<IProductItem[]>([]);
  const [owner, setOwner] = useState("");
  const [shippingCost, setShippingCost] = useState(0);
  const [status, setStatus] = useState("");
  const [address, setAddress] = useState("");
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  let loggedUserId: string | undefined = undefined;
  
  
  const {cartItems} = useShoppingCart();
  const {userCart, setUserCart } = useContext(UserCartContext);
  if(userCart) userCart.cartItems = cartItems;


  
  const placeOrder = async () => {
    const { data } = await axios.post("/orders", {
         products: cartItems,
         owner: loggedUserId,
         status: "Registered",
         shippingCost: userCart?.shippingCost,
         total: userCart?.total,
        //  count: userCart.,
         date: new Date(),
         address: address,
      });
      setOrder(data);
      navigate(`/orders/${loggedUserId}`);
      window.location.reload();
  };



  const token = localStorage.getItem("backend3-ecom");
    if (token) {
        const decodeJWT = (token: string) => {
            const base64Url = token.split(".")[1];
            const base64 = base64Url.replace("-", "+").replace("_", "/");
            return JSON.parse(window.atob(base64));
        };
        loggedUserId = decodeJWT(token).user_id;
      }



      const getUser = async () => {
        try {
          const response = await axios.get(`/users/user/${loggedUserId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setOwner(`${response.data.firstName} ${response.data.lastName}`);
          setAddress(response.data.address);
        } catch (error) {
          console.log(error);
        }
      };
      

  useEffect (() => {
    if (token) {
    getUser();
    }
  }, []);


  return (
    <div>
      <h1>Order Page</h1>

      <div>
        <br />
        {cartItems.map((product) => (
          <div key={product._id}>
            <h3>{product.name}</h3>
            <p>Price: {product.price}</p>
            <p>Quantity: {product.quantity}</p>
            <p>Total: {product.price && product.price * product.quantity}</p>
          </div>
        ))}
        <p>Address: {address}</p>
    
    <button onClick={placeOrder}>BUY</button>
      </div>
    </div>
  );
};

