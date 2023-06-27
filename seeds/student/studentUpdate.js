const mongoose = require('mongoose');
const data = require('./update');

const Student = require('../../models/student');

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


  let i=0;
  const seed = async()=>{
        while(i<data.length){
            const student=await Student.findOne({stu_id:data[i].stu_id});
            if(student){
                student.roll_no=data[i].rollno;
                student.regd_num=data[i].regd_num;
                student.currentSem=(2023-data[i].reg_year) *2;
              //  console.log(data[i].dtu_email)
                if(data[i].dtu_email){
                if(data[i].dtu_email.length>40){
                  student.dtu_email=data[i].dtu_email.substring(0,data[i].length/2)
                }
                else{
                  student.dtu_email=data[i].dtu_email;
                }
              }
                await student.save();
            }
            else{
              const s = await Student.create(data[i]);
              s.password="HESOYAM12349876AEZAKMI12349876BIGBANG";
              s.currentCredits=0;
              s.currentSem=(2023-data[i].reg_year) *2;
              s.currentElectives=0;
              s.currentSubjects=[];
              s.securedCredits=0;
              s.backSubjects=[];
              s.sessions=[];
              s.passedSubjects=[];
              s.securedCredits=0;
              s.roll_no=data[i].rollno;
              if(data[i].dtu_email){
                if(data[i].dtu_email.length>40){
                  s.dtu_email=data[i].dtu_email.substring(0,data[i].length/2)
                }
                else{
                  s.dtu_email=data[i].dtu_email;
                }
              }
              await s.save();
  

            }
            console.log(i++);

        }
    }
   



