let getHomeAdmin = (req,res )=>{
  return res.render("admin/index")
}
let loginAdmin = (req,res)=>{
  return res.render("admin/auth/master")
}
module.exports = {
  getHomeAdmin:getHomeAdmin,
  loginAdmin:loginAdmin
}