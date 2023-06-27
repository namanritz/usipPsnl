const mongoose = require('mongoose');
const academic_programme=require('./academic_programme');
const Schema = mongoose.Schema;


const specializationSchema = new Schema({
   id:{
        type:String,
   },
   sp_code:{
    type:String,
   },
   aprog:{
    type:String,
   },
   sp_name:{
    type:String,

   },
   sp_start_year:{
    type:String,

   },
   dept_code:{
    type:String,

   },
   hindi:{
    type:String,

   },
   campus:{
    type:String,

   }
})
module.exports = mongoose.model('Specialization',specializationSchema);