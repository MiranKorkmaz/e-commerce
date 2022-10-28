import mongoose, { DocumentDefinition, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "../api/interfaces";
import jwt from 'jsonwebtoken';


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


// UserSchema.methods.generateAuthToken = async function() {
//   const user = this;
//   const token = jwt.sign({ _id: user._id.toString() }, 'thisismykey');
//   user.tokens = user.tokens.concat({ token });
//   await user.save();
//   console.log(`UserSchema.generateAuthToken with token: ${token}`);
//   return token;
// };

// UserSchema.statics.findByCredentials = async function(email, password) {
//   const user = await this.findOne({ email });
//   console.log(`UserSchema.findByCredentials with email: ${email}`);
//   if (!user)
//       throw new Error('Unable to login');

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch)
//       throw new Error('Unable to login');

//   return user;
// };

// UserSchema.methods.toJSON = function(){
//   const user = this;
//   const userObject = user.toObject();
//   delete userObject.password;
//   return userObject;
// }


//before saving => hash the password
// UserSchema.pre('save', function (next) {

//   const user = this;

//   if(!user.isModified('password')) return next();

//   bcrypt.genSalt(10, function(err, salt){
//     if(err) return next(err);

//     bcrypt.hash(user.password, salt, function(err, hash){
//       if(err) return next(err);

//       user.password = hash;
//       next();
//     })

//   })

// })

UserSchema.pre('remove', function(next){
  this.$model('Order').remove({owner: this._id}, next);
})


// UserSchema.statics.login = async function (email, password) {
//   const user = await this.findOne({ email });
//   if (user && await bcrypt.compare(password, user.password)) {
//     return user;
//   }
//   return null;
// };


const UserModel = mongoose.model<IUser>('User', UserSchema);

export default UserModel;


