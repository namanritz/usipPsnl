// <<<<<<< Updated upstream
// const mongoose = require('mongoose');
// const data = require('./data');
// =======


//   const mongoose = require('mongoose');
// const data = require('./data1');
// >>>>>>> Stashed changes
// const Student = require('../../models/student');
// const studentState = require('../../models/studentState');
// const dbUrl = "mongodb+srv://usipcompcentre2022august:usip123p1@cluster0.a82quus.mongodb.net/?retryWrites=true&w=majority";
//   mongoose.connect(dbUrl, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });


//   const db = mongoose.connection;
//   db.on("error", console.error.bind(console, "connection error:"));
//   db.once("open", () => {
//     //console.log("Database connected");
//   });


  
//   const seed = async()=>{
//     //await Student.deleteMany({});
//     //await studentState.deleteMany({});
//     for(let student of data){
//        // const s = new Student(student);
//       //  const ss = new studentState(student);
//         //var charToRemove ="\\";
//       if(s.aprog=="PHD"){
//         ss.currentSem='0';
//       }
//       ss.currentCredits=0;
//       ss.currentElectives=0;
//       ss.securedCredits=0;
//       s.password = "HESOYAM12349876AEZAKMI12349876BIGBANG"
//       await s.save();
//       await ss.save();

//     }

//   }




//   // seed().then(()=>{
//   //   mongoose.connection.close();
//   // })
  

//   seed().then(()=>{
//     mongoose.connection.close();
//   })
  
