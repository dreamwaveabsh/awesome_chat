// var express = require("express");
import express from "express"
import connectDB from "./config/connectDB";
import configViewEngine from "./config/viewEngine"
import { bluebird } from "bluebird";
import initRouter from "./routers/web";
var app = express();

//connect to mongodb
connectDB();

//config view engine
configViewEngine(app);
//init router
initRouter(app);
app.listen(3000,()=>{
    console.log("success")
}) 


