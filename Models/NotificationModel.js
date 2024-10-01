const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const NotificationSchema = new Schema(
  {
    userName: {
      type: String,
    },
    description: {
      type: String,
    },
    email: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    price: {
      type: String,
    },
    product: {
      type: String,
    },
    quantity: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Notification", NotificationSchema);
