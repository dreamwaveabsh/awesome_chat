import userModel from "./../models/user.model";

let updateUser = (id,item)=>{
    return userModel.updateUser(id,item)
}

module.exports = {
  updateUser:updateUser
}