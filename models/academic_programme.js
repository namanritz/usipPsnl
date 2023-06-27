const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const aprogSchema = new Schema({
   id:{
    type:String,
   },
   aprog:{
    type:String,
   },
   name:{
    type:String,

   },
   start_year:{
    type:String,

   },
   aprog_prnt:{
    type:String,

   },
   aproghindi:{
    type:String,

   },
   degreehindiname:{
    type:String,

   },
   degreename:{
    type:String,

   },
   duration_max:{
      type:Number,
   },
   duration_min:{
      type:Number,
   },
   num_stages:{
      type:Number,
   },
   min_credits:{
      type:Number,
   }

})
module.exports = mongoose.model('Aprog',aprogSchema);