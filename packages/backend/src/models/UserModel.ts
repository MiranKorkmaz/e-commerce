import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces/interfaces";


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
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
    token: { type: String },
});

UserSchema.pre("remove", function (next) {
    this.$model("Order").remove({ owner: this._id }, next);
});

const UserModel = mongoose.model<IUser>("User", UserSchema);

export default UserModel;
