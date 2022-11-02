import React, { ReactNode } from "react";

export default interface IProductItem {
    quantity: ReactNode;
    _id?: string,
    name: string,
    description: string,
    price: number,
    manufacturer: string,
    weight: number,
    category: string,
    pictures: string[]
};

export interface ISearch {
    setSearch: React.Dispatch<React.SetStateAction<string>>
}

export interface IAllProductsContext {
    allProducts: IProductItem[]
}

export type TCartItem = {
    _id: string
    quantity: number
    name?: string
    manufacturer?: string
    image?: string
    price?: number
    weight?: number
};

// This is the type of const [cartItems, setCartItems]
export type TCartItemArray = {
    _id: string
    quantity: number
};

// This is the type of object that contains username plus an array of TCartItem
export type TCartObject = {
    userId?: string
    cartItems?: TCartItemArray[]
}

export type TShoppingCartProviderProps = {
    children: ReactNode // ReactNode is the type the children property inside of React
};

export interface ICartContents {
      _id?: string
      cartItems?: TCartItem[]
      subTotal?: number
      shippingCost?: number
      total?: number
      userId?: string
};

export interface IUserCartContextValue {
    userCart: ICartContents | undefined;
    setUserCart: React.Dispatch<React.SetStateAction<ICartContents | undefined>>;
  } 