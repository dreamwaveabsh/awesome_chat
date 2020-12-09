import contactModel from "./../models/contact.model"
import userModel from "./../models/user.model"
import notificationModel from "./../models/notification.model"
import _ from "lodash";
let findUserContact = (currentUserId,keyword) =>{
  return new Promise(async (resolve,reject)=>{
    let deprecatedUserIds = [currentUserId];
    let contactsByUser = await contactModel.findAllbyUser(currentUserId);
    contactsByUser.forEach(contact => {
      deprecatedUserIds.push(contact.userId)
      deprecatedUserIds.push(contact.contactId)
    });
    deprecatedUserIds = _.uniqBy(deprecatedUserIds);
    let users = await userModel.findAllForAddContact(deprecatedUserIds,keyword);
    resolve(users)
  });
}
let addNew = (currentUserId,contactId) =>{
  return new Promise(async (resolve,reject)=>{
    let contactExists = await contactModel.checkExist(currentUserId,contactId);
    if(contactExists){
      return reject(false);
    };
    //create contact
    let newContactItem = {
      userId: currentUserId,
      contactId: contactId
    };
    let newContact = await contactModel.createNew(newContactItem);
    //notification
    let notificationItem = {
      senderId:currentUserId,
      receiverId:contactId,
      type:notificationModel.types.ADD_CONTACT,
    }
    await notificationModel.model.createNew(notificationItem);

    
    resolve(newContact)
  });
}
let removeRequestContact = (currentUserId,contactId) =>{
  return new Promise(async (resolve,reject)=>{
    let removeReq = await contactModel.removeRequestContact(currentUserId,contactId);
    if(removeReq.result.n ===0){
      return reject(false)
    }
    //remove notification
    await notificationModel.model.removeRequestContactNotification(currentUserId,contactId,notificationModel.types.ADD_CONTACT)
    resolve(true)

  });
}
let getContacts = (currentUserId) =>{
  return new Promise(async (resolve,reject)=>{
    try {
      let contacts = await contactModel.getContacts(currentUserId,10);
      let users =  contacts.map(async (contact)=>{
        if(contact.contactId == currentUserId){
          return await userModel.findUserById(contact.userId);
        }else{
          return await userModel.findUserById(contact.contactId);
        }
       
      });
      resolve(await Promise.all(users))
    } catch (error) {
      reject(error)
    }
  });
}
let getContactsSent = (currentUserId) =>{
  return new Promise(async (resolve,reject)=>{
    try {
      let contacts = await contactModel.getContactsSent(currentUserId,10);
      let users =  contacts.map(async (contact)=>{
        return await userModel.findUserById(contact.contactId)
      });
      resolve(await Promise.all(users))
    } catch (error) {
      reject(error)
    }
  });
}
let getContactsReceived = (currentUserId) =>{
  return new Promise(async (resolve,reject)=>{
    try {
      let contacts = await contactModel.getContactsReceived(currentUserId,10);
      let users =  contacts.map(async (contact)=>{
        return await userModel.findUserById(contact.userId)
      });
      resolve(await Promise.all(users))
    } catch (error) {
      reject(error)
    }
  });
}
let countAllContacts = (currentUserId) =>{
  return new Promise(async (resolve,reject)=>{
    try {
      let count = await contactModel.countAllContacts(currentUserId);
      resolve(count)
    } catch (error) {
      reject(error)
    }
  });
}
let countAllContactsSent = (currentUserId) =>{
  return new Promise(async (resolve,reject)=>{
    try {
      let count = await contactModel.countAllContactsSent(currentUserId);
      resolve(count)
    } catch (error) {
      reject(error)
    }
  });
}
let countAllContactsReceived = (currentUserId) =>{
  return new Promise(async (resolve,reject)=>{
    try {
      let count = await contactModel.countAllContactsReceived(currentUserId);
      resolve(count)
    } catch (error) {
      reject(error)
    }
  });
}


module.exports = {
  findUserContact:findUserContact,
  addNew:addNew,
  removeRequestContact:removeRequestContact,
  getContacts:getContacts,
  getContactsSent:getContactsSent,
  getContactsReceived:getContactsReceived,
  countAllContacts:countAllContacts,
  countAllContactsSent:countAllContactsSent,
  countAllContactsReceived:countAllContactsReceived,
}