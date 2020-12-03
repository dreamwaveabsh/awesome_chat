import contactModel from "./../models/contact.model"
import userModel from "./../models/user.model"
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
    let newContactItem = {
      userId: currentUserId,
      contactId: contactId
    };
    let newContact = await contactModel.createNew(newContactItem);
    resolve(newContact)
  });
}
let removeRequestContact = (currentUserId,contactId) =>{
  return new Promise(async (resolve,reject)=>{
    let removeReq = await contactModel.removeRequestContact(currentUserId,contactId);
    if(removeReq.result.n ===0){
      return reject(false)
    }
      resolve(true)

  });
}

module.exports = {
  findUserContact:findUserContact,
  addNew:addNew,
  removeRequestContact:removeRequestContact
}