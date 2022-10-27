import mongoose, { Schema, model } from "mongoose";
import { ICartModel } from "../api/interfaces";

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
  total : {
    type: Number,
    default: 0
  },
  // userId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true
  // },
  userId: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: new Date().toISOString().split('T')[0],
    // default: Date.now
  }
}, { timestamps: true });

const CartModel = model<ICartModel>('Cart', CartSchema);

export default CartModel;