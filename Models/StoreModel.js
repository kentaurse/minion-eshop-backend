const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const storeSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    product: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    ],
    manager: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    deleted: {
      type: Boolean,
      trim: true,
      default: false
    },
  },
  {
    timestamps: true,
  },
 
);

module.exports = mongoose.model("Store", storeSchema);
