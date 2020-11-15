import nodeMailer from "nodemailer";

let adminEmail = "hthiendz@gmail.com"
let adminPassword = "thien123s321";
let mailHost ="smtp.gmail.com";
let mailPort = 587;

let sendMail = (to,subject,htmlContent)=>{
  let transporter = nodeMailer.createTransport({
    host:mailHost,
    port:mailPort,
    secure: false,//SSL -TLS
    auth:{
      user:adminEmail,
      pass:adminPassword
    }
  })
  let option ={
    from:adminEmail,
    to:to,
    subject:subject,
    html:htmlContent
  }
  return transporter.sendMail(option) // return primise
}
module.exports = sendMail;