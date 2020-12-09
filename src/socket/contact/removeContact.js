import {pushSocketIdToAraay,emitNotifyToArray,removeSocketIdToAraay} from "./../../helper/socketHelper"
let removeContact = (io)=>{
  let clients = {};
  io.on("connection",(socket)=>{

    clients = pushSocketIdToAraay(clients,socket.request.user._id,socket.id)

    socket.on("remove-contact",(data)=>{
        let currentUser = {
          id:socket.request.user._id
        };
        if(clients[data.contactId]){
          emitNotifyToArray(clients,data.contactId,io,"response-remove-contact",currentUser)
        }
        
    })
    socket.on("disconnect",()=>{
      clients = removeSocketIdToAraay(clients,socket.request.user._id,socket)
    })
  })
}
module.exports = removeContact;