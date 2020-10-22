const { promisify } = require('util'); 
const User = require('../models/employeeModel');
const catchAsync = require('./../utils/catchAsync');
const jwt = require('jsonwebtoken');
const AppError = require('./../utils/AppError');

const signToken = id => {
    return jwt.sign({ id: id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
}

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError('Please provide email and password!', 400));
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || (password !== user.password)) {
        return next(new AppError('Incorrect email or password!', 401));
    }

    const token = signToken(user.id);    

    res
        .status(200)
        .json({          
            token,
            name : user.name
        });
});


// exports.protect = catchAsync(async (req, res, next) => {
//     let token;

//     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//         token = req.headers.authorization.split(' ')[1];
//     }

//     if (!token) {
//         return next(new AppError('Your are not logged in, Please login to get access', 401));
//     }
//     const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

//     //3)check if the user still exists
//     //our payload of the jwt has the userid in it
//     const freshUser = await User.findById(decoded.id);

//     if (!freshUser) {
//         new AppError('The user belonging to this token does no londger exists.', 401);
//     }

//     //4)check if the user changed the password after the token was isssued

//     if (freshUser.changedPasswordAfter(decoded.iat)) {//secs value of issued at - iat
//         return new AppError('User recently changed password! Please login again.', 401)
//     }

//     //Grant access to the requested route
//     req.user = freshUser;

//     next();

// });