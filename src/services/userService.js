import userModel from "./../models/user.model";
import { transErrors } from "./../../lang/vi";
import bcrypt from 'bcrypt';

const saltRound = 7;


let updateUser = (id,item)=>{
    return userModel.updateUser(id,item)
}

let updatePassword = (id,dataUpdate)=>{
    return new Promise(async (resolve,reject)=>{
      let currentUser = await userModel.findUserById(id);
      if(!currentUser){
        return reject(transErrors.account_undefined)
      }

      let checkCurrentPassword = await currentUser.comparePassword(dataUpdate.currentPassword)
      if(!checkCurrentPassword){
        return reject(transErrors.user_current_password_failed)
      }

      let salt = bcrypt.genSaltSync(saltRound);
      await userModel.updatePassword(id,bcrypt.hashSync(dataUpdate.newPassword,salt));
      resolve(true)

    })
}

module.exports = {
  updateUser:updateUser,
  updatePassword:updatePassword
}