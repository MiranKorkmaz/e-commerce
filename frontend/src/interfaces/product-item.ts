import React from "react";

export interface IProductItem {
    _id?: string,
    name: string,
    description: string,
    price: number,
    manufacturer: string,
    weight: number,
    category: string,
    pictures: string[]
};

export interface IAllProductsContext {
    allProducts: IProductItem[]
}

export interface ISearch {
    setSearch: React.Dispatch<React.SetStateAction<string>>
}