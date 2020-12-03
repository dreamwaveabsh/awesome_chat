import {contact} from "./../services/index"
import {validationResult} from "express-validator/check";
let findUserContact = async (req,res) =>{
  let errorArr =[];
  let validationErrors = validationResult(req);
  if(!validationErrors.isEmpty()){
    let errors = Object.values(validationErrors.mapped());
    for(var item of errors){
      errorArr.push(item.msg)
    }
    res.status(500).send(errorArr)
  }
  try {
    let currentUserId = req.user._id;
    let keyword = req.params.keyword;
    let waitUsers = await contact.findUserContact(currentUserId,keyword);
    let users =[]
    waitUsers.forEach(user => {
      users.push(user._doc);
    });
    return res.render("main/contact/sections/_findUsersContact",{users})
  } catch (error) {
    return res.status(500).send(error)
  }

}
module.exports = {
  findUserContact:findUserContact
}