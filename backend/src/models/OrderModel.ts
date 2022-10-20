import mongoose, { Schema, model } from "mongoose";
import { IOrders } from "../api/interfaces";

const OrderSchema = new Schema({
  products: {
    type: Object
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: Array,
    default: 'registered'
  },
  shippingCost: {
    type: Number, 
    default: 0
  },
  total : {
    type: Number,
    default: 0
  },
  count: {
    type: Number,
    default: 0
  },
  date: {
    type: String,
    default: new Date().toISOString().split('T')[0]
  },
  address: {
    type: String,
  }
}, {minimize: false});

const OrderModel = model<IOrders>('Order', OrderSchema);

export default OrderModel;