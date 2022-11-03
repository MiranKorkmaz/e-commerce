import axios from 'axios';
import { parse } from 'node:path/win32';
import React, { useEffect, useState } from 'react'
import { AllProductsContext } from '../App';


axios.defaults.baseURL =
process.env.REACT_APP_SERVER_PORT || "http://localhost:4000";

type Order = {
    _id: string;
    products: Array<{ name: string, quantity: number, price: number}>;
    owner: string;
    status: string;
    shippingCost: number;
    total: number;
    count: number;
    date: Date;
    address: string;
}


export const OrdersMadePage = () => {

  const [orders, setOrders] = useState<Order[]>([]);

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

    const getOrder = async () => {
      const { data } = await axios.get(`/orders/${loggedUserId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(data);
      console.log(data);
    };





// useEffect(() => {
//       getOrder();
// }, []);



  return (
    <div>
      <h1>Orders Made</h1>
      <div> 

        {orders.map((order) => (
          <div key={order._id}>
            <h2>Order: {order._id}</h2>
            
            <p>Products: {order.products.map((product) => (
              <div key={product.name}>
                <ul>
                <li>{product.name} - {product.quantity} x ${product.price} </li>
                </ul>
              </div>
            ))} </p>

            <p>Status: {order.status}</p>
            <p>Shipping Cost: {order.shippingCost}</p>
            <p>Total: {order.total}</p>
            <p>Address: {order.address}</p>
            </div>
        ))}
      
      </div>
      <button onClick={getOrder}></button>
    </div>
  );
};

