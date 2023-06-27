const mongoose = require('mongoose');
const data = require('./21');

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
    for(let j=1330;j<1390;j++){
        const r=data[j].r1;
        let rf=r.substring(0,8)+r.substring(9);
      let s=await Student.findOne({roll_no:rf});
      if(s){
      s.sp_code=data[j].r2.substring(5,7);
      s.roll_no=data[j].r2;
      s.regd_no=rf;
      await s.save();
      console.log(i++);
    }
    else{
      console.log(data[j]);
      console.log(i++);
       }
    }
    }
   



