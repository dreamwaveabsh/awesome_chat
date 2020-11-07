// var express = require("express");
import express from "express"
import connectDB from "./config/connectDB";
import configViewEngine from "./config/viewEngine"
import { bluebird } from "bluebird";
var app = express();

//connect to mongodb
connectDB();

//config view engine
configViewEngine(app);
app.listen(3000,()=>{
    console.log("success")
}) 

app.get("/", (req,res)=>{
    return res.render("main/master")
})
app.get("/login-register", (req,res)=>{
    return res.render("auth/loginRegister")
})
