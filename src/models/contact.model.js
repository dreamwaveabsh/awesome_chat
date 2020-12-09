import mongoose from "mongoose";

let Schema  = mongoose.Schema;

let ContactSchema = new Schema({
  userId :String,
  contactId:String,
  status:{type:Boolean,default:false},
  createAt:{type:Number,default:Date.now},
  updateAt:{type:Number,default:null},
  deleteAt:{type:Number,default:null}
});
ContactSchema.statics = {
  createNew(item){
    return this.create(item);
  },
  findAllbyUser(userId){
    return this.find({
      $or:[
        {"userId": userId},
        {"contactId":userId}
      ]
    }).exec();
  },
  checkExist(userId,contactId){
    return this.findOne({
      $or:[
        {$and:[
          {"userId":userId},
          {"contactId":contactId}
        ]},
        {$and:[
          {"contactId":contactId},
          {"userId":userId}
        ]}
      ]
    }).exec();
  },
  removeContact(userId,contactId){
    return this.remove({
      $or:[
        {$and:[
          {"userId":userId},
          {"contactId":contactId},
          {"status":true}
        ]},
        {$and:[
          {"contactId":contactId},
          {"userId":userId},
          {"status":true}
        ]}
      ]
    }).exec();
  },
  removeRequestContactSent(userId,contactId){
    return this.remove({
      $and:[
        {"userId":userId},
        {"contactId":contactId},
        {"status":false}
      ]
    }).exec();
  },
  removeRequestContactReceived(userId,contactId){
    return this.remove({
      $and:[
        {"contactId":userId},
        {"userId":contactId},
        {"status":false}
      ]
    }).exec();
  },
  approveRequestContactReceived(userId,contactId){
    return this.update({
      $and:[
        {"contactId":userId},
        {"userId":contactId},
        {"status":false}
      ]
    },{
      "status":true,

    }).exec();
  },
  getContacts(userId,limit){
    return this.find({
      $and:[
        {$or:[
          {"userId":userId},
          {"contactId":userId}
        ]},
        {"status":true}
      ]
    }).sort({"createAt":-1}).limit(limit).exec();
  },
  getContactsSent(userId,limit){
    return this.find({
      $and:[
        {"userId":userId},
        {"status":false}
      ]
    }).sort({"createAt":-1}).limit(limit).exec();
  },
  getContactsReceived(userId,limit){
    return this.find({
      $and:[
        {"contactId":userId},
        {"status":false}
      ]
    }).sort({"createAt":-1}).limit(limit).exec();
  },
  countAllContacts(userId){
    return this.count({
      $and:[
        {$or:[
          {"userId":userId},
          {"contactId":userId}
        ]},
        {"status":true}
      ]
    }).exec();
  },
  countAllContactsSent(userId){
    return this.count({
      $and:[
        {"userId":userId},
        {"status":false}
      ]
    }).exec();
  },
  countAllContactsReceived(userId){
    return this.count({
      $and:[
        {"contactId":userId},
        {"status":false}
      ]
    }).exec();
  },
  readMoreContacts(userId,skip,limit){
    return this.find({
      $and:[
        {$or:[
          {"userId":userId},
          {"contactId":userId}
        ]},
        {"status":true}
      ]
    }).sort({"createAt":-1}).skip(skip).limit(limit).exec();
  },
  readMoreContactsSent(userId,skip,limit){
    return this.find({
      $and:[
        {"userId":userId},
        {"status":false}
      ]
    }).sort({"createAt":-1}).skip(skip).limit(limit).exec();
  },
  readMoreContactsReceived(userId,skip,limit){
    return this.find({
      $and:[
        {"contactId":userId},
        {"status":false}
      ]
    }).sort({"createAt":-1}).skip(skip).limit(limit).exec();
  }
}
module.exports = mongoose.model("contact",ContactSchema);
