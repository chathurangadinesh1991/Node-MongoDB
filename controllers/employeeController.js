const Bank = require('../models/bankModel');
const Branch = require('../models/branchModel');
const Employee = require('../models/employeeModel');

//const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.getPersonalData = catchAsync(async (req, res, next) => {
    // const stats = await Employee.find().select("emp_id emp_name emp_email emp_photo emp_address branch_id")
    // .populate('branch','branch_name').exec();
    // // try{
    // //     const stats = await Employee.find().populate({path: 'Branch',model: Branch});
    // // }catch (err){
    // //     console.log(err)
    // // }
   

    // res
    //     .status(200)
    //     .json({
    //         stats
    //     });
    Employee.find({})
    .populate({ path: 'Branch', select: 'branch_name branch_id' })    
    .exec(function(err,docs){
        if(err) throw err
        if(docs) console.log(docs);
    });

    Employee.find({}).populate('branch').exec().then(employee => {
        console.log(employee)
        res.status(200).json({
            name : employee
        })
    });
});
