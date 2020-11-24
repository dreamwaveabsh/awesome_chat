import express from "express";
import passport from "passport";
import {home,auth} from "../controllers/index"
import {authValid} from "../validation/index";
import {initPassportLocal} from "./../controllers/passportController/local";

//init passport local

let router = express.Router();
initPassportLocal();

let initRouter = (app)=>{
  router.get("/", home.getHome);
  router.get("/login-register", auth.loginRegister);
  router.post("/register",authValid.register,auth.postRegister);
  router.get("/verify/:token",auth.verifyAccount);

  router.post("/login",passport.authenticate('local',{
    successRedirect:"/",
    failureRedirect:"/login-register",
    successFlash:true,
    failureFlash:true

  }))
  return app.use("/",router);
};
module.exports = initRouter;
