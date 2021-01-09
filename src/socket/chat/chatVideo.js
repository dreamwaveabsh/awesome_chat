import {pushSocketIdToAraay,emitNotifyToArray,removeSocketIdToAraay} from "./../../helper/socketHelper"
let chatVideo = (io)=>{
  let clients = {};
  io.on("connection",(socket)=>{
    clients = pushSocketIdToAraay(clients,socket.request.user._id,socket.id);
    socket.request.user.chatGroupIds.forEach(group => {
      clients = pushSocketIdToAraay(clients,group._id,socket.id);
    });

    socket.on("caller-check-listener-online-or-not",(data)=>{
      if(clients[data.listenerId]){
        //online
        let response = {
          callerId : socket.request.user._id,
          callerName : data.callerName,
          listenerId : data.listenerId
        }
        emitNotifyToArray(clients,data.listenerId,io,"sever-request-peer-id-of-listener",response)
      }else{
        //offline
        socket.emit("sever-send-listener-is-offline")
      }
    })

    socket.on("listener-emit-peer-id-to-sever",(data)=>{
      let response = {
        callerId : data.callerId,
        callerName:data.callerName,
        listenerId:data.listenerId,
        listenerName:data.listenerName,
        listenerPeerId : data.listenerPeerId
      }
      if(clients[data.callerId]){
        emitNotifyToArray(clients,data.callerId,io,"sever-send-peer-id-of-listener-to-caller",response);
      }
    });

    socket.on("caller-request-call-to-sever",(data)=>{
      let response = {
        callerId : data.callerId,
        callerName:data.callerName,
        listenerId:data.listenerId,
        listenerName:data.listenerName,
        listenerPeerId : data.listenerPeerId
      }
      if(clients[data.listenerId]){
        emitNotifyToArray(clients,data.listenerId,io,"sever-send-request-call-to-listener",response);
      }
    });
    socket.on("caller-cancel-request-call-to-server",(data)=>{
      let response = {
        callerId : data.callerId,
        callerName:data.callerName,
        listenerId:data.listenerId,
        listenerName:data.listenerName,
        listenerPeerId : data.listenerPeerId
      }
      if(clients[data.listenerId]){
        emitNotifyToArray(clients,data.listenerId,io,"sever-send-cancel-request-call-to-listener",response);
      }
    });

    socket.on("listener-reject-request-call-to-sever",(data)=>{
      let response = {
        callerId : data.callerId,
        callerName:data.callerName,
        listenerId:data.listenerId,
        listenerName:data.listenerName,
        listenerPeerId : data.listenerPeerId
      }
      if(clients[data.callerId]){
        emitNotifyToArray(clients,data.callerId,io,"sever-send-reject-call-to-caller",response);
      }
    });

    socket.on("listener-accecpt-request-call-to-sever",(data)=>{
      let response = {
        callerId : data.callerId,
        callerName:data.callerName,
        listenerId:data.listenerId,
        listenerName:data.listenerName,
        listenerPeerId : data.listenerPeerId
      }
      if(clients[data.callerId]){
        emitNotifyToArray(clients,data.callerId,io,"sever-send-accecpt-call-to-caller",response);
      }
      if(clients[data.listenerId]){
        emitNotifyToArray(clients,data.listenerId,io,"sever-send-accecpt-call-to-caller",response);
      }
    });

    socket.on("disconnect",()=>{
      clients = removeSocketIdToAraay(clients,socket.request.user._id,socket)
      socket.request.user.chatGroupIds.forEach(group => {
        clients = removeSocketIdToAraay(clients,group._id,socket)
      });
    })
  })






}

module.exports = chatVideo;