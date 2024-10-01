const CONSTS = require('./constants');
const chatEvents = require('./chatEvent');

module.exports = function (io, socket) {
 
  socket.on("C2S_MY_USER_INFO", data => chatEvents.setUser(io, socket, data));
  socket.on("C2S_NEW_NOTIFICATION", data => chatEvents.newNotification(io, socket, data));
  socket.on("C2S_CREATE_NEW_ROOM", data => chatEvents.newCreateRoom(io, socket, data));
  socket.on("C2S_GET_ALL_ROOMS", data => chatEvents.getAllRooms(io, socket, data));
  socket.on("C2S_NEW_PUBLIC_MESSAGE", data => chatEvents.newPublicMessage(io, socket, data));
  socket.on("C2S_GET_ALL_PUBLICC_MESSAGE", data => chatEvents.getAllPublicMessage(io, socket, data));
    
  }