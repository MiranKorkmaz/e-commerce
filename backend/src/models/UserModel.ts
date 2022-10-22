import mongoose, { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
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
  cart: {
    type: Object,
    default: {
      total: 0,
      count: 0,
    },
  },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
});


UserSchema.methods.toJSON = function(){
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  return userObject;
}

//before saving => hash the password
UserSchema.pre('save', function (next) {
  const user = this;
  if(!user.isModified('password')) return next();
  bcrypt.genSalt(10, function(err, salt){
    if(err) return next(err);
    bcrypt.hash(user.password, salt, function(err, hash){
      if(err) return next(err);
      user.password = hash;
      next();
    })
  })

})

UserSchema.pre('remove', function(next){
  this.$model('Order').remove({owner: this._id}, next);
})

const UserModel = mongoose.model<IUser>('User', UserSchema);

export default UserModel;
