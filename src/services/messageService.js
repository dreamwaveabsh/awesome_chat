import contactModel from "./../models/contact.model"
import userModel from "./../models/user.model"
import chatGroupModel from "./../models/chatGroup.model"
import _ from "lodash"

const  LIMIT_CONVERSATION_TAKEN = 15;

let getAllConversationItems = (currentUserId)=>{
  return new Promise(async (resolve,reject)=>{
    try {
      let contacts = await contactModel.getContacts(currentUserId,LIMIT_CONVERSATION_TAKEN);
      let usersConversationsPromise =  contacts.map(async (contact)=>{
        if(contact.contactId == currentUserId){
          let getUserContact =  await userModel.findUserById(contact.userId);
          getUserContact.createAt = contact.createAt;
          return getUserContact;
        }else{
          let getUserContact= await userModel.findUserById(contact.contactId);
          getUserContact.createAt = contact.createAt;
          return getUserContact;
        }
      });
      let userConversations = await Promise.all(usersConversationsPromise);

      let groupConversations = await chatGroupModel.getChatGroups(currentUserId,LIMIT_CONVERSATION_TAKEN);
      let allConversations = userConversations.concat(groupConversations);
      allConversations = _.sortBy(allConversations,(item)=>{
        return -item.createAt;
      })
      resolve({
        userConversations:userConversations,
        groupConversations:groupConversations,
        allConversations:allConversations,
      });
    } catch (error) {
      reject(error)
    }
  })
};
module.exports = {
  getAllConversationItems:getAllConversationItems
}