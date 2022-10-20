import React, { createContext, ReactNode, useContext, useState } from 'react'

type TShoppingCartProviderProps = {
    children: ReactNode
};

type TCartItem = {
    _id: string
    quantity: number
};

type ShoppingCartContext = {
    openCart: () => void
    closeCart: () => void
    getItemQuantity: (_id: string) => number
    increaseCartQuantity: (_id: string) => void
    decreaseCartQuantity: (_id: string) => void
    removeFromCart: (_id: string) => void
    cartQuantity: number
    cartItems: TCartItem[]
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
    return useContext(ShoppingCartContext);
};

export function ShoppingCartProvider({ children }: TShoppingCartProviderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState<TCartItem[]>([]);
    // For each item in cartItems, take the item and its quantity and return a total quantity
    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0);


    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    function getItemQuantity(_id: string) {
        return cartItems.find(item => item._id === _id)?.quantity || 0; // if this evaluates to something, get the quantity, if we have nothing, return 0
    };

    function increaseCartQuantity(_id: string) {
        setCartItems(currItems => {
            // if the item doesn't already exist in the cart, add 1 item.
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
        </ShoppingCartContext.Provider>
    ) 
};

