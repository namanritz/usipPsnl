  const mongoose = require('mongoose');
const data = require('./data1');

const Student = require('../../models/student');
const studentState = require('../../models/studentState');
const dbUrl = "mongodb+srv://usipcompcentre2022august:usip123p1@testcluster.aefcaps.mongodb.net/?retryWrites=true&w=majority";
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
    const students=await Student.find({reg_year:2021,aprog:"BTECH"});
    console.log(students.length);
    console.log(students[100]);
   

  }




