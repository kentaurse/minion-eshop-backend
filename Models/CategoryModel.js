const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    required: true,
  },
  deleted: {
    type: Boolean,
    trim: true,
    default: false
  }
}, {
    timestamps: true,
});

module.exports = mongoose.model("Category", categorySchema);
