import React, { createContext, ReactNode, useContext } from 'react'

type TShoppingCartProviderProps = {
    children: ReactNode
};

const ShoppingCartContext = createContext({});

export function useShoppingCart() {
    return useContext(ShoppingCartContext);
};

export function ShoppingCartProvider({ children }: TShoppingCartProviderProps) {
    return (
        <ShoppingCartContext.Provider value={{}}>
            {children}
        </ShoppingCartContext.Provider>
    ) 
};

