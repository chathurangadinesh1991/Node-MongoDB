const express = require('express');
const employeeRoutes = require('./routes/employeeRoutes');
const authRoutes = require('./routes/authRoutes');
const app = express(); 
const cors = require('cors');
const AppError = require('./utils/AppError');
const globalErrorHandler = require('./controllers/errorController');

app.use(express.json()); 
app.use(cors());

app.use('/api/employee',employeeRoutes);
app.use('/api/auth',authRoutes);

//route handler to handle routes that we don't have
app.all('*',(req,res,next)=>{
    next(new AppError(`Can't find the ${req.originalUrl} on this server!`,404)); 
});

app.use(globalErrorHandler);

module.exports = app;



