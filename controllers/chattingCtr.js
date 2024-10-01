const User = require("../Models/UserModel");
const GeneralChatting = require("../Models/Chatting/GeneralChattingModel")
const PrivateChatting = require("../Models/Chatting/PrivateChattingModel")
const RoomChatting    = require("../Models/Chatting/RoomChattingModel")


exports.getAllChatMsgs = async (req, res) => {
    ChatUser.find()
        .then((user)=>{
            if(!user){return res.status(404).json({message:"There is no User!"})};
            res.status(200).json({
                user:msg
                .filter((item)=>{
                    item.private == false
                })
            })
        });
};

exports.getAllChatUser = async (req, res) => {
    try {
        const allUser = await User.find().sort({ firstName: -1 });
        return res.status(200).json({
          message: "Get all users successfully!",
          users: allUser,
        });
      } catch (error) {
        return res.status(500).json({
          message: error.message,
        });}
};