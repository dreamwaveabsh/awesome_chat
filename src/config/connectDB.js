import mongoose from "mongoose";
import bluebird from "bluebird";

// connect mongodb

let connectDB = ()=>{
  mongoose.Promise = bluebird;

  let DB_CONNECTION = "mongodb";
  let DB_HOST = "localhost";
  let DB_PORT = "27017";
  let DB_NAME = "awesome_chat";
  let DB_USERNAME = "";
  let DB_PASSWORD = "";

  let URI =`${DB_CONNECTION}://${DB_HOST}:${DB_PORT}/${DB_NAME}`; //mongodb://localhost:27017/awesome_chat
  return mongoose.connect(URI,{useMongoClient:true})
}
module.exports = connectDB;