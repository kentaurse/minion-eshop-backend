const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GeneralChattingSchema = new Schema({
  
  senderId: {
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

module.exports = mongoose.model("GeneralChatting", GeneralChattingSchema);
