import notificationModel from "./../models/notification.model"
import userModal from "./../models/user.model"

const LIMIT_NUMER_TAKEN =10;

let getNotifications =(currentUserId,limit =10)=>{
  return new Promise(async (resolve,reject)=>{
    try {
      let notifications = await notificationModel.model.getByUserIdAndLimit(currentUserId,limit);
      let getNotifContents =  notifications.map(async (notification)=>{
        let sender = await userModal.findUserById(notification.senderId);
        return notificationModel.contents.getContent(notification.type,notification.isRead,sender._id,sender.username,sender.avatar) 
      });
      resolve(await Promise.all(getNotifContents))
    } catch (error) {
      reject(error);
    }
  })
}
let countNotifUnRead =(currentUserId)=>{
  return new Promise(async (resolve,reject)=>{
    try {
      let notificationsUnRead = await notificationModel.model.countNotifUnRead(currentUserId);
      resolve(notificationsUnRead)
    } catch (error) {
      reject(error);
    }
  })
}
let readMore =(currentUserId,skipNumberNotification)=>{
  return new Promise(async (resolve,reject)=>{
    try {
      let newNotifications = await notificationModel.model.readMore(currentUserId,skipNumberNotification,10);
      let getNotifContents =  newNotifications.map(async (notification)=>{
        let sender = await userModal.findUserById(notification.senderId);
        return notificationModel.contents.getContent(notification.type,notification.isRead,sender._id,sender.username,sender.avatar) 
      });
      resolve(await Promise.all(getNotifContents))
    } catch (error) {
      reject(error);
    }
  })
}
module.exports = {
  getNotifications:getNotifications,
  countNotifUnRead:countNotifUnRead,
  readMore:readMore
}