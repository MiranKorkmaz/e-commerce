/* eslint-disable @typescript-eslint/no-unused-expressions */
import { getSuggestedQuery } from '@testing-library/react';
import axios from 'axios';
import { response } from 'express';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import IProductItem from '../interfaces/product-item';

axios.defaults.baseURL =
process.env.REACT_APP_SERVER_PORT || "http://localhost:4000";


export const OrderPage = () => {

  const [products, setProducts] = useState<IProductItem[]>([]);
  const [owner, setOwner] = useState("");
  const [shippingCost, setShippingCost] = useState(0);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState("");
  const [count, setCount] = useState(0);
  const [address, setAddress] = useState("");
  
  let loggedUserId: string | undefined = undefined;

  const token = localStorage.getItem("backend3-ecom");
    if (token) {
        const decodeJWT = (token: string) => {
            const base64Url = token.split(".")[1];
            const base64 = base64Url.replace("-", "+").replace("_", "/");
            return JSON.parse(window.atob(base64));
        };
  
        loggedUserId = decodeJWT(token).user_id;
      }

      console.log(`loggedUserId);`, loggedUserId);
      console.log(`token);`, token);

      const getUser = async () => {
        try {
          const response = await axios.get(`/users/user/${loggedUserId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setOwner(response.data.firstName);
          setAddress(response.data.address);
        } catch (error) {
          console.log(error);
        }
      };

      const getOrder = async () => {
        try {
          const response = await axios.get(`/orders/${loggedUserId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setProducts(response.data.products);
          setShippingCost(response.data.shippingCost);
          setTotal(response.data.total);
          setStatus(response.data.status);
          setCount(response.data.count);
        } catch (error) {
          console.log(error);
        }
      };

      const deleteOrder = async () => {
        try {
          const response = await axios.delete(`/orders/${loggedUserId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response);
          window.location.reload();
        } catch (error) {
          console.log(error);
        }
      };


  useEffect (() => {
    if (token) {
    getUser();
    getOrder();
    }
  }, []);


  return (
    <div>
      <h1>Order Page</h1>

      <div>
        <br />
        <div>
          <h2>Order</h2>
          <>
          Products: {products.map((product) => (
            <div key={product._id}>
              <li>
              <h3>{product.name} x </h3>
              <p>${product.price} per item </p>
              </li>
            </div>
          ))}
          </>
          <br />
          <p>Owner: {owner}</p>
          <p>Shipping Cost: {shippingCost}</p>
          <p>Total: {total}</p>
          <p>Status: {status}</p>
          <p>Count: {count}</p>
          <p>Address: {address}</p>
    </div>
    <button>BUY</button>
    <br />
    <br />
    <button onClick={deleteOrder}>DELETE ORDER</button>
      </div>
    </div>
  );
};

