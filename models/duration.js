const mongoose = require('mongoose');
const Schema = mongoose.Schema;






const duration = new Schema({
  year:{
    type:String,
  },
  startMonth:{
    type:String,
  },
  endMonth:{
    type:String,
  }
})

module.exports = mongoose.model('duration',duration);

