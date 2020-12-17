import passport from "passport";
import passportGoogle from "passport-google-oauth";
import userModel from "./../../models/user.model"
import chatGroupModel from "./../../models/chatGroup.model"
import {transErrors,transSuccess} from "./../../../lang/vi"
let GoogleStrategy = passportGoogle.OAuth2Strategy;
let ggAppid ="283242642450-7ha9mj5k6hss2d9bssstq96rrb0qq333.apps.googleusercontent.com";
let ggAppSecret = "e8dcbWE4GgE8KLaJmBSKoyKL";
let ggCallbackUrl = "https://localhost:3000/auth/google/callback"

let initPassportGoogle = () =>{
  passport.use(new GoogleStrategy({
    clientID:ggAppid,
    clientSecret:ggAppSecret,
    callbackURL:ggCallbackUrl,
    passReqToCallback:true
  },async (req,accessToken,refreshToken,profile,done)=>{
    try {
      let user = await userModel.findByGoogleUid(profile.id);
      if(user){
        return done(null,user,req.flash("success",transSuccess.login_success(user.username)));
      }
      let newUserItem = {
        username:profile.displayName,
        gender:profile.gender,
        local:{
          isactive:true
        },
        google:{
          uid:profile.id,
          token:accessToken,
          email:profile.emails[0].value
        }
      }
      let newUser = await userModel.createNew(newUserItem)
      return done(null,newUser,req.flash("success",transSuccess.login_success(newUser.username)));
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
  initPassportGoogle:initPassportGoogle
}