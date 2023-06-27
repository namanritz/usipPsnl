const { ref } = require('firebase-functions/lib/v1/providers/database');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const duration = require('./duration');

const courses=require('./courses')

const homeSection = new Schema({
    year:{
        type:Number,
    },
    aprog:{
        type:String,
    },
    sp_code:{
        type:String,
    },  
    duration:{
        type:Schema.Types.ObjectId,
        ref:'duration'
    },
    studentCount:{
        type:Number,
    },
    groupNumber:{
        type:Number,
    },
    groups:[{
        type:Schema.Types.ObjectId,
        ref:'group'
    }],
     courses:[{
        type:Schema.Types.ObjectId,
        ref:'courses'
     }]

})

module.exports = mongoose.model('homeSection',homeSection);

