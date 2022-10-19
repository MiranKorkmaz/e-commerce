import mongoose, { Schema } from "mongoose";

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
    type: String,
    required: [true, "can't be blank"]
  },
  category: {
    type: String,
    required: [true, "can't be blank"]
  },
  pictures: {
    type: Array,
    required: true
  }
}, {minimize: false});

const ProductModel = mongoose.model('Product', ProductSchema);

export const loadAllProducts = async () => {
    return ProductModel.find({}).sort({ timeStamp: -1 }).exec()
  };

export default ProductModel;