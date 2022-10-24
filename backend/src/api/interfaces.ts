import { Document, Model } from "mongoose";
export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    cart: ICart;
    orders: IOrders[];
    token: string;
}

// export interface IUser {
//     firstName: string;
//     lastName: string;
//     email: string;
//     password: string;
//     cart: ICart;
//     orders: IOrders[];
//     token: string;
// }


export interface ICart {
    total: number;
    count: number;
    [productId: string]: number;
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