const Student = require("../models/student");
const Specialization = require("../models/specialization");
const academic_programme = require("../models/academic_programme");
const subjectSchema = require("../models/subjectScheme");
const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
const crRules = require("../models/crRules");
const slots = require("../models/slots");
/////////////LOGIN////////////////

module.exports.renderLoginForm = async (req, res) => {
  res.render("admin/login");
};

module.exports.submitLoginForm = async (req, res) => {
  const { empID, password } = req.body;
  //console.log(req.body);

  const admin = await Admin.findOne({ adminID: empID.toLowerCase() });
  //console.log(student);
  if (!admin) {
    req.flash("error", "ADMIN NOT FOUND");
    return res.redirect("/admin/login");
  }

  if (password == admin.password) {
    //console.log("password matched");
    const token = jwt.sign(
      { _id: admin._id, isAdmin: true },
      process.env.JWT_SEC
    );
    res.cookie("token", token);
    console.log(token);
    return res.status(201).json({ user: admin, token: token, isAdmin: true });
    // return res.redirect(`/admin/home/${admin._id}`);
  } else {
    return res.redirect(`/admin/login`);
  }
};

module.exports.renderHomePage = async (req, res) => {
  const { id } = req.params;
  const admin = await Admin.findOne({ id: id });
  //console.log(admin);
  res.render("admin/home", { admin });
};
////////////////////Define and Update program(BTech , MTech etc)///////////////////

module.exports.definePrograms = async (req, res) => {
  const { id } = req.params;
  const admin = await Admin.findOne({ id: id });
  const objects = await academic_programme.find({});
  //const objects = [{name:"Hardik",description:"hi hi lorem*10"},{name:"Jatin",description:"bhbc dcbkdbsck dsbbdvhbjsd bdskvbkbkds uksdib"}];
  // res.render("admin/definePrograms", { objects, admin });
  res.json(objects).status(200);
};

module.exports.updateProgram = async (req, res) => {
  const { aprog } = req.body;
  console.log(req.body);
  //console.log(req.body);
  //console.log(id);
  try {
    const updatedProgram = await academic_programme.findOneAndUpdate(
      { aprog: aprog },
      { $set: req.body },
      { new: true }
    );
    // const foundProgram = await academic_programme.findOne({ aprog: aprog });
    res.status(201).json(updatedProgram);
  } catch (err) {
    res.status(500).json(err);
  }

  // const cookies = await req.cookies;
  // //console.log(cookies);
  // const response = await jwt.verify(
  //   cookies.token,
  //   "thisisasecretkeyhelloonetwothreefour"
  // );

  // res.redirect(`/admin/definePrograms/${response._id}`);
};

module.exports.newProgram = async (req, res) => {
  const { id } = req.params;
  const admin = await Admin.findOne({ id: id });

  const aprog = await academic_programme.create(req.body);

  res.redirect(`/admin/definePrograms/${id}`);
};

/////////////////////////////////SEARCH STUDENTs/////////////////////////////////////////////////////////////

module.exports.students = async (req, res) => {
  const cookies = await req.cookies;
  if (!cookies.token) {
    return res.redirect("/login/admin");
  }
  const response = await jwt.verify(
    cookies.token,
    "thisisasecretkeyhelloonetwothreefour"
  );

  const admin = await Admin.findOne({ id: response.id });
  //console.log(admin);
  const student = null;
  const studentState = null;
  res.render("admin/students", { admin, student, studentState });
};

module.exports.searchStudent = async (req, res) => {
  const { roll_no } = req.body;
  const foundStudent = await Student.findOne({
    roll_no: roll_no.toUpperCase(),
  });

  // const cookies = await req.cookies;
  // if (!cookies.token) {
  //   return res.redirect("/login/admin");
  // }
  // const response = await jwt.verify(
  //   cookies.token,
  //   "thisisasecretkeyhelloonetwothreefour"
  // );

  // const admin = await Admin.findOne({ id: response.id });
  if (foundStudent) {
    console.log(foundStudent);
    res.status(200).json(foundStudent);
    // res.redirect(`students/${foundStudent._id}`);
  } else {
    // req.flash("error", "Student Not Found");
    res.status(404);
    // res.redirect("/admin/students");
  }
};

