import mongoose, { Schema } from "mongoose";
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
    validate: {
      validator: function (str: string) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(str);
      },
      message: (props: { value: string }) =>
        `${props.value} is not a valid email`,
    },
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



/*FROM BACKEND 2*/
UserSchema.pre(
  "save",
  async function(next) {
      const hash = await bcrypt.hash(this.password, 10)
      this.password = hash
      next()
  })

UserSchema.statics.login = async function(username, password) {
  const user = await this.findOne({username})
  if (user && await bcrypt.compare(password, user.password)) {
      return user
  }
  return null
}
/*FROM BACKEND 2*/


// UserSchema.statics.findByCredentials = async function(email, password) {
//     const user = await User.find({email});
//     if(!user) throw new Error('invalid credentials');
//     const isSamePassword = bcrypt.compareSync(password, user.password);
//     if(isSamePassword) return user;
//     throw new Error('invalid credentials');
//   }

// UserSchema.methods.toJSON = function () {
//   const user = this;
//   const userObject = user.toObject();
//   delete userObject.password;
//   return userObject;
// };

//   before saving => hash the password
// UserSchema.pre("save", function (next) {
//   const user = this;

//   if (!user.isModified("password")) return next();

//   bcrypt.genSalt(10, function (err, salt) {
//     if (err) return next(err);

//     bcrypt.hash(user.password, salt, function (err, hash) {
//       if (err) return next(err);

//       user.password = hash;
//       next();
//     });
//   });
// });

// UserSchema.pre("remove", function (next) {
//   this.$model("Order").remove({ owner: this._id }, next);
// });

const UserModel = mongoose.model<IUser>("User", UserSchema);

export default UserModel;
