const mongoose = require('mongoose');
const data = require('./rolldata');

const Student = require('../../models/student');
//const studentState = require('../../models/studentState');
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

    let i=0;
    for(let d of data){
      let s=await Student.findOne({roll_no:d.r1});
      if(s){
      s.roll_no=d.r2;
      s.regd_num=d.r1;
      await s.save();
      console.log(i++);
    }
    else{
       s=await Student.findOne({roll_no:d.r2});
       if(s){
      s.regd_num=d.r1;
      await s.save();
      console.log(i++);
       }
    }
    }
   

  }




