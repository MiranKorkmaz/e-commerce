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

export type HomeProps = {
    allProducts: IProductItem[]
};