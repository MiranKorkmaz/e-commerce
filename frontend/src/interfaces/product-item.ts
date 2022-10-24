import React, { DetailedHTMLProps, HTMLAttributes } from "react";

export default interface IProductItem {
    _id?: string,
    name: string,
    description: string,
    price: number,
    manufacturer: string,
    weight: number,
    category: string,
    pictures: string[]
};

export interface ISearchProduct {
    setSearch: React.Dispatch<React.SetStateAction<string>>
}