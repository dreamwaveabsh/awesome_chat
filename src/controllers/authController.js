import {validationResult} from "express-validator/check";
import {auth} from "./../services/index"

let loginRegister=(req,res)=>{
  return res.render("auth/master",{
    success:req.flash("success"),
    errors:req.flash("errors")
  })
}
let postRegister = async (req,res)=>{
  let errorArr =[];
  let successArr =[];
  let validationErrors = validationResult(req);
  if(!validationErrors.isEmpty()){
    let errors = Object.values(validationErrors.mapped());
    for(var item of errors){
      errorArr.push(item.msg)
    }
    req.flash("errors",errorArr)
    return res.redirect('/login-register');
  }
  try {
    let createUserSuccess = await auth.register(req.body.email,req.body.gender,req.body.password);
    successArr.push(createUserSuccess);
    req.flash("success",successArr);
    return res.redirect("/login-register");
  } catch (error) {
    errorArr.push(error);
    req.flash("errors",errorArr)
    return res.redirect("/login-register");
  }
  
}
module.exports = {
  loginRegister:loginRegister,
  postRegister:postRegister
}