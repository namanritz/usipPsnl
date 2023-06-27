const Student = require('../models/student');
const Specialization = require('../models/specialization');
const academic_programme = require('../models/academic_programme');
const subjectSchema = require('../models/subjectScheme');
const crRules = require('../models/crRules');
const jwt = require('jsonwebtoken');

const blockedElectives = require("../utils/blockedElectives");
const session=require('../models/session');


module.exports.googleSuccess = async(req,res) =>{
  //console.log(req.user);
  res.send("Hi");
}


module.exports.renderRegister = async (req,res) =>{
    const specializations = await Specialization.find({});
    const aprogs = await academic_programme.find({})
    res.render("student/register",{specializations,aprogs});
}



module.exports.renderLoginForm = async (req,res) =>{
  res.render('student/login');
   
}
let i=100000;
module.exports.submitLoginForm = async (req,res) =>{
    const {roll_no,password}= req.body;
    //console.log(req.body);
    i++;
   
   const student = await Student.findOne({roll_no:roll_no.toUpperCase()});
   //console.log(student);
   if(!student){
    req.flash('error','Invalid Username Or Password');
    
    return res.redirect('/student/login');
   }
   
   if(password==student.password){
    //console.log("password matched");
    const token = jwt.sign(
      { _id: student._id },
      "thisisasecretkeyhelloonetwothreefour"
    );
    res.cookie("token", token);
    console.log(i);
    console.log(student.roll_no);
    return res.redirect(`/student/home/${student._id}`);
   }
    else{
    return res.redirect(`/student/login`);
    }
}


