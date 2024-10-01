const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    thumbnail: [{
      type: String,
    }],
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    price: {
      type: Number,
      trim: true,
      required: true,
    },
    quantity: {
      type: Number,
      trim: true,
      required: true,
    },
    discount: {
      type: Number,
      trim: true,
      required: true,
    },
    sold: {
      type: Number,
      trim: true,
      default: "0",
    },
    remain: {
      type: Number,
      trim: true,
    },
    deleted: {
      type: Boolean,
      trim: true,
      default: false
    },
    review: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        rate: {
          type: Number,
        },
        comment: {
          type: String,
        },
        delete: {
          type: Boolean,
          default: false,
        },
        date:{
          type: Date,
          default: Date.now()
        }
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
