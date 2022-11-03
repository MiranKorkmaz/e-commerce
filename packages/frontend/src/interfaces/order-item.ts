export type Order = {
    _id: string;
    products: Array<{ name: string, quantity: number, price: number }>;
    owner: string;
    status: string;
    shippingCost: number;
    total: number;
    count: number;
    date: Date;
    address: string;
}