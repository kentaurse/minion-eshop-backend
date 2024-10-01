const mongoose = require("mongoose");
const Notification = require("../Models/NotificationModel");
const RoomChatting = require("../Models/Chatting/RoomChattingModel");
const GeneralChatting = require("../Models/Chatting/GeneralChattingModel")

var nameList = {};
var count = 0;
exports.setUser = (io, socket, data) => {
  if (data) {
    nameList[data.id] = socket;
  }
};

exports.newNotification = async (io, socket, data) => {
  const notification = new Notification({
    userName: data.user,
    product: data.product,
    price: data.price,
    quantity: data.quantity,
    description: `New sale created ($${data.price}) ${data.user} has sold ${data.quantity} of ${data.product}`,
    email: data.email,
  });
  notification.save();
  const res = await Notification.find({}).sort({ updatedAt: -1 });
  socket.broadcast.emit("S2C_NEW_NOTIFICATION", {
    message: `New sale created ($${data.price}) ${data.user} has sold ${data.quantity} of ${data.product}`,
    count: res.length,
  });
};

exports.newCreateRoom = async (io, socket, data) => {
  console.log(data);
  const roomChatting = new RoomChatting({
    title: data.title,
    description: data.description,
    creator: data.creator,
    date: data.date,
  });
  roomChatting.save();
  const res = await RoomChatting.find({});
  socket.emit("S2C_CREATE_NEW_GROUP", { res });
};

exports.getAllRooms = async (io, socket, data) => {
  const res = await RoomChatting.find({});
  socket.emit("S2C_CREATE_NEW_GROUP", { res });
};

exports.newPublicMessage = async (io, socket, data) => {
  const generalChatting = new GeneralChatting({
    senderId: data.id,
    content:data.content
  });
  generalChatting.save();
  const res = await GeneralChatting.aggregate([
    {$lookup: {
      from: "users",
      localField: "senderId",
      foreignField: "_id",
      as: "user",
    },}
  ])
  socket.broadcast.emit("S2C_NEW_PUBLIC_MESSAGE", { res });
  socket.emit("S2C_NEW_PUBLIC_MESSAGE", { res });
};

exports.getAllPublicMessage = async (io, socket, data) => {
  const res = await GeneralChatting.aggregate([
    {$lookup: {
      from: "users",
      localField: "senderId",
      foreignField: "_id",
      as: "user",
    },}
  ])
  socket.emit("S2C_NEW_PUBLIC_MESSAGE", { res });

};