const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});

process.on('uncaughtException', err =>{
    console.log(err.name,err.message);
    console.log('Exception ::  Shutting Down!')
    process.exit(1);    
});

const app = require('./app'); 
const DB = process.env.DB_CONN.replace('<PASSWORD>',process.env.DB_PW); 

mongoose.connect(DB,{
    useNewUrlParser : true,
    useCreateIndex : true,
    useFindAndModify : false,
    useUnifiedTopology: true
}).then(con => console.log('DB Connection Successful'));
;

const port = process.env.PORT || 3000;

const server = app.listen(port, ()=>{
    console.log('Server is listening on port 3000');
});

//Handling unhandled promise rejection globally
process.on('unhandledRejection', err =>{
    //console.log(err.name,err.message);
    console.log('Unhandled Rejection ::  Shutting Down!')
    server.close(()=>{
        process.exit(1);
    });    
});