const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { model } = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
  },
  role: {
    type: String,
  },
  store: {
    type: Schema.Types.ObjectId,
    ref: "Store",
  },

  phone: {
    type: String,
  },
  birthday: {
    type: String,
  },
  password: {
    type: String,
  },
  avatar: [
    {
      type: String,
    },
  ],
  money: {
    type: Number,
    default: 0,
  },
  bio: {
    type: String,
  },
  supportTeam: {
    type: String,
  },
  base: {
    type: String,
  },
  university: {
    type: String,
  },
  roomNumber: {
    type: String,
  },
  tokenCategory: {
    type: String,
  },
  walletAddress: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  count: {
    type: Number,
  },
  status: {
    type: Boolean,
  },
  permission: {
    type: Boolean,
    default: true,
  },
  delete: {
    type: Boolean,
    default: false,
  },
  favourite: [{
    type: Schema.Types.ObjectId,
    ref: "Product",
  }],
});

module.exports = mongoose.model("User", UserSchema);

const init = async () => {
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash("123456", salt);
  const userModel = model("User");
  var user = await userModel.find({ email: "Admin@gmail.com" }, "");
  var admin = new userModel({
    firstName: "Admin",
    lastName: "User",
    email: "Admin@gmail.com",
    password: password,
    role: "admin",
    permission: true,
  });
  if (!user[0]) admin.save();
};

init();
