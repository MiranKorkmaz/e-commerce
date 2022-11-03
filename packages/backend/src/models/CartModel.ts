import { Schema, model } from "mongoose";
import { ICartModel } from "../interfaces/interfaces";

const CartSchema = new Schema({
    cartItems: {
        type: Object
    },
    shippingCost: {
        type: Number,
        default: 0
    },
    subTotal: {
        type: Number,
        default: 0
    },
    total: {
        type: Number,
        default: 0
    },
    userId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: new Date().toISOString().split('T')[0],
    }
}, { timestamps: true });

const CartModel = model<ICartModel>('Cart', CartSchema);

export default CartModel;