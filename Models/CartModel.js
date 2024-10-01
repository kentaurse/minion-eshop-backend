const { Schema, model } = require("mongoose");
const { modelOption } = require("./config");
const cartSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        products: [{
            product: {
                type: Schema.Types.ObjectId,
                ref: "Product"
            },
            quantity: {
                type: Number,
            },
            delete:{
                type:Boolean,
                default:false
            }
        }],
        delete: {
            type: Boolean,
            default: false
        }
    },
    modelOption("cart")
);

module.exports = model("Cart", cartSchema);
