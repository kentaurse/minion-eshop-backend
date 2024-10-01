const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PrivateChattingSchema = new Schema({
  
  senderId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  receiveId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  content: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
},
{
  timestamps: true,
}
);

module.exports = mongoose.model("PrivateChatting", PrivateChattingSchema);
