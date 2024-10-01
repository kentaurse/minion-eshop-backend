const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleCategorySchema = new Schema({
title: {
        type: String,
        required: true
    },
    parentId: {
        type: Schema.Types.ObjectId,
        ref: "ArticleCategory"
    },
    idPath: {
        type: String
    },
    parentNum: {
        type: String
    },
    num: {
        type: String
        
    },
    numPath: {
        type: String
    },
    del: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
})

module.exports = mongoose.model("ArticleCategory", ArticleCategorySchema)