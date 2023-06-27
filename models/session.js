const mongoose = require('mongoose');
const subjectSchema = require('./subjectScheme');
const Student = require('./student');
const Schema = mongoose.Schema;


const sessionSchema = new Schema({
    year:{
        type:Number,
    },
    stu_id:{
        type:Number,
    },
    student:{
        type:Schema.Types.ObjectId,
        ref:'Student'
    },
    aprog:{
        type:"String",
    },
    sp_code:{
        type:"String",
    },
    sem:{
        type:"String",
    },
    status:{
        type:"String",
    }
    ,
    subject:{
        type:Schema.Types.ObjectId,
        ref:'subjectSchema'
    },
    grade:{
        type:String,
    },
    duration:{
        type:String,
    },
    mte:{
        type:Number,
    },
     ete:{
        type:Number,
    },
     cws:{
        type:Number,
    },
    prs:{
        type:Number,
    }
})
module.exports = mongoose.model('session',sessionSchema);