module.exports.showStudent = async (req, res) => {
  const { id } = req.params;
  const cookies = await req.cookies;
  if (!cookies.token) {
    return res.redirect("/login/admin");
  }
  const response = await jwt.verify(
    cookies.token,
    "thisisasecretkeyhelloonetwothreefour"
  );
  const admin = await Admin.findById(response._id);
  //console.log(response);
  //console.log(admin);
  const student = await Student.findById(id);
  const studentState = await Student.findOne({
    roll_no: student.roll_no,
  }).populate("currentSubjects");
  //console.log(studentState);
  res.render("admin/students", { admin, student, studentState });
};

//////////////////////////////////COURSE REGISTERATION RULES///////////////////////////////////////

module.exports.courseRegisteration = async (req, res) => {
  // const cookies = await req.cookies;
  // if (!cookies.token) {
  //   return res.redirect("/login/admin");
  // }
  // const response = await jwt.verify(
  //   cookies.token,
  //   "thisisasecretkeyhelloonetwothreefour"
  // );

  // const admin = await Admin.findOne({ id: response.id });
  const cr = await crRules.find({});
  res.status(200).json(cr);
};

module.exports.createCR = async (req, res) => {
  const cookies = await req.cookies;
  if (!cookies.token) {
    return res.redirect("/login/admin");
  }
  const response = await jwt.verify(
    cookies.token,
    "thisisasecretkeyhelloonetwothreefour"
  );

  const admin = await Admin.findOne({ id: response.id });
  const aprogs = await academic_programme.find({});
  const specializations = await Specialization.find({});
  const sem = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const batchyears = [
    2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026,
  ];
  res.render("admin/createCR", {
    aprogs,
    admin,
    sem,
    specializations,
    batchyears,
  });
};
module.exports.postCR = async (req, res) => {
  // const cookies = await req.cookies;
  // if (!cookies.token) {
  //   return res.redirect("/login/admin");
  // }
  // const response = await jwt.verify(
  //   cookies.token,
  //   "thisisasecretkeyhelloonetwothreefour"
  // );

  //console.log(req.body);
  const cr = new crRules(req.body);
  try {
    await cr.save();
    res.status(201).json(cr);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.deleteCR = async (req, res) => {
  // const cookies = await req.cookies;
  // if (!cookies.token) {
  //   return res.redirect("/login/admin");
  // }
  // const response = await jwt.verify(
  //   cookies.token,
  //   "thisisasecretkeyhelloonetwothreefour"
  // );

  const { id } = req.params;

  try {
    const cr = await crRules.findByIdAndDelete(id);
    res.status(201).json(cr);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.updateCR = async (req, res) => {
  // const cookies = await req.cookies;
  // if (!cookies.token) {
  //   return res.redirect("/login/admin");
  // }
  // const response = await jwt.verify(
  //   cookies.token,
  //   "thisisasecretkeyhelloonetwothreefour"
  // );

  const { id } = req.params;
  try {
    const cr = await crRules.findById(id).populate("slots");
    const foundSubjects = await subjectSchema.find({ aprog: cr.aprog });
    res.status(200).json({ cr: cr, foundSubjects: foundSubjects });
  } catch (err) {
    res.status(500).json(err);
  }
  //console.log(sub);

  // const prev = { page: `/admin/cr/${id}` };
  // res.cookie("prev", prev);

  // res.render("admin/updateCR", { admin, cr, sub });
};

module.exports.updatingCR = async (req, res) => {
  // const cookies = await req.cookies;
  // if (!cookies.token) {
  //   return res.redirect("/login/admin");
  // }
  // const response = await jwt.verify(
  //   cookies.token,
  //   "thisisasecretkeyhelloonetwothreefour"
  // );

  // const { id } = req.params;
  // const admin = await Admin.findOne({ id: response.id });
  const admin = await Admin.find({});
  const { cr } = req.body;
  //console.log(req.body.cr);
  const c = await crRules.findByIdAndUpdate(id, cr);

  res.redirect(`/admin/cr/${c._id}`);
};

/////////////////////////////Show and update Courses (SUbjects)//////////////////

module.exports.showSubjects = async (req, res) => {
  // const cookies = await req.cookies;
  // if (!cookies.token) {
  //   return res.redirect("/login/admin");
  // }
  // const response = await jwt.verify(
  //   cookies.token,
  //   "thisisasecretkeyhelloonetwothreefour"
  // );
  // const admin = await Admin.findOne({ id: response.id });

  //const subjects = await Subject.find({});
  const subjectSchemas = await subjectSchema.find({});
  const fs = [];
  const admin = await Admin.find({});
  // res.render("admin/showSubjects", { admin, subjectSchemas, fs });
  res.json(subjectSchemas);
};

module.exports.updateCourse = async (req, res) => {
  const { id } = req.params;

  const ss = await subjectSchema.findByIdAndUpdate(id, req.body);
  //const s = await Subject.findOne({sub_code:req.body.sub_code});

  // const ns = await Subject.findByIdAndUpdate(s.id,req.body);
  // console.log(ss);
  res.redirect("/admin/subjects");
};

//---------------------X-----------------X--------SLOT MANAGEMENT------------X---------------------X-------------

module.exports.newSlot = async (req, res) => {
  const { id } = req.params;

  const ns = await slots.create(req.body);
  // console.log(ns);
  // await slots.deleteMany({});
  const cr = await crRules.findById(id);
  await cr.slots.push(ns);
  await cr.save();
  // console.log(ss);
  res.redirect(`/admin/cr/${id}`);
};

module.exports.updateSlot = async (req, res) => {
  const prev = await req.cookies.prev;
  //console.log(prev);
  const { id } = req.params;
  const us = await slots.findByIdAndUpdate(id, req.body);
  res.redirect(`${prev.page}`);
};

module.exports.deleteSlot = async (req, res) => {
  const { id } = req.params;
  const prev = await req.cookies.prev;
  const us = await slots.findByIdAndDelete(id);
  //console.log(us);
  res.redirect(`${prev.page}`);
};

////////////////////////////////////////X-----------------XX------------X-XX

module.exports.updateSpecialization = async (req, res) => {
  const prev = await req.cookies.prev;
  //console.log(prev);
  const { id } = req.params;
  const us = await Specialization.findByIdAndUpdate(id, req.body);
  res.redirect(`${prev.page}`);
};

module.exports.defineSpecializations = async (req, res) => {
  // const { id } = req.params;
  // const admin = await Admin.findOne({ id: id });
  const objects = await Specialization.find({});
  // const prev = { page: `/admin/defineSpecializations/${id}` };
  // res.cookie("prev", prev);
  //const objects = [{name:"Hardik",description:"hi hi lorem*10"},{name:"Jatin",description:"bhbc dcbkdbsck dsbbdvhbjsd bdskvbkbkds uksdib"}];
  // res.render("admin/defineSpecializations", { objects, admin });
  res.status(200).json(objects);
};

module.exports.newSpecialization = async (req, res) => {
  const { id } = req.params;
  const admin = await Admin.findOne({ id: id });

  const aprog = await Specialization.create(req.body);

  res.redirect(`/admin/defineSpecializations/${id}`);
};

//////////////////////////*********************CR INFO**************** */

module.exports.crInfo = async (req, res) => {
  const data = null;
  let aprogInput = "";
  let sp_codeInput = "";

  const cookies = await req.cookies;
  const response = await jwt.verify(
    cookies.token,
    "thisisasecretkeyhelloonetwothreefour"
  );
  const admin = await Admin.findOne({ id: response.id });

  res.render("admin/crInfo", { admin, data, aprogInput, sp_codeInput });
};

module.exports.postCrInfo = async (req, res) => {
  const cookies = await req.cookies;
  const response = await jwt.verify(
    cookies.token,
    "thisisasecretkeyhelloonetwothreefour"
  );
  const admin = await Admin.findOne({ id: response.id });
  let data = null;

  const { year, aprog, sp_code } = req.body;
  let aprogInput = aprog;
  let sp_codeInput = sp_code;

  if (sp_code == "" || sp_code == "ALL") {
    data = await Student.find({ reg_year: year, aprog: aprog.toUpperCase() })
      .populate("currentSubjects")
      .sort({ roll_no: 1 });
  } else {
    data = await Student.find({
      reg_year: year,
      aprog: aprog.toUpperCase(),
      sp_code: sp_code.toUpperCase(),
    })
      .populate("currentSubjects")
      .sort({ roll_no: 1 });
  }

  res.render("admin/crInfo", { admin, data, aprogInput, sp_codeInput });
};

//////////////////////////////////////////////////////////////
// module.exports.homeSectioning = async (req, res) => {
//   const cookies = await req.cookies;
//   const response = await jwt.verify(
//     cookies.token,
//     "thisisasecretkeyhelloonetwothreefour"
//   );
//   const admin = await Admin.findOne({ id: response.id });
//   const specialization = await Specialization.find({});
//   const aprogs = await academic_programme.find({});
//   const sp_code = null;
//   const aprog = null;
//   const students = null;
//   const students_section = 0;
//   const students_group = 0;
//   const year = null;
//   res.render("admin/homeSectioning", {
//     admin,
//     specialization,
//     aprogs,
//     year,
//     sp_code,
//     aprog,
//     students_section,
//     students_group,
//     students,
//   });
// };

module.exports.homeSectioningAlgorithm = async (req, res) => {
  const { totalStudents, groups, sections } = req.body;

  //Number of extra students

  let extraStudentsInSections = totalStudents % sections;
  console.log("extrastudentsinsections", extraStudentsInSections);

  let studentsPerSection = [];

  for (let i = 0; i < sections; i++) {
    let section = [];
    let students = Math.floor(totalStudents / sections);
    console.log("students", students);
    if (extraStudentsInSections > 0) {
      students += 1;
      extraStudentsInSections--;
    }
    let extraStudentsInGroups = students % groups;
    console.log("extraStudentsingroups", extraStudentsInGroups);
    for (let j = 0; j < groups; j++) {
      let studentsGroup = Math.floor(students / groups);
      if (extraStudentsInGroups > 0) {
        studentsGroup++;
        extraStudentsInGroups--;
      }
      section.push(studentsGroup);
    }
    studentsPerSection.push(section);
  }
  console.log(studentsPerSection);
  res.status(200).json(studentsPerSection);
};

module.exports.homeSectioningPost = async (req, res) => {
  const { year, sp_code, aprog, students_section, students_group } =
    await req.body;
  const cookies = await req.cookies;
  const response = await jwt.verify(
    cookies.token,
    "thisisasecretkeyhelloonetwothreefour"
  );
  const admin = await Admin.findOne({ id: response.id });
  const specialization = await Specialization.find({});
  const aprogs = await academic_programme.find({});
  const students = await Student.find({
    reg_year: year,
    sp_code: sp_code,
    aprog: aprog,
  }).sort({ fullname: 1 });
  //console.log(students);
  res.render("admin/homeSectioning", {
    admin,
    specialization,
    aprogs,
    year,
    sp_code,
    aprog,
    students_section,
    students_group,
    students,
  });
};

module.exports.homeSectionAllotment = async (req, res) => {
  const { year, aprog, sp_code, groupNumber, studentsPerSections, students } =
    req.body;
  for (let i = 0; i < studentsPerSections.length; i++) {
    let groupsInSection = [];
    let newSection = new homeSection();
    newSection.sectionName = sectionNames[i];
    newSection.year = year;
    newSection.aprog = aprog;
    newSection.sp_code = sp_code;
    newSection.groupNumber = groupNumber;
    let savedSectionId;
    let studentsInThisSection = 0;
    let savedGroupIds = [];

    try {
      const savedSection = await newSection.save();
      savedSectionId = savedSection._id;
      console.log(newSection);
    } catch (err) {
      console.log(err);
    }
    for (let j = 0; j < studentsPerSections[i].length; j++) {
      const numberOfStudentsInGroup = studentsPerSections[i][j];
      studentsInThisSection += numberOfStudentsInGroup;
      const studentsInGroup = students.slice(0, numberOfStudentsInGroup - 1);
      students.splice(0, numberOfStudentsInGroup);
      groupsInSection.push(studentsInGroup);
    }
    console.log(groupsInSection);
    console.log(groupsInSection.length);
    for (let k = 0; k < groupsInSection.length; k++) {
      let newGroup = new group();
      newGroup.groupNumber = k + 1;
      newGroup.homeSection = savedSectionId;
      newGroup.students = groupsInSection[k];
      try {
        const savedGroup = await newGroup.save();
        savedGroupIds.push(savedGroup._id);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const foundSection = await homeSection.findByIdAndUpdate(savedSectionId, {
        groups: savedGroupIds,
        studentCount: studentsInThisSection,
      });
    } catch (err) {
      console.log(err);
    }
  }
};

module.exports.splInDegree = async (req, res) => {
  const { aprog } = req.query;
  try {
    const foundPrograms = await Specialization.find({ aprog: aprog });
    res.status(200).json(foundPrograms);
  } catch (err) {
    res.status(404).json(err);
  }
};

module.exports.countStudentsInBranch = async (req, res) => {
  const { batch_year, sp_code, aprog } = req.query;
  const foundStudents = await Student.find({
    reg_year: batch_year,
    sp_code: sp_code,
    aprog: aprog,
  });
  res.status(200).json(foundStudents);
};
