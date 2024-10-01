const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "ArticleCategory",
    },
    parentId: {
      type: String,
    },
    ancestorId: {
      type: Schema.Types.ObjectId,
    },
    files: [
      {
        type: Schema.Types.ObjectId,
        ref: "File",
      },
    ],
    view: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    like: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    unlike: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    del: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Article", articleSchema);
