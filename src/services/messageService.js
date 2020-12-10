import contactModel from "./../models/contact.model"
import userModel from "./../models/user.model"
import chatGroupModel from "./../models/chatGroup.model"
import messageModel from "./../models/message.model"
import _ from "lodash"

const  LIMIT_CONVERSATION_TAKEN = 15;
const  LIMIT_MESSAGE_TAKEN = 30;

let getAllConversationItems = (currentUserId)=>{
  return new Promise(async (resolve,reject)=>{
    try {
      let contacts = await contactModel.getContacts(currentUserId,LIMIT_CONVERSATION_TAKEN);
      let usersConversationsPromise =  contacts.map(async (contact)=>{
        if(contact.contactId == currentUserId){
          let getUserContact =  await userModel.getNormalUserDataById(contact.userId);
          getUserContact.updateAt = contact.updateAt;
          return getUserContact;
        }else{
          let getUserContact= await userModel.getNormalUserDataById(contact.contactId);
          getUserContact.updateAt = contact.updateAt;
          return getUserContact;
        }
      });
      let userConversations = await Promise.all(usersConversationsPromise);

      let groupConversations = await chatGroupModel.getChatGroups(currentUserId,LIMIT_CONVERSATION_TAKEN);
      let allConversations = userConversations.concat(groupConversations);
      allConversations = _.sortBy(allConversations,(item)=>{
        return -item.updateAt;
      })
      let allConversationWithMessagesPromise = allConversations.map(async (conversation)=>{
        let getMessages = await messageModel.model.getMessages(currentUserId,conversation._id,LIMIT_MESSAGE_TAKEN);
        conversation=conversation.toObject();
        conversation.messages = getMessages;
        return conversation;
      })
      let allConversationWithMessages = await Promise.all(allConversationWithMessagesPromise);

      allConversationWithMessages = _.sortBy(allConversationWithMessages,(item)=>{
        return -item.updateAt;
      });
      resolve({
        userConversations:userConversations,
        groupConversations:groupConversations,
        allConversations:allConversations,
        allConversationWithMessages:allConversationWithMessages
      });
    } catch (error) {
      reject(error)
    }
  })
};
module.exports = {
  getAllConversationItems:getAllConversationItems
}