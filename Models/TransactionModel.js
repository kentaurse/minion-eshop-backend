const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

const TransactionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      trim: true,
      ref: "User",
    },
    productId: {
      type: Schema.Types.ObjectId,
      trim: true,
      ref: "Product",
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      trim: true,
      ref: "Category",
    },
    quantity: {
      type: Number,
      maxlength: 500,
    },
    price: {
      type: Number,
      default: 0,
    },
    deleted: {
      type: Boolean,
      trim: true,
      default: false,
    },
    date: {
      type: Date,
      default: moment().format("MM/DD/YYYY HH:mm:ss"),
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Transaction", TransactionSchema);
