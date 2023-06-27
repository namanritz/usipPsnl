const mongoose = require('mongoose');
const data = require('./data');
const Aprog = require('../../models/academic_programme');
const Specialization = require('../../models/specialization');
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
  //  await Specialization.deleteMany({});
    for(let specialization of data){
        //console.log(aprog);
       // console.log(specialization);
       // const temp = new Specialization(specialization);
        //console.log(temp);
        await temp.save();
    }

  }
  seed().then(()=>{
    mongoose.connection.close();
  })
  
