const mongoose = require('mongoose');
const subjectSchema = require('./subjectScheme');
const Schema = mongoose.Schema;
const slots = require('./slots');
//const groups = require('./groups');





const crRules = new Schema({
    year:{
        type:Number,
    },
    aprog:{
        type:String,
    },
    sem:{
        type:Number,
    },
    open:{
        type:Boolean,
    },
    maxCredits:{
        type:Number,
    },
    odd_even:{
        type:String,
    },
    duration:{
        type:String,
    },
    slots:[
        {
            type: Schema.Types.ObjectId, ref: 'slots'
        }
    ],
    maxElectives:{
        type:Number,
    }
})

module.exports = mongoose.model('crRules',crRules);

