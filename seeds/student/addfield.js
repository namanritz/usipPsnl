const mongoose = require('mongoose');
const data = require('./data');
const Student = require('../../models/student');
const studentState = require('../../models/studentState');
const Specialization = require('../../models/specialization');
const dbUrl = "mongodb+srv://usipcompcentre2022august:usip123p1@cluster0.a82quus.mongodb.net/?retryWrites=true&w=majority";
  mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });


  const db = mongoose.connection;
  db.on("`error`", console.error.bind(console, "connection error:"));
  db.once("open", () => {
    console.log("Database connected");
  });

  const seed = async()=>{
    const students = await Student.find({});
    let i=0;
    for(let student of students){
            student.defaultHostelPassword=student.roll_no;
            student.updatedHostelPassword="";
            await student.save();
            i++;
            console.log(i);
        }
  
      

  }
  seed().then(()=>{
    mongoose.connection.close();
  })
  
