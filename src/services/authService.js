import userModel from "./../models/user.model"
import bcrypt from "bcrypt";
import uuidv4 from "uuid/v4"
import {transErrors,transSuccess} from "./../../lang/vi"
let saltRounds = 7;


let register = (email,gender,password)=>{
  return new Promise(async (resolve,reject)=>{
    let userByEmail = await userModel.findByEmail(email);
    if(userByEmail){
      if(userByEmail.deleteAt !== null){
        return reject(transErrors.account_remove);
      }
      if(!userByEmail.local.isActive){
        return reject(transErrors.account_not_active);
      }
      return reject(transErrors.account_in_use);
    }
    let salt = bcrypt.genSaltSync(saltRounds);
    let userItem  = {
      username:email.split("@")[0],
      gender:gender,
      local:{
        email:email,
        password: bcrypt.hashSync(password,salt),
        verifyToken: uuidv4()
      }
    }
    let user  = await userModel.createNew(userItem);
    resolve(transSuccess.userCreated(user.local.email));
  });
}
module.exports = {
  register:register
}