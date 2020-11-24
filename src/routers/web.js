import express from "express";
import passport from "passport";
import {home,auth} from "../controllers/index"
import {authValid} from "../validation/index";
import {initPassportLocal} from "./../controllers/passportController/local";


//init passport local

let router = express.Router();
initPassportLocal();

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
  router.get("/logout",auth.checkLogin,auth.getLogout)
  return app.use("/",router);
};
module.exports = initRouter;
