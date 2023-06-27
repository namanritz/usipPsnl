const express = require("express");
const router = express.Router({ mergeParams: true });
const Student = require("../models/student");
const catchAsync = require("../utils/catchAsync");
const { auth } = require("../middleware/auth");
const students = require("../controllers/student");
const admins = require("../controllers/admin");
const { isAdmin } = require("../middleware/isAdmin");
const excel = require("../controllers/excel");
const {
  verifyToken,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");

router
  .route("/login")
  .get(catchAsync(admins.renderLoginForm))
  .post(catchAsync(admins.submitLoginForm));

router.route("/home/:id").get(catchAsync(admins.renderHomePage));

router
  .route("/students")
  .get(verifyTokenAndAdmin, catchAsync(admins.students))
  .post(verifyTokenAndAdmin, catchAsync(admins.searchStudent));

router.route("/students/:id").get(catchAsync(admins.showStudent));

router
  .route("/courseRegisteration")
  .get(verifyTokenAndAdmin, catchAsync(admins.courseRegisteration));

router
  .route("/createCR")
  .get(verifyTokenAndAdmin, catchAsync(admins.createCR))
  .post(verifyTokenAndAdmin, catchAsync(admins.postCR));

router.route("/cr/delete/:id").post(catchAsync(admins.deleteCR));

router
  .route("/cr/:id")
  .get(verifyTokenAndAdmin, catchAsync(admins.updateCR))
  .post(catchAsync(admins.updatingCR));

router.route("/subjects").get(catchAsync(admins.showSubjects));

router.route("/updateCourse/:id").post(catchAsync(admins.updateCourse));

router
  .route("/definePrograms")
  .get(verifyTokenAndAdmin, catchAsync(admins.definePrograms))
  .post(verifyTokenAndAdmin, catchAsync(admins.newProgram));

router
  .route("/defineSpecializations")
  .get(catchAsync(admins.defineSpecializations))
  .post(catchAsync(admins.newSpecialization));

router
  .route("/updates pecialization/:id")
  .post(catchAsync(admins.updateSpecialization));

router
  .route("/updateProgram")
  .put(verifyTokenAndAdmin, catchAsync(admins.updateProgram));

router.route("/newSlot/:id").post(isAdmin, catchAsync(admins.newSlot));

router.route("/updateSlot/:id").post(isAdmin, catchAsync(admins.updateSlot));

router.route("/deleteSlot/:id").get(isAdmin, catchAsync(admins.deleteSlot));

router
  .route("/crInfo")
  .get(catchAsync(admins.crInfo))
  .post(catchAsync(admins.postCrInfo));

router.route("/excelCrInfo").post(catchAsync(excel.registerationInfoExcel));

router.route("/homesection").post(catchAsync(admins.homeSectioningAlgorithm));
// .post(catchAsync(admins.homeSectioningPost));

router.route("/count").get(catchAsync(admins.countStudentsInBranch));

router.route("/programs").get(catchAsync(admins.splInDegree));

router
  .route("/homesectionallotment")
  .post(catchAsync(admins.homeSectionAllotment));

module.exports = router;
