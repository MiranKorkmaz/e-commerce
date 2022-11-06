import axios from 'axios';
import { useEffect, useState } from 'react'
import GetToken from '../components/GetToken';
import { Order } from '../interfaces/order-item';

axios.defaults.baseURL =
    process.env.REACT_APP_SERVER_PORT || "http://localhost:4000";

export const OrdersMadePage = () => {
    const [orders, setOrders] = useState<Order[]>([]);

    let loggedUserId: string | undefined = undefined;
    const token = localStorage.getItem("backend3-ecom");
    
    loggedUserId = GetToken().user_id;

    const getOrder = async () => {
        const { data } = await axios.get(`/orders/${loggedUserId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setOrders(data);
        console.log(data);
    };

    useEffect(() => {
        getOrder();
    }, []);

    return (
        <div>
            <h1>Orders Made</h1>
            <div>
                {orders.map((order) => (
                    <div key={order._id}>
                        <h2>Order number: {order._id}</h2>
                        <p>Products: {order.products.map((product) => (
                            <div key={product.name}>
                                <ul>
                                    <li>{product.name} - {product.quantity} x ${product.price} </li>
                                </ul>
                            </div>
                        ))} </p>
                        <p>Status: {order.status}</p>
                        <p>Shipping Cost: ${order.shippingCost}</p>
                        <p>Total: ${order.total}</p>
                        <p>Address: {order.address}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

