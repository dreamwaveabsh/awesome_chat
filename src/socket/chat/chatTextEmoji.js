import {pushSocketIdToAraay,emitNotifyToArray,removeSocketIdToAraay} from "./../../helper/socketHelper"

let chatTextEmoji = (io)=>{
  let clients = {};
  io.on("connection",(socket)=>{
    clients = pushSocketIdToAraay(clients,socket.request.user._id,socket.id);
    socket.request.user.chatGroupIds.forEach(group => {
      clients = pushSocketIdToAraay(clients,group._id,socket.id);
    });
    socket.on("chat-text-emoji",(data)=>{
      if(data.groupId){
        let response = {
          currentGroupId:data.groupId,
          currentUserId:socket.request.user._id,
          message:data.message
        }
        if(clients[data.groupId]){
          emitNotifyToArray(clients,data.groupId,io,"response-chat-text-emoji",response)
        }
      };
      if(data.contactId){
          let response = {
            currentUserId:socket.request.user._id,
            message:data.message
          }
          if(clients[data.contactId]){
            emitNotifyToArray(clients,data.contactId,io,"response-chat-text-emoji",response)
          }
      }
    })
    socket.on("disconnect",()=>{
      clients = removeSocketIdToAraay(clients,socket.request.user._id,socket)
      socket.request.user.chatGroupIds.forEach(group => {
        clients = removeSocketIdToAraay(clients,group._id,socket)
      });
    })
  })
}
module.exports = chatTextEmoji;