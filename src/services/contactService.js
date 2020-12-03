import contactModel from "./../models/contact.model"
import userModel from "./../models/user.model"
import _ from "lodash";
let findUserContact = (currentUserId,keyword) =>{
  return new Promise(async (resolve,reject)=>{
    let deprecatedUserIds = [];
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

module.exports = {
  findUserContact:findUserContact
}