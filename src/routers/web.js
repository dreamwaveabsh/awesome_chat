import express from "express";
import passport from "passport";
import {home,auth,user,contact,notification,message} from "../controllers/index"
import {authValid,userValid,contactValid,messageValid} from "../validation/index";
import {initPassportLocal} from "./../controllers/passportController/local";
import {initPassportFacebook} from "./../controllers/passportController/facebook";
import {initPassportGoogle} from "./../controllers/passportController/google";


//init passport local

let router = express.Router();
initPassportLocal();
initPassportFacebook();
initPassportGoogle();


let initRouter = (app)=>{
  router.get("/",auth.checkLogin, home.getHome);
  router.get("/login-register",auth.checkLogout, auth.loginRegister);
  router.post("/register",auth.checkLogout,authValid.register,auth.postRegister);
  router.get("/verify/:token",auth.checkLogout,auth.verifyAccount);

  router.post("/login",auth.checkLogout,passport.authenticate('local',{
    successRedirect:"/",
    failureRedirect:"/login-register",
    successFlash:true,
    failureFlash:true
  }));

  router.get("/auth/facebook",auth.checkLogout,passport.authenticate('facebook',{scope:["email"]}));
  router.get("/auth/facebook/callback",auth.checkLogout,passport.authenticate('facebook',{
    successRedirect:"/",
    failureRedirect:"/login-register"
  }));

  router.get("/auth/google",auth.checkLogout,passport.authenticate('google',{scope:["email"]}));
  router.get("/auth/google/callback",auth.checkLogout,passport.authenticate('google',{
    successRedirect:"/",
    failureRedirect:"/login-register"
  }));
  router.get("/logout",auth.checkLogin,auth.getLogout);
  router.put("/user/update-avatar",auth.checkLogin,user.updateAvatar);
  router.put("/user/update-info",auth.checkLogin,userValid.updateinfo,user.updateInfo);
  router.put("/user/update-password",auth.checkLogin,userValid.updatePassword,user.updatePassword);
  router.get("/contact/find-users/:keyword",auth.checkLogin,contactValid.findUserContact,contact.findUserContact)
  router.post("/contact/add-new",auth.checkLogin,contact.addNew);
  router.delete("/contact/remove-contact",auth.checkLogin,contact.removeContact);
  router.delete("/contact/remove/request-contact-sent",auth.checkLogin,contact.removeRequestContactSent)
  router.delete("/contact/remove-request-contact-received",auth.checkLogin,contact.removeRequestContactReceived)
  router.put("/contact/approve-request-contact-received",auth.checkLogin,contact.approveRequestContactReceived)
  router.get("/contact/read-more-contacts",auth.checkLogin,contact.readMoreContacts)
  router.get("/contact/read-more-contacts-sent",auth.checkLogin,contact.readMoreContactsSent)
  router.get("/contact/read-more-contacts-received",auth.checkLogin,contact.readMoreContactsReceived)

  router.get("/notification/read-more",auth.checkLogin,notification.readMore)
  router.put("/notification/mark-all-as-read",auth.checkLogin,notification.markAllAsRead)

  router.post("/message/add-new-text-emoji",auth.checkLogin,messageValid.checkMessageLength,message.addNewTextEmoji);
  return app.use("/",router);
};
module.exports = initRouter;
