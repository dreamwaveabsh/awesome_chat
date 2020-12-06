import {notification} from "./../services/index";

let getHome = async (req,res)=>{
  //only 10
  let notifications = await notification.getNotifications(req.user._id);
  let countNotifUnRead = await notification.countNotifUnRead(req.user._id)
  return res.render("main/home/home",{
    success:req.flash("success"),
    errors:req.flash("errors"),
    user:req.user,
    notifications:notifications,
    countNotifUnRead:countNotifUnRead
  })
}
module.exports ={
  getHome:getHome
}