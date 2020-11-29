// var express = require("express");
import express from "express"
import connectDB from "./config/connectDB";
import configViewEngine from "./config/viewEngine"
import { bluebird } from "bluebird";
import initRouter from "./routers/web";
import bodyParser from "body-parser";
import connectFlash from "connect-flash"
import configSession from "./config/session";
import passport from "passport";
import https from "https";
import path from "path";
import fs from "fs";


// import https from "https";
// import pem from "pem";
// pem.config({
//     pathOpenSSL: '/usr/local/bin/openssl'
//   })
// pem.createCertificate({ days: 1, selfSigned: true }, function (err, keys) {
//     if (err) {
//       throw err
//     }
//     let app = express();
//     //connect to mongodb
//     connectDB();
//     //config session
//     configSession(app);

//     //config view engine
//     configViewEngine(app);
//     //bodyParser
//     app.use(bodyParser.urlencoded({ extended: true }))
//     //connect Flash
//     app.use(connectFlash());
//     //passport
//     app.use(passport.initialize());
//     app.use(passport.session());    
//     //init router
//     initRouter(app);
   
//     https.createServer({ key: keys.serviceKey, cert: keys.certificate }, app).listen(3000,()=>{
//         console.log("success")
//     }); 
//   });





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
//passport
app.use(passport.initialize());
app.use(passport.session());    
//init router
initRouter(app);


// const sslSever = https.createServer(
//   {
//     key: fs.readFileSync(path.join(__dirname,'cert','key.pem')),
//     cert:fs.readFileSync(path.join(__dirname,'cert','cert.pem'))
//   },
//   app
// )




app.listen(3000,()=>{
    console.log("success")
}) 


