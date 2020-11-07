import express from "express";
import {home,auth} from "../controllers/index"
let router = express.Router();

let initRouter = (app)=>{
  router.get("/", home.getHome);
  router.get("/login-register", auth.loginRegister);
  return app.use("/",router);
};
module.exports = initRouter;
