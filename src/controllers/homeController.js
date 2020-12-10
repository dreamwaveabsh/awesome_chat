import {notification,contact,message} from "./../services/index";
import {bufferToBase64} from "./../helper/clientHelper"

let getHome = async (req,res)=>{
  //only 10
  let notifications = await notification.getNotifications(req.user._id);
  let countNotifUnRead = await notification.countNotifUnRead(req.user._id);
  let contacts = await contact.getContacts(req.user._id);
  let contactsSent = await contact.getContactsSent(req.user._id);
  let contactsReceived = await contact.getContactsReceived(req.user._id);
  

  let countAllContacts = await contact.countAllContacts(req.user._id);
  let countAllContactsSent = await contact.countAllContactsSent(req.user._id);
  let countAllContactsReceived = await contact.countAllContactsReceived(req.user._id);

  let getAllConversationItems = await message.getAllConversationItems(req.user._id);
  let allConversations = getAllConversationItems.allConversations;
  let userConversations = getAllConversationItems.userConversations;
  let groupConversations = getAllConversationItems.groupConversations;
  let allConversationWithMessages = getAllConversationItems.allConversationWithMessages;




  return res.render("main/home/home",{
    success:req.flash("success"),
    errors:req.flash("errors"),
    user:req.user,
    notifications:notifications,
    countNotifUnRead:countNotifUnRead,
    contacts:contacts,
    contactsSent:contactsSent,
    contactsReceived:contactsReceived,
    countAllContacts:countAllContacts,
    countAllContactsSent:countAllContactsSent,
    countAllContactsReceived:countAllContactsReceived,
    allConversations:allConversations,
    userConversations:userConversations,
    groupConversations:groupConversations,
    allConversationWithMessages:allConversationWithMessages,
    bufferToBase64:bufferToBase64
  })
}
module.exports ={
  getHome:getHome
}