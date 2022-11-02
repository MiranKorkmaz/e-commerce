/* eslint-disable @typescript-eslint/no-unused-expressions */
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

axios.defaults.baseURL =
process.env.REACT_APP_SERVER_PORT || "http://localhost:4000";


export const OrderPage = () => {

  const [products, setProducts] = useState([]);
  const [owner, setOwner] = useState("");
  const [shippingCost, setShippingCost] = useState(0);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState("");
  const [count, setCount] = useState(0);
  // const [date, setDate] = useState("");
  const [address, setAddress] = useState("");
  

  const getOrder = async () => {
    try {
      const response = await axios.get(`/orders`, {
        // params: {
        //   owner: owner,
        // },
      });
      setProducts(response.data.products);
      setOwner(response.data.owner),
      setShippingCost(response.data.shippingCost),
      setTotal(response.data.total),
      setStatus(response.data.status),
      setCount(response.data.count),
      // setDate(response.data.date),
      setAddress(response.data.address),
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect (() => {
    getOrder();
  }, []);


  return (
    <div>
      <h1>Order Page</h1>

      <div>
        <br />
        <div>
          <h2>Order</h2>
          <p>Products: {products}</p>
          <p>Owner: {owner}</p>
          <p>Shipping Cost: {shippingCost}</p>
          <p>Total: {total}</p>
          <p>Status: {status}</p>
          <p>Count: {count}</p>
          <p>Address: {address}</p>
    </div>
      </div>
    </div>
  );
};
