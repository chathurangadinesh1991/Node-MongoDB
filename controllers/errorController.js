const AppError = require('./../utils/AppError');

const sendErrorDev = (err , res) => {
    res.status(err.statusCode).json({
        status : err.status,
        error : err,
        message : err.message,
        stack : err.stack
    });
}

const sendErrorProd = (err , res) => {
    if(err.isOperational){
        res.status(err.statusCode).json({
            status : err.status,
            message : err.message
            
        });
    }else{

        res.status(500).json({
            status : 'error',
            message : 'Something went very wrong!'
            
        });
    }
}

const handleCastErrorDB = err => {
    const message = `Invalid ${err.path} : ${err.value}.`;
    return new AppError(message,400);
}

const handleDuplicateFieldsErrorDB = err => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/);
    const message = `Duplicate Field Value :  ${err.path} : ${value}.`;
    return new AppError(message,400);
}

const handleValidationErrorDB = err => {
    const errors = Object.values(err.errors).map(el=>el.message);
    const message = `Invalid input Data ${errors.join('.  ')}`;
    return new AppError(message,400);

}

const handleJWTError = err => new AppError('Invalid Token, Please login again!', 401);

const handleTokenExpiredError = err => new AppError('Expired Token, Please login again!', 401);

module.exports = (err,req,res,next)=>{ 
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if(process.env.NODE_ENV==='development'){
        sendErrorDev(err,res);
    }else if(process.env.NODE_ENV==='production'){

        let error = {...err};

        if(error.name === 'CastError') error => handleCastErrorDB(error);
        if(error.code === 11000) error => handleDuplicateFieldsErrorDB(error);
        if(error.name === 'ValidationError') error => handleValidationErrorDB(error);
        if(error.name === 'JsonWebTokenError') error => handleJWTError(error);
        if(error.name === 'TokenExpiredError') error => handleTokenExpiredError(error);
        sendErrorProd(err,res);
    }   
}