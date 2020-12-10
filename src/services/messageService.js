import contactModel from "./../models/contact.model"
import userModel from "./../models/user.model"
import chatGroupModel from "./../models/chatGroup.model"
import messageModel from "./../models/message.model"
import _ from "lodash";
import {transErrors} from "./../../lang/vi"

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
        conversation=conversation.toObject();
        if(conversation.members){
          let getMessages = await messageModel.model.getMessagesInGroup(conversation._id,LIMIT_MESSAGE_TAKEN);
          conversation.messages = getMessages;
          return conversation;
        }else{
          let getMessages = await messageModel.model.getMessagesInPersonal(currentUserId,conversation._id,LIMIT_MESSAGE_TAKEN);
          conversation.messages = getMessages;
          return conversation;
        }
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
let addNewTextEmoji = (sender,receivedId,messageVal,isChatGroup)=>{
  return new Promise(async (resolve,reject)=>{
    try {
      if(isChatGroup){
        let getChatGroupReceived = await chatGroupModel.getChatGroupById(receivedId);
        if(!getChatGroupReceived){
          return reject(transErrors.conversation_not_found)
        }
        let received = {
          id: getChatGroupReceived._id,
          name:getChatGroupReceived.name,
          avatar:"group-avatar-trungquandev.png"
        };
        let newMessageItem ={
          senderId: sender.id,
          receivedId: received.id,
          conversationType: messageModel.conversationTypes.GROUP,
          messageType: messageModel.messageTypes.TEXT,
          sender:sender,
          receiver:received,
          text:messageVal,
          createAt:Date.now()
        }
        let newMessage = await messageModel.model.createNew(newMessageItem);
        await chatGroupModel.updateWhenHasNewMessage(getChatGroupReceived._id,getChatGroupReceived.messageAmount +1);
        resolve(newMessage)
      }else{
        let getUserReceived = await userModel.getNormalUserDataById(receivedId);
        if(!getUserReceived){
          return reject(transErrors.conversation_not_found)
        }
        let received = {
          id: getUserReceived._id,
          name:getUserReceived.username,
          avatar:getUserReceived.avatar
        };
        let newMessageItem ={
          senderId: sender.id,
          receivedId: received.id,
          conversationType: messageModel.conversationTypes.PERSONAL,
          messageType: messageModel.messageTypes.TEXT,
          sender:sender,
          receiver:received,
          text:messageVal,
          createAt:Date.now()
        }
        let newMessage = await messageModel.model.createNew(newMessageItem);
        await contactModel.updateWhenHasNewMessage(sender.id,getUserReceived._id);
        
        resolve(newMessage);
      }
    } catch (error) {
      reject(error)
    }
  })

}
module.exports = {
  getAllConversationItems:getAllConversationItems,
  addNewTextEmoji:addNewTextEmoji
}