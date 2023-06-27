const mongoose = require('mongoose');
const data = require('./data');

const Student = require('../../models/student');
const subjectScheme = require('../../models/subjectScheme');
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
      //console.log(++i);
      d.roll_no=d.roll_no.toUpperCase();
      let student=await Student.findOne({roll_no:d.roll_no});
      if(!student){
          let rn=d.roll_no.substring(0,8)+d.roll_no.substring(9);
          student=await Student.findOne({roll_no:rn});
      }
      if(!student){
          let rn=d.roll_no.substring(0,8)+'0'+d.roll_no.substring(9);
          student=await Student.findOne({roll_no:rn});
      }

      
      student.currentSubjects=[];

          await student.save();
  
 
    }
    for(let d of data){
        //console.log(++i);
        d.roll_no=d.roll_no.toUpperCase();
        let student=await Student.findOne({roll_no:d.roll_no});
        if(!student){
            let rn=d.roll_no.substring(0,8)+d.roll_no.substring(9);
            student=await Student.findOne({roll_no:rn});
        }
        if(!student){
            let rn=d.roll_no.substring(0,8)+'0'+d.roll_no.substring(9);
            student=await Student.findOne({roll_no:rn});
        }

        if(!student){
            console.log(d);
            continue;
            
        }
        const sub=await subjectScheme.findOne({sub_code:d.sub_code});
        
      
        if(!sub)
        console.log(d);
        if(sub){
            student.currentSubjects.push(sub);
            await student.save();
        }
    
   
      }}
  


