const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { model } = require("mongoose");

const RoomChattingSchema = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    users: [
      {
        userId: String,
      },
    ],
    messages: [
      {
        msgType: String, // NORMAL, FILE, EDITED, DELETED, USER_ADDED, USER_LEAVE, USER_REMOVED,
        creatorId: String, // Schema.Types.ObjectId
        content: String,
      },
    ],
    date: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("RoomChatting", RoomChattingSchema);

const init = async () => {
  
  const userModel = model("RoomChatting");
  var title = await userModel.find({ title: "General" }, "");
  var room = new userModel({
    title: "General",
    description: "Public Channel",
    date: new Date(),
  });
  if (!title[0]) room.save();
};

init();
