const mongoose = require('mongoose');
const validator = require('validator');

const bankSchema = new mongoose.Schema({
    id : {
        type : Number,
        required : [true],
        unique : true
    },
    name :{
        type : String
    }   
});

module.exports = mongoose.model('Bank',bankSchema);