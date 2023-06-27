const mongoose = require('mongoose');
//const subjectSchema = require('../models/subjectScheme');
const studentState = require('../models/studentState');
const Student = require('../models/student');
const session = require('../models/session');
const dbUrl = "mongodb+srv://usipcompcentre2022august:usip123p1@cluster0.a82quus.mongodb.net/?retryWrites=true&w=majority";
  mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });


  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", () => {
    console.log("Database connected");
  });


  const seed = async()=>{
        //  await session.deleteMany({});
        const sessions = await session.find({});

        for(let s of sessions){
            const student = await Student.findOne({stu_id:s.stu_id});
            s.student=student;

            await s.save();
            console.log(s);

        }
  }
 




  // seed().then(()=>{
  //   mongoose.connection.close();
  // })
  

  seed().then(()=>{
    mongoose.connection.close();
  })
  
