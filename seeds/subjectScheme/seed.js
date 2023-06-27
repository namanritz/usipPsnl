const mongoose = require('mongoose');
const data = require('./data2');
const subjectSchema = require('../../models/subjectScheme');
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
    let i=1;
    for(let subject of data){
        const sub=await subjectSchema.findOne({sub_id:subject.sub_id});
        if(sub)
        continue;
        const temp = new subjectSchema(subject);
        await temp.save();
        console.log(i++);
    }

  }
 




  // seed().then(()=>{
  //   mongoose.connection.close();
  // })
  

  