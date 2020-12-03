import express from "express";
import passport from "passport";
import {home,auth,user,contact} from "../controllers/index"
import {authValid,userValid,contactValid} from "../validation/index";
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
  return app.use("/",router);
};
module.exports = initRouter;
