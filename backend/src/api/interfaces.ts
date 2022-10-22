import { Document } from "mongoose";
export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    cart: {
        [x: string]: number;
    };
    orders: IOrders[];
}

export interface ICart {
    total: number;
    count: number;
    productId: number;
}

export interface IOrders {
    products: IProduct;
    status: Array<string>;
    shippingCost: number;
    total: number;
    count: number;
    date: string;
    address: string;
}

export interface IProduct {
    name: string;
    description: string;
    price: number;
    manufacturer: string;
    weight: number;
    category: string;
    pictures: Array<string>;
}

export interface ICartProductItem {
    _id?: string, 
    quantity?: number, 
    name?: string, 
    manufacturer?: string, 
    image?: string
}

export interface ICartModel {
    _id?: string;
    cartItems?:ICartProductItem[];
    shippingCost: number
    subTotal: number
    total: number
    userId?: string;
}