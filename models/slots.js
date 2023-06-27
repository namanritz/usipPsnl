const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const slotSchema = new Schema({
    name:{
        type:String,
    },
    max:{
        type:Number,
    }
})
module.exports = mongoose.model('slots',slotSchema);