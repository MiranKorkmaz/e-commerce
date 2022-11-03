import { ReactNode } from "react";

export type TCartItemProps = {
    _id: string
    quantity: number
};

export type TShoppingCartProps = {
    isOpen: boolean
};

export type TCartItem = {
    _id: string
    quantity: number
    name?: string
    manufacturer?: string
    image?: string
    price?: number
    weight?: number
};

export type TCartItemArray = {
    _id: string
    quantity: number
    name?: string
    manufacturer?: string
    image?: string
    price?: number
    weight?: number;
};

export type TCartObject = {
    userId?: string
    cartItems?: TCartItemArray[]
};

export type TShoppingCartProviderProps = {
    children: ReactNode
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
};