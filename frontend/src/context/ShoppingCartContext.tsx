import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ShoppingCart } from '../components/ShoppingCart';
import { TShoppingCartProviderProps, TCartItemArray } from "../interfaces/product-item";

// What are the children we need to have in the Provider?
type ShoppingCartContext = {
    openCart: () => void
    closeCart: () => void
    getItemQuantity: (_id: string) => number //Searches for a product by _id in our cart and returns its quantity
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

// This function implements the Provider portion of the Context
export function ShoppingCartProvider({ children }: TShoppingCartProviderProps) {
    const [isOpen, setIsOpen] = useState(false);
    
    const [cartItems, setCartItems] = useState<TCartItemArray[]>([]); // this is where all of our cart information is stored

    // Fetch specific user's cart data
    let loggedInUser:string | undefined = undefined
    loggedInUser = "mock-user-id" // Enable when we have completed login functionality - Sets the username attached to the Cart to the logged-in user's username
    
    let url = `${process.env.REACT_APP_SERVER_PORT}/cart/${loggedInUser}`
    
    const fetchUserCart = async () => {
        const response = await axios.get(`${url}`);
        await setCartItems(response.data.userCart.cartItems);
    };

    // For each item in cartItems, take the item and its quantity and return a total quantity
    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0);

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    function getItemQuantity(_id: string) {
        return cartItems.find(item => item._id === _id)?.quantity || 0; // if this evaluates to something, get the quantity, if we have nothing, return 0
    };

    function increaseCartQuantity(_id: string) {
        setCartItems(currItems => {
            // if the item doesn't already exist in the cart (null), return an array with existing items and add 1 new item with _id, quantity.
            if(currItems.find(item => item._id === _id) == null) { 
                return [...currItems, {_id, quantity: 1}]
            } 
            // if the item already exists in the cart, retain the current item and its quantity and increase its quantity by 1.
            else {
                return currItems.map(item => {
                    if(item._id === _id){
                        return {...item, quantity: item.quantity + 1};
                    }
                    
                    // Return the item without any changes at all
                    else {
                        return item;
                    }
                })
            }
        })
    };

    function decreaseCartQuantity(_id: string) {
        setCartItems(currItems => {
            // if the quantity of the item that we find is 1, remove it
            if(currItems.find(item => item._id === _id)?.quantity === 1) { 
                return currItems.filter(item => item._id !== _id); // return a list of all items except the one we want to remove
            } 
            // if the item already exists in the cart, retain the current item and its quantity and decrease its quantity by 1.
            else {
                return currItems.map(item => {
                    if(item._id === _id){
                        return {...item, quantity: item.quantity - 1};
                    }
                    // Return the item without any changes at all
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
        if(loggedInUser) {
            fetchUserCart();
        }
    }, []);

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
            <ShoppingCart isOpen={isOpen}/>
        </ShoppingCartContext.Provider>
    ) 
};
