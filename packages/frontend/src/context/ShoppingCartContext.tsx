import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ShoppingCart } from '../components/ShoppingCart';
import { TShoppingCartProviderProps, TCartItemArray, ICartContents } from "../interfaces/cart-item";

type ShoppingCartContext = {
    openCart: () => void
    closeCart: () => void
    getItemQuantity: (_id: string) => number
    increaseCartQuantity: (_id: string) => void
    decreaseCartQuantity: (_id: string) => void
    removeFromCart: (_id: string) => void
    cartQuantity: number
    cartItems: TCartItemArray[]
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
    return useContext(ShoppingCartContext);
};
export function ShoppingCartProvider({ children }: TShoppingCartProviderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState<TCartItemArray[]>([]);

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

    let url = `${process.env.REACT_APP_SERVER_PORT}/cart/${loggedUserId}`

    const createNewUserCart = async (userId: string | undefined) => {
        const response: ICartContents = await axios.post(`${process.env.REACT_APP_SERVER_PORT}/cart/${userId}`, { userId });
        return response;
    };

    const fetchUserCart = async () => {
        console.log("entered fetchUserCart()");
        const response = await axios.get(`${url}`);
        if (!response.data.userCart) {
            createNewUserCart(loggedUserId);
        }
        else if (loggedUserId && !response.data.userCart.cartItems) {
            createNewUserCart(loggedUserId);
        }
        else {
            await setCartItems(response.data.userCart.cartItems);
        }
    };

    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0);

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    function getItemQuantity(_id: string) {
        return cartItems.find(item => item._id === _id)?.quantity || 0;
    };

    function increaseCartQuantity(_id: string) {
        setCartItems(currItems => {
            if (currItems.find(item => item._id === _id) == null) {
                return [...currItems, { _id, quantity: 1 }]
            }
            else {
                return currItems.map(item => {
                    if (item._id === _id) {
                        return { ...item, quantity: item.quantity + 1 };
                    }
                    else {
                        return item;
                    }
                })
            }
        })
    };

    function decreaseCartQuantity(_id: string) {
        setCartItems(currItems => {
            if (currItems.find(item => item._id === _id)?.quantity === 1) {
                return currItems.filter(item => item._id !== _id);
            }
            else {
                return currItems.map(item => {
                    if (item._id === _id) {
                        return { ...item, quantity: item.quantity - 1 };
                    }
                    else {
                        return item;
                    }
                })
            }
        })
    };

    function removeFromCart(_id: string) {
        setCartItems(currItems => {
            return currItems.filter(item => item._id !== _id);
        })
    };

    useEffect(() => {
        if (loggedUserId) {
            fetchUserCart();
        }
    }, [token]);

    return (
        <ShoppingCartContext.Provider value={{
            getItemQuantity,
            increaseCartQuantity,
            decreaseCartQuantity,
            removeFromCart,
            openCart,
            closeCart,
            cartItems,
            cartQuantity
        }}>
            {children}
            <ShoppingCart isOpen={isOpen} />
        </ShoppingCartContext.Provider>
    )
};
