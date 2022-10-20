import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

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

// UserSchema.statics.findByCredentials = async function(email, password) {
//     const user = await User.find({email});
//     if(!user) throw new Error('invalid credentials');
//     const isSamePassword = bcrypt.compareSync(password, user.password);
//     if(isSamePassword) return user;
//     throw new Error('invalid credentials');
//   }

UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  return userObject;
};

//   before saving => hash the password
UserSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

UserSchema.pre("remove", function (next) {
  this.$model("Order").remove({ owner: this._id }, next);
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
