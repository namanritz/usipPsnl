const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const subjectScheme=require('./subjectScheme')
//const groups = require('./groups');
const homeSection=require('./homeSection')
const duration=require('duration');
const group = require('./group');
const session=require('./session');

const courses = new Schema({
    year:{
        type:Number,
    },
    subject:{
        type: Schema.Types.ObjectId, ref: 'subjectScheme'
    },
    homeSection:{
        type: Schema.Types.ObjectId, ref: 'homeSection'
    },
    duration:{
        type: Schema.Types.ObjectId, ref: 'duration'
    },
    activity:{
        type:String
    },
    group:{
        type: Schema.Types.ObjectId, ref: 'group'
    },
    sessions:{
        type: Schema.Types.ObjectId, ref: 'session'
    }

})

module.exports = mongoose.model('courses',courses);