module.exports.studentHomePage = async (req,res) =>{
    const {id} = req.params;
    const student = await Student.findById(id).populate('currentSubjects');
   // console.log(student);
    const specialization = await Specialization.findOne({sp_code:student.sp_code});
   // console.log(specialization);
    const currentSubjects=student.currentSubjects;
    res.render('student/studentHome',{student,specialization,currentSubjects});

     
  }

  module.exports.renderEditForm = async (req,res) =>{
   // const branches = await Branch.find({});
    const {id}=req.params;
    const student = await Student.findById(id);

    const specializations = await Specialization.find({});
    const aprogs = await academic_programme.find({})
  
    res.render('student/edit',{student,specializations,aprogs});
     
  }



  module.exports.submitEditForm = async (req,res) =>{
    const { id } = req.params;
    const student = await Student.findById(id);
    if(student.password==(req.body.student.password)){

      const studentNew = await Student.findByIdAndUpdate(id, { ...req.body.student });
      await studentNew.save();
      req.flash('success','Information Updated Successfully !')
      res.redirect(`/student/home/${id}`);
    }
    else{
      req.flash('error','Invalid Password !');
      res.redirect(`/student/edit/${id}`);
    }
  }

  module.exports.renderCourseRegisteration = async(req,res)=>{
    const {id} = req.params;
    const student = await Student.findById(id);

    

     if(student.backSubjects.length){
      console.log(student.backSubjects)
        return res.redirect(`/student/backRegisteration/${id}`);
     }
else{
    const compulsorySubjects = await subjectSchema.find({aprog:student.aprog,sp_code:student.sp_code,course_type:"Compulsory",num:student.currentSem});
    //console.log(compulsorySubjects);
    //const availElectives = await subjectSchema.find({aprog:student.aprog,sp_code:student.sp_code,course_type:"elective",batchYear:student.req_year});
    const rules = await crRules.findOne({aprog:student.aprog,sem:student.currentSem,year:student.reg_year}).populate('slots');
    //console.log(rules);
    var electives = [];

    if(!rules || !rules.open){
      console.log(student.roll_no+" tried for non open CR");
      req.flash('error',`Courser Registeration Not Open . ${student.roll_no} logged `);
      return res.redirect(`/student/home/${id}`)
    }
    //console.log(rules);
    for(let slot of rules.slots){
      let ae = await subjectSchema.find({aprog:student.aprog,sp_code:student.sp_code,slot:slot.name,num:student.currentSem});
      electives.push(ae);
    }
    
    if(!rules.open){
      req.flash('error',"Courser Registeration Not Open");
      return res.redirect(`/student/home/${id}`)
    }
    const blockedSlots= blockedElectives(student,rules.slots);
    res.render('student/courseRegisteration',{student,compulsorySubjects,electives,rules,blockedSlots});
  }
    
    }

  module.exports.admitCard = async (req,res) =>{
    const {id}=req.params;
    const student = await Student.findById(id).populate('currentSubjects');
    //console.log(student);
   
    const aprog =await academic_programme.findOne({aprog:student.aprog});
    const sp = await Specialization.findOne({sp_code:student.sp_code});
    //const ss = await subjectSchema.find({});
    //console.log(sp);

    //console.log(ss);
    const rules = await crRules.findOne({aprog:student.aprog,sem:student.currentSem,year:student.reg_year}).populate('slots');

    res.render('student/admitCard',{student,aprog,sp,rules});
     
  }


  module.exports.acknowledgementSlip = async (req,res) =>{
    const {id}=req.params;
    const student = await Student.findById(id).populate('currentSubjects');
    //console.log(student);
   
    const aprog =await academic_programme.findOne({aprog:student.aprog});
    const sp = await Specialization.findOne({sp_code:student.sp_code});
    //const ss = await subjectSchema.find({});
    //console.log(sp);
   
    //console.log(ss);
    const rules = await crRules.findOne({aprog:student.aprog,sem:student.currentSem,year:student.reg_year}).populate('slots');
    res.render('student/layout',{student,aprog,sp,rules});
     
  }

  module.exports.courseRegister = async(req,res) =>{
    
    const {id,cid}=req.params;
    //console.log(id);
   //console.log(cid);
    const student = await Student.findById(id);
    const subject = await subjectSchema.findById(cid);
    const rules = await crRules.findOne({aprog:student.aprog,sem:student.currentSem,year:student.reg_year}).populate('slots');
    const blockedSlots= blockedElectives(student,rules.slots);
    //console.log(subSchema);
    
   // console.log(subSchema);


    if(student.currentSubjects.includes(cid))
    {
    student.currentSubjects.pull(subject);
    const s = await session.findOneAndDelete({stu_id:student.stu_id,subject:subject});
    student.sessions.pull(s);
    if(student.currentCredits)
    student.currentCredits=student.currentCredits-subject.sub_credit;
    else student.currentCredits=0;
    if(subject.seats){
    subject.seats = subject.seats+1;
    }
    if(subject.course_type=='elective'||subject.course_type=='Elective'){
      await Student.findByIdAndUpdate(student._id,{currentElectives:student.currentElectives-1});
        
    }
  }
  else{
    student.currentSubjects.push(subject);
    
    const s = await session.create({stu_id:student.stu_id,subject:subject,duration:"May 2023",student:student,aprog:student.aprog,sp_code:student.sp_code,sem:student.currentSem,status:"Regular",year:student.reg_year});
    //console.log(s);
    student.sessions.push(s);
    if(student.currentCredits)
    student.currentCredits=student.currentCredits+subject.sub_credit;
    else
    student.currentCredits=subject.sub_credit;
    if(subject.seats){
    subject.seats = subject.seats-1;
    }
    if(subject.course_type=='elective'||subject.course_type=='Elective'){
      if(!student.currentElectives){
        student.currentElectives=1;
      }
      
      else{
        student.currentElectives=student.currentElectives+1;
      }
      
    }
  }
  await subject.save();
    await student.save();
    

    //await Student.findByIdAndUpdate(id,{$push: {"currentSub": {subject}}})
   // console.log(student.currentSubjects);
    res.redirect(`/student/courseRegisteration/${id}`);

  }


 



  module.exports.form = async (req,res) =>{
    // const branches = await Branch.find({});
     res.render('student/form');
      
   }
 


   module.exports.renderBackRegisteration = async(req,res)=>{
    const {id} = req.params;
    const student = await Student.findById(id).populate('currentSubjects');




    
     if(!student.backSubjects.length){
        return res.redirect(`/student/courseRegisteration/${id}`);
     }
else{
    const backSubjects = await subjectSchema.find({aprog:student.aprog,sp_code:student.sp_code,_id:{$in:student.backSubjects}});
    //console.log(compulsorySubjects);
    //const availElectives = await subjectSchema.find({aprog:student.aprog,sp_code:student.sp_code,course_type:"elective",batchYear:student.req_year});
    const rules = await crRules.findOne({aprog:student.aprog,sem:student.currentSem,year:student.reg_year}).populate('slots');
    if(!rules || !rules.open){
      req.flash('error',"Courser Registeration Not Open");
      return res.redirect(`/student/home/${id}`)
    }
    //console.log(rules);
    // for(let slot of rules.slots){
    //   let ae = await subjectSchema.find({batchYear:student.req_year,aprog:student.aprog,sp_code:student.sp_code,slot:slot.name,course_type:"ELECTIVE"});
    //   electives.push(ae);
    // }

  
    res.render('student/backRegisteration',{student,backSubjects,rules,}); 
  }

    }

    module.exports.backRegister = async(req,res) =>{
    
      const {id,cid}=req.params;
      //console.log(id);
     //console.log(cid);
      const student = await Student.findById(id);
      const subject = await subjectSchema.findById(cid);
      //console.log(subSchema);
     // console.log(subSchema);
      if(student.currentSubjects.includes(cid))
      {
      student.currentSubjects.pull(subject);
    
      student.backSubjects.push(subject);
      const s = await session.findOneAndDelete({stu_id:student.stu_id,subject:subject});
      student.sessions.pull(s);
      if(student.currentCredits)
      student.currentCredits=student.currentCredits-subject.sub_credit;
      else student.currentCredits=0-subject.sub_credit;
      if(subject.seats){
      subject.seats = subject.seats+1;
      }
      if(subject.course_type=='elective'||subject.course_type=='Elective'){
       
          await Student.findByIdAndUpdate(student._id,{currentElectives:student.currentElectives-1});
          
      }
    }
    else{
      student.currentSubjects.push(subject);
      student.backSubjects.pull(subject);
      const s = await session.create({stu_id:student.stu_id,subject:subject,duration:"May 2023",student:student,aprog:student.aprog,sp_code:student.sp_code,sem:student.currentSem,status:"Regular",year:student.reg_year});
      //console.log(s);
      student.sessions.push(s);
      if(student.currentCredits)
      student.currentCredits=student.currentCredits+subject.sub_credit;
      else
      student.currentCredits=subject.sub_credit;
      if(subject.seats){
      subject.seats = subject.seats-1;
      }
      if(subject.course_type=='elective'||subject.course_type=='Elective'){
        
        await Student.findByIdAndUpdate(student._id,{currentElectives:student.currentElectives+1});
        
      }
    }
    await subject.save();
      await student.save();
      
  
      //await Student.findByIdAndUpdate(id,{$push: {"currentSub": {subject}}})
     // console.log(student.currentSubjects);
      res.redirect(`/student/backRegisteration/${id}`);
  
    }