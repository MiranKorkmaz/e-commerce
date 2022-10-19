export interface IUserModel {
    [x: string]: any;
    _id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    cart?: ICart;
    orders?: IOrder[];
}

export interface ICart {
    products: IProduct[];
    total: number;
    count: number;
}

export interface IProduct {
    _id: string;
    name: string;
    price: number;
    count: number;
    image: string;
}

export interface IOrder {
    _id: string;
    products: IProduct[];
    owner: IUserModel;
    status: string;
    shippingCost: number;
    total: number;
    count: number;
    date: string;
    address: string;
}

