/* eslint-disable @typescript-eslint/no-unused-expressions */
import axios from 'axios';
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserCartContext } from '../App';
import GetToken from '../components/GetToken';
import { useShoppingCart } from '../context/ShoppingCartContext';

axios.defaults.baseURL =
    process.env.REACT_APP_SERVER_PORT || "http://localhost:4000";

export const OrderPage = () => {
    const [, setOrder] = useState([]);
    const [owner, setOwner] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate();
    let loggedUserId: string | undefined = undefined;

    const { cartItems } = useShoppingCart();
    const { userCart } = useContext(UserCartContext);
    if (userCart) userCart.cartItems = cartItems;

    const placeOrder = async () => {
        const { data } = await axios.post("/orders", {
            products: cartItems,
            owner: loggedUserId,
            status: "Registered",
            shippingCost: userCart?.shippingCost,
            total: userCart?.total,
            date: new Date(),
            address: address,
        });
        setOrder(data);
        navigate(`/orders/${loggedUserId}`);
        window.location.reload();
    };

    const token = localStorage.getItem("backend3-ecom");
    loggedUserId = GetToken().user_id;

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


    useEffect(() => {
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

