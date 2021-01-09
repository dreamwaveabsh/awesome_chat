import addNewContact from "./contact/addNewContact";
import removeRequestContactSent from "./contact/removeRequestContactSent"
import removeRequestContactReceived from "./contact/removeRequestContactReceived";
import approveRequestContactReceived from "./contact/approveRequestContactReceived"
import chatTextEmoji from "./chat/chatTextEmoji"
import removeContact from "./contact/removeContact"
import chatVideo from "./chat/chatVideo"
let initSockets = (io)=>{
  addNewContact(io);
  removeRequestContactSent(io);
  removeRequestContactReceived(io);
  approveRequestContactReceived(io);
  removeContact(io);
  chatTextEmoji(io);
  chatVideo(io);
}

module.exports = initSockets;