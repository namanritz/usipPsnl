if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const Student = require("./models/student");
const express = require("express");
const mongoose = require("mongoose");
const { auth } = require("./middleware/auth");
const studentRoutes = require("./routes/student");
const adminRoutes = require("./routes/admin");
const passport = require("passport");
const cookieSession = require("cookie-session");
const path = require("path");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const dbUrl = process.env.DB_URL;
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const session = require("express-session");
const flash = require("connect-flash");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const { type } = require("os");
require("./utils/passport-setup");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
const sessionOptions = {
  secret: "thisisAsecret",
  resave: false,
  saveUninitialized: false,
};
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});



const branchSeed = async () => {
  await Branch.deleteMany({});
  for (let branch of branchData) {
    const { branchName, branchCode, subjects } = branch;
    const temp = new Branch({
      //YOUR USER ID
      branchName,
      branchCode,
      subjects,
    });
    // console.log(temp);
    await temp.save();
    // console.log(subject);
    // console.log("*************************************");
  }
};

//*********************************************************************************************** */
//*********************************************************************************************** */

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.get(
  ("/seed",
  async (req, res) => {
    //await seedDB();
    res.send("Done");
  })
);
//*********************************************************************************************** */
//*********************************************************************************************** */

app.get(
  "/auth",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

// Auth Callback
app.get(
  "/student/googleLogin/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/callback/success",
    failureRedirect: "/auth/callback/failure",
  })
);

app.get("/auth/callback/success", async (req, res) => {
  if (!req.user) res.redirect("/auth/callback/failure");

  const s = await Student.findOne({ email: req.user.email });
  const s2 = await Student.findOne({ dtu_email: req.user.email });
  if (s) {
    const token = jwt.sign(
      { _id: s._id },
      "thisisasecretkeyhelloonetwothreefour"
    );
    res.cookie("token", token);
    console.log(s.roll_no);
    return res.redirect(`/student/home/${s._id}`);
  } else if (s2) {
    console.log(s2.roll_no);
    const token = jwt.sign(
      { _id: s2._id },
      "thisisasecretkeyhelloonetwothreefour"
    );
    res.cookie("token", token);

    return res.redirect(`/student/home/${s2._id}`);
  } else {
    req.flash("error", "Student Not Found");
    res.redirect("/student/login");
  }
  //console.log(req.user);
  //res.send("Welcome " + req.user.email);
});

// failure
app.get("/auth/callback/failure", (req, res) => {
  res.send("Error");
});
///////////////////////////////////////////////////////////

//////////////////////////////////////////////
app.use("/student", studentRoutes);
// app.use('/spots', teacherRoutes);
app.use("/admin", adminRoutes);

app.get("/branchSeed", async (req, res) => {
  await branchSeed();
  res.send("BRANCH SEEDING COMPLETED");
});
let i=0;
app.get("/", async (req, res) => {
  // await seedDB();
  i++;
  console.log(i);
  res.redirect("/student/login");
  //res.render("index");
});
app.get("/index", async (req, res) => {
  // await seedDB();
  res.render("index");
});

app.get("/loaderio-39c278b4c1af63aaf8289af0c1b60fab.txt",async(req,res)=>{
  res.send('loaderio-39c278b4c1af63aaf8289af0c1b60fab')
app.use(async(req,res)=>{

  res.render('404');
});


})
//*********************************************************************************************** */
//*********************************************************************************************** */

//*********************************************************************************************** */

//*********************************************************************************************** */

app.listen(80, () => {
  console.log("Live on port 80");
});
