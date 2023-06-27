const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
module.exports.isAdmin = async (req, res, next) => {
  const cookies = await req.cookies;
  if (!cookies.token) {
    req.flash("error", "Please Login Again ");
    return res.redirect("/admin/login");
  }
  const response = await jwt.verify(
    cookies.token,
    "thisisasecretkeyhelloonetwothreefour"
  );
  const adm = await Admin.findById(response._id);
  //console.log(adm);

  if (!adm) {
    req.flash("error", "Not an admin ! Please Login");
    //console.log("token not matched");
    return res.redirect("/admin/login");
  }
  next();
};
