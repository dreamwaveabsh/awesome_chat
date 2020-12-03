let addNewContact = (io)=>{
  io.on("connection",(socket)=>{
    socket.on("add-new-contact",(data)=>{
      console.log(data)
      console.log(Object.values(socket.request.user)[3])
    })
  })
}
module.exports = addNewContact;