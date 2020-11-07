// var express = require("express");
import express from "express"
import connectDB from "./config/connectDB";
import contactModel from "./models/contact.model"
import { bluebird } from "bluebird";
var app = express();
//connect to mongodb
connectDB();

app.listen(3000,()=>{
    console.log("success")
}) 

app.get("/test-database",async (req,res)=>{
    try {
        let item ={
            userId :"070601",
            contactId:"hthiendz"
        };
        let contact = await contactModel.createNew(item);
        res.send(contact)
    } catch (error) {
        console.log(error)
    }
})
