import {notification,contact} from "./../services/index";

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
    countAllContactsReceived:countAllContactsReceived
  })
}
module.exports ={
  getHome:getHome
}