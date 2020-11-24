import { bluebird } from "bluebird";
import {validationResult} from "express-validator/check";
import {auth} from "./../services/index"
import {transSuccess} from "./../../lang/vi"

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
    let createUserSuccess = await auth.register(req.body.email,req.body.gender,req.body.password,req.protocol,req.get("host"));
    successArr.push(createUserSuccess);
    req.flash("success",successArr);
    return res.redirect("/login-register");
  } catch (error) {
    errorArr.push(error);
    req.flash("errors",errorArr)
    return res.redirect("/login-register");
  }
}

let verifyAccount = async (req,res) =>{
  let errorArr =[];
  let successArr =[];
  try {
    let verifySuccess = await auth.verifyAccount(req.params.token);
    successArr.push(verifySuccess);
    req.flash("success",successArr);
    return res.redirect("/login-register");
  } catch (error) {
    errorArr.push(error);
    req.flash("errors",errorArr)
    return res.redirect("/login-register");
  }
}

let getLogout = (req,res)=>{
  req.logout();
  req.flash("success",transSuccess.logout_success);
  res.redirect("/login-register")
}

let checkLogin = (req,res,next) =>{
  if(!req.isAuthenticated()){
    return res.redirect("/login-register")
  }
  next()
}

let checkLogout = (req,res,next) =>{
  if(req.isAuthenticated()){
    return res.redirect("/")
  }
  next()
}

module.exports = {
  loginRegister:loginRegister,
  postRegister:postRegister,
  verifyAccount:verifyAccount,
  getLogout:getLogout,
  checkLogin:checkLogin,
  checkLogout:checkLogout
}