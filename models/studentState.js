const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const subjectScheme= require('./subjectScheme');

const studentStateSchema = new Schema({
    roll_no:{
        type:String,
    },
    stu_id:{
        type :Number,
    },
   
    currentSubjects:[
        {
           type:Schema.Types.ObjectId,
            ref:'subjectSchema'
        }
    ],
    passedSubjects:[
        {
           type:Schema.Types.ObjectId,
            ref:'subjectSchema'
        }
    ], 
    backSubjects:[
            {
                type:Schema.Types.ObjectId,
                ref:'subjectSchema'
            }
    ],
    securedCredits:{
        type:Number,
    },
    currentSem:{
        type:Number,
    },
    currentCredits:{
        type:Number,
    },  
    currentElectives:{
        type:Number,
    }







})
module.exports = mongoose.model('studentState',studentStateSchema);