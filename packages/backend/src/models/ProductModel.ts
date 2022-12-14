import mongoose, { Schema, connect, model } from "mongoose";
import { IProduct } from "../interfaces/interfaces";

const ProductSchema = new Schema({
    name: {
        type: String,
        required: [true, "can't be blank"]
    },
    description: {
        type: String,
        required: [true, "can't be blank"]
    },
    price: {
        type: Number,
        required: [true, "can't be blank"]
    },
    manufacturer: String,
    weight: Number,
    category: {
        type: String,
        required: [true, "can't be blank"]
    },
    pictures: {
        type: Array,
        required: true
    }
}, { minimize: false });

const ProductModel = model<IProduct>('Product', ProductSchema);

export const mongoDbSetUp = async (url: string) => {
    await connect(url)
}

export default ProductModel;