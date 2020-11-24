import passport from "passport";
import passportFacebook from "passport-facebook";
import userModel from "./../../models/user.model"
import {transErrors,transSuccess} from "./../../../lang/vi"
let FacebookStrategy = passportFacebook.Strategy;
let fbAppid =755161711737959;
let fbAppSecret = "035e413e275e236fc5aaea7d7db40862";
let fbCallbackUrl = "https://localhost:3000/auth/facebook/callback"

let initPassportFacebook = () =>{
  passport.use(new FacebookStrategy({
    clientID:fbAppid,
    clientSecret:fbAppSecret,
    callbackURL:fbCallbackUrl,
    passReqToCallback:true,
    profileFields:["email","gender","displayName"]
  },async (req,accessToken,refreshToken,profile,done)=>{
    try {
      let user = await userModel.findByFacebookUid(profile.id);
      if(user){
        return done(null,user,req.flash("success",transSuccess.login_success(user.username)));
      }
      let newUserItem = {
        username:profile.displayName,
        gender:profile.gender,
        local:{
          isactive:true
        },
        facebook:{
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
  passport.deserializeUser((id,done)=>{
    userModel.findUserById(id)
    .then(user => {
      return done(null,user)
    }).catch((err) => {
      return done(err,null)
    });
  })
}

module.exports = {
  initPassportFacebook:initPassportFacebook
}