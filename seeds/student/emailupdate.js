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
                console.log(data[i].dtu_email)
                if(data[i].dtu_email){
                if(data[i].dtu_email.length>40){
                  student.dtu_email=data[i].dtu_email.substring(data[i].dtu_email.length/2)
                }
                else{
                  student.dtu_email=data[i].dtu_email;
                }
              }
                await student.save();
                console.log(student.dtu_email);
            }
             
            console.log(i++);

        }
    }
   



