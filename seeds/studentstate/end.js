const mongoose = require('mongoose');
//const data = require('./data1');

const Student = require('../../models/student');
const studentState = require('../../models/studentState');
const dbUrl = "mongodb://127.0.0.1:27017/erp";
  mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });


  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", () => {
    console.log("Database connected");
    seed().then(()=>{
        mongoose.connection.close();
      })
      
    
  });


  
  const seed = async()=>{
    const students=await Student.find();
    let i=0;
    for(let student of students){
      const aid=student.stu_id;
      const ss=await studentState.findOne({stu_id:aid});
      student.passedSubjects=ss.passedSubjects;
      student.backSubjects=ss.backSubjects;
      student.securedCredits=ss.securedCredits;
      student.currentSem=ss.currentSem;
      student.currentCredits=ss.currentCredits;
      student.currentElectives=ss.currentElectives;
      //const s=await Student.findByIdAndUpdate(aid,ss);
      await student.save();
      console.log(student);
      console.log(i++);
    }
   

  }




