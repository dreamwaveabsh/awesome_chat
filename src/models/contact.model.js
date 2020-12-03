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
  removeRequestContact(userId,contactId){
    return this.remove({
      $and:[
        {"userId":userId},
        {"contactId":contactId}
      ]
    }).exec();
  }
}
module.exports = mongoose.model("contact",ContactSchema);
