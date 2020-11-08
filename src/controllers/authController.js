import {validationResult} from "express-validator/check";

let loginRegister=(req,res)=>{
  return res.render("auth/master")
}
let postRegister = (req,res)=>{
  var errorArr =[]
  let validationErrors = validationResult(req);
  if(!validationErrors.isEmpty()){
    let errors = Object.values(validationErrors.mapped());
    for(var item of errors){
      errorArr.push(item.msg)
    }
    console.log(errorArr);
    return
  }
  console.log(req.body)
  
}
module.exports = {
  loginRegister:loginRegister,
  postRegister:postRegister
}