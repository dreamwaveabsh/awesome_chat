// var express = require("express");
import express from "express"
import connectDB from "./config/connectDB";
import configViewEngine from "./config/viewEngine"
import { bluebird } from "bluebird";
import initRouter from "./routers/web";
import bodyParser from "body-parser";
import connectFlash from "connect-flash"
import session from "./config/session";
import passport from "passport";
import https from "https";
import path from "path";
import fs from "fs";
import http from "http"
import socketio from "socket.io"
import initSockets from "./socket/index"
import cookieParser from "cookie-parser"
import configSocketIo from "./config/socketio"





var app = express();
//connect to mongodb

//init sever with socket.io & express app
let sever = http.createServer(app);
let io = socketio(sever);


connectDB();
//config session
session.config(app);

//config view engine
configViewEngine(app);
//bodyParser
app.use(bodyParser.urlencoded({ extended: true }))
//connect Flash
app.use(connectFlash());
//use cookie parser
app.use(cookieParser())
//passport
app.use(passport.initialize());
app.use(passport.session());    
//init router
initRouter(app);

//config socket io
configSocketIo(io,cookieParser,session.sessionStore)

//init socket 
initSockets(io);


// const sslSever = https.createServer(
//   {
//     key: fs.readFileSync(path.join(__dirname,'cert','key.pem')),
//     cert:fs.readFileSync(path.join(__dirname,'cert','cert.pem'))
//   },
//   app
// )




sever.listen(3000,()=>{
    console.log("success")
}) 


