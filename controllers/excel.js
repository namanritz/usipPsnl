const Student = require("../models/student");

const subjectSchema = require("../models/subjectScheme");
const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
const crRules = require("../models/crRules");
//const StudentState = require("../models/studentState");
const excel = require("json-as-excel");
const student = require("../models/student");
const Session = require("../models/session");

////////////////CXXXXX____________------------------?????????????///////////////

module.exports.registerationInfoExcel = async (req, res) => {
  //console.log("RECIEVED EXPORT REQUEST");
  const cookies = await req.cookies;
  const response = await jwt.verify(
    cookies.token,
    "thisisasecretkeyhelloonetwothreefour"
  );
  const admin = await Admin.findOne({ id: response.id });
  let data = null;
  const { sp_code, aprog, year } = req.body;
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
  let d = [{roll_no:"roll_no",aprog:"aprog",Discipline:"Discipline",name:"name",semester:"Semester",currentSubjects:["0","1","2","3","4","5","6","7"],campus:"Campus"}];
  for (let da of data) {
    function func(item) {
        return item.sub_code;
      }
      
    let cur = da.currentSubjects.map(func);
    if(da.currentSubjects.length>0){
    d.push({
      roll_no: da.roll_no,
      aprog: da.aprog,
      Discipline:da.sp_code,
      name:da.fullname,
      semester:"0",
      currentSubjects:cur,
      campus:da.campus,
    });}
  }



  let d2=[];
  let data2=null;
  if (sp_code == "" || sp_code == "ALL") {
    data2 = await Session.find({ reg_year: year, aprog: aprog.toUpperCase() })
      .populate("student")
      .populate("subject")
      .sort({ sp_code: 1 });
  } else {
    data2 = await Session.find({
      reg_year: year,
      aprog: aprog.toUpperCase(),
      sp_code: sp_code.toUpperCase(),
    })
      .populate("student")
      .populate("subject")
      .sort({sp_code: 1 });
  }

  for(let da of data2){
    d2.push({
      aprog:da.aprog,
      sp_code:da.sp_code,
      sem:da.sem,
      sub_code:da.subject.sub_code,
      sub_name:da.subject.sub_name,
      slot:da.subject.slot,
      roll:da.student.roll_no,
      name:da.student.fullname,
      status:da.status,
      duration:da.duration,
    })
  }

//console.log(data2[0]);

  const workbook = await excel.generateExcel([
    {
      title: "Student Wise registeration",
      data: d,
    },
    {
      title: "Course Wise Registeration",
    data: d2,

    }
  ]);

  await workbook.xlsx.writeFile("public/RegisterationInfo.xlsx");
  res.download("public/RegisterationInfo.xlsx");
};
