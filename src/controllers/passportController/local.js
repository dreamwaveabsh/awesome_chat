import passport from "passport";
import passportLocal from "passport-local";
import userModel from "./../../models/user.model"
import chatGroupModel from "./../../models/chatGroup.model"
import {transErrors,transSuccess} from "./../../../lang/vi"
let LocalStrategy = passportLocal.Strategy;


let initPassportLocal = () =>{
  passport.use(new LocalStrategy({
    usernameField:"email",
    passwordField:"password",
    passReqToCallback:true
  },async (req,email,password,done)=>{
    try {
      let user = await userModel.findByEmail(email);
      if(!user){
        return done(null,false,req.flash("errors",transErrors.login_fail));
      }
      if(!user.local.isActive){
        return done(null,false,req.flash("errors",transErrors.account_not_activetive));
      }

      let checkPassword = await user.comparePassword(password);
      if(!checkPassword){
        return done(null,false,req.flash("errors",transErrors.login_fail));
      }
      return done(null,user,req.flash("success",transSuccess.login_success(user.username)));
    } catch (error) {
        console.log(error);
        return done(null,false,req.flash("errors",transErrors.server_error));
    }
  }));


  //da dang nhap thanh cong thi lam cai ni
  passport.serializeUser((user,done)=>{
    done(null,user._id);    
  })
  passport.deserializeUser(async (id,done)=>{
    try {
      let user = await  userModel.findUserById(id);
      let getChatGroupIds  = await chatGroupModel.getChatGroupIdsByUser(user._id);

      user = user.toObject();
      user.chatGroupIds = getChatGroupIds;
      return done(null,user)
    } catch (error) {
      return done(err,null)
    }
  })
}

module.exports = {
  initPassportLocal:initPassportLocal
}