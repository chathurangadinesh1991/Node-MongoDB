const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const Branch = require('./branchModel');

const employeeSchema = new mongoose.Schema({
    id: {
        type : Number,
        required : [true],
        unique : true
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    photo: {
        type: String
    },
    address: {
        type: String,
    },
    password: {
        type: String
    },
    branch_id: {
        type: String
    }
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    });

employeeSchema.virtual('virtualTest', {
    ref: 'Branch',
    localField: 'branch_id',
    foreignField: 'id',
    justOne: false
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;