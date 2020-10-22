const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

const branchSchema = new mongoose.Schema({
    id: {
        type : Number,
        required : [true],
        unique : true
    },
    name: {
        type: String
    },
    address: {
        type: String
    },
    bank_id: {
        type: String
    }
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    });

module.exports = mongoose.model('Branches', branchSchema);