const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const courses=require('../models/courses');

const teacherSchema = new Schema({
    id:{
        type:String,
    },
    name:{
        type:String,
    },
    courses:{
        type: Schema.Types.ObjectId, ref: 'courses'
    }
    
})
module.exports = mongoose.model('Teacher',teacherSchema);