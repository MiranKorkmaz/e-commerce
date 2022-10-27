export interface TCartItem {
    _id: string
    quantity: number
    name?: string
    manufacturer?: string
    image?: string
    price?: number
    weight?: number
};
export interface ICartContents {
    _id?: string
    cartItems?: TCartItem[]
    subTotal?: number
    shippingCost?: number
    total?: number
    userId?: string
}

export interface IUserCartContextValueFinal {
    userCart: ICartContents | undefined;
    setUserCart: React.Dispatch<React.SetStateAction<ICartContents | undefined>>;
} 