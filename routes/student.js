const express = require("express");
const router = express.Router();
const Student = require("../models/student");
const catchAsync = require("../utils/catchAsync");
const { auth } = require("../middleware/auth");
const students = require("../controllers/student");
const passport = require('passport');


// router
//   .route("/register")
//   .get(catchAsync(students.renderRegister))
//   .post(catchAsync(students.submitRegister));

router
  .route("/login")
  .get(catchAsync(students.renderLoginForm))
  .post(catchAsync(students.submitLoginForm));

router.route('/courseRegister/:id/:cid')
  .post(auth,catchAsync(students.courseRegister));


router.route('/backRegister/:id/:cid')
  .post(auth,catchAsync(students.backRegister));


router.route("/courseRegisteration/:id")
.get(auth,catchAsync(students.renderCourseRegisteration));



router.route("/backRegisteration/:id")
.get(auth,catchAsync(students.renderBackRegisteration));

router.route('/home/:id').get(auth ,catchAsync(students.studentHomePage));


router
  .route('/acknowledgement/:id')
  .get(auth,catchAsync(students.acknowledgementSlip));


  router
  .route('/admitCard/:id')
  .get(auth,catchAsync(students.admitCard));
  

  router
  .route('/form')
  .get(catchAsync(students.form));
  




module.exports = router;
