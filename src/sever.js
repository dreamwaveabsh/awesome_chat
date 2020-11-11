// var express = require("express");
import express from "express"
import connectDB from "./config/connectDB";
import configViewEngine from "./config/viewEngine"
import { bluebird } from "bluebird";
import initRouter from "./routers/web";
import bodyParser from "body-parser";
import connectFlash from "connect-flash"
import configSession from "./config/session"
var app = express();

//connect to mongodb
connectDB();
//config session
configSession(app);

//config view engine
configViewEngine(app);
//bodyParser
app.use(bodyParser.urlencoded({ extended: true }))
//connect Flash
app.use(connectFlash());
//init router
initRouter(app);
app.listen(3000,()=>{
    console.log("success")
}) 


