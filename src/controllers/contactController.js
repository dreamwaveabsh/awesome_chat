import {contact} from "./../services/index"
import {validationResult} from "express-validator/check";
import { contactValid } from "../validation";

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
let addNew = async (req,res) =>{

  try {
    let currentUserId = req.user._id;
    let contactId = req.body.uid;

    let newContact = await contact.addNew(currentUserId,contactId)
    return res.status(200).send({success:!!newContact})
  } catch (error) {
    return res.status(500).send(error)
  }

};
let removeRequestContact = async (req,res) =>{

  try {
    let currentUserId = req.user._id;
    let contactId = req.body.uid;

    let removeReq = await contact.removeRequestContact(currentUserId,contactId)
    return res.status(200).send({success:!!removeReq})
  } catch (error) {
    return res.status(500).send(error)
  }

};

let readMoreContacts = async (req,res) => {
  try {

    let skipNumberContacts = +(req.query.skipNumber);
    let newContactUsers = await contact.readMoreContacts(req.user._id,skipNumberContacts);
    return res.status(200).send(newContactUsers);
  } catch (error) {
    return res.status(500).send(error)
  }
}
let readMoreContactsSent = async (req,res) => {
  try {

    let skipNumberContacts = +(req.query.skipNumber);
    let newContactUsers = await contact.readMoreContactsSent(req.user._id,skipNumberContacts);
    return res.status(200).send(newContactUsers);
  } catch (error) {
    return res.status(500).send(error)
  }
}
let readMoreContactsReceived = async (req,res) => {
  try {

    let skipNumberContacts = +(req.query.skipNumber);
    let newContactUsers = await contact.readMoreContactsReceived(req.user._id,skipNumberContacts);
    return res.status(200).send(newContactUsers);
  } catch (error) {
    return res.status(500).send(error)
  }
}

module.exports = {
  findUserContact:findUserContact,
  addNew:addNew,
  removeRequestContact:removeRequestContact,
  readMoreContacts:readMoreContacts,
  readMoreContactsSent:readMoreContactsSent,
  readMoreContactsReceived:readMoreContactsReceived
}