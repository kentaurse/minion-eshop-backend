const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CoinSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    coin: {
      type: Number,
    },
    receiver: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("coin", CoinSchema);
