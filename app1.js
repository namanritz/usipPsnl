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
  
  app.use((req,res)=>{
   
    res.render('undermaintenance.ejs');
  })
  //*********************************************************************************************** */
  
  //*********************************************************************************************** */
  
  //*********************************************************************************************** */
  
  app.listen(80, () => {
    console.log("Live on port 80");
  });
  