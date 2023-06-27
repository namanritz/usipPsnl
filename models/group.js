const mongoose = require('mongoose');
const Schema = mongoose.Schema;






const group = new Schema({
    name:{
        type:String,
    },
    homesection:{
        type:Schema.Types.ObjectId,
        ref:'homeSection'
    },
    students:{
            type:Schema.Types.ObjectId,
            ref:'student'
    },
})

module.exports = mongoose.model('group',group);

