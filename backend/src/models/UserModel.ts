import mongoose, { Schema } from "mongoose";
import { IUser } from "../api/interfaces";


const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  cart: {
    type: Object,
    default: {
      total: 0,
      count: 0,
    },
  },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  token: { type: String },
});

UserSchema.pre("remove", function (next) {
  this.$model("Order").remove({ owner: this._id }, next);
});

const UserModel = mongoose.model<IUser>("User", UserSchema);

export default UserModel;